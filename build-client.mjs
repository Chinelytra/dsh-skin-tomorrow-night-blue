#!/usr/bin/env node
/**
 * build-client.mjs — generate `lib/client.js` from `src/palette.mjs`.
 *
 * A browser bundle receives only `require` and the platform seed, so the token
 * data is serialized here and the runtime is emitted as ordinary source. The
 * output is hand-readable on purpose: this package ships no bundler, and the
 * DSH client module loader consumes the `window.__ModuleLoader__.load` shape
 * that the reference theme plugins use.
 *
 * Run: node build-client.mjs
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  deriveTokens,
  PALETTE,
  SHIKI,
  SKIN_ID,
  SKIN_NAME,
} from './src/palette.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(readFileSync(join(here, 'package.json'), 'utf8'))

const tokens = Object.entries(deriveTokens(PALETTE))
const syntax = Object.entries(SHIKI)
const data = { id: SKIN_ID, name: SKIN_NAME, tokens, syntax }

/**
 * Browser-half runtime. Kept as a source string because the bundle format has
 * no ESM imports; every value it needs is interpolated as JSON.
 */
const runtime = `
var data = ${JSON.stringify(data)};

function declarationsOf(entries) {
  var out = [];
  for (var i = 0; i < entries.length; i += 1) {
    out.push(entries[i][0] + ':' + entries[i][1] + '!important');
  }
  return out.join(';');
}

/**
 * Mount the browser half: one important stylesheet carrying the palette's
 * alias tokens and the Shiki syntax roles, plus a one-shot appearance
 * alignment so the skin is not paired with the opposite native color scheme.
 * @param {object} ctx - the client cordis context.
 */
function apply(ctx) {
  var style = document.createElement('style');
  style.setAttribute('data-dsh-skin', data.id);
  style.textContent = ':root,body,body[data-ds-dark-theme]{'
    + declarationsOf(data.tokens) + ';' + declarationsOf(data.syntax) + '}';
  (document.head || document.documentElement).appendChild(style);
  ctx.effect(function () {
    return function () { style.remove(); };
  }, 'skin-tomorrow-night-blue: styles');

  try {
    var theme = ctx.theme || (typeof ctx.get === 'function' ? ctx.get('theme') : null);
    if (theme && typeof theme.getTheme === 'function') {
      var snapshot = theme.getTheme();
      var preference = snapshot && snapshot.preference;
      if (preference !== 'dark' && typeof theme.setTheme === 'function') {
        theme.setTheme('dark');
      }
    }
  } catch (error) {
    /* appearance alignment is best-effort; the skin still applies */
  }
}

exports.inject = ['theme'];
exports.apply = apply;
`

const bundle = `/**
 * ${pkg.name} v${pkg.version} — browser half (built from src/palette.mjs; do not edit by hand).
 */
window.__ModuleLoader__.load({
  id: ${JSON.stringify(pkg.name)},
  factory: function (require) {
    var module = { exports: {} };
    var exports = module.exports;
${runtime}
    return module.exports;
  },
});
`

const outPath = join(here, 'lib', 'client.js')
mkdirSync(dirname(outPath), { recursive: true })
writeFileSync(outPath, bundle)

console.log(`built ${outPath}`)
console.log(`  id      ${pkg.name}`)
console.log(`  tokens  ${tokens.length} alias + ${syntax.length} syntax`)
console.log(`  bytes   ${bundle.length}`)
