#!/usr/bin/env node
/**
 * verify.mjs — offline checks for dsh-skin-tomorrow-night-blue.
 *
 * 1. Palette derivation: every token renders a non-empty CSS value.
 * 2. Host half: `webserver/index-inject` receives one structured style row
 *    carrying the palette, and an unusable table never throws.
 * 3. Browser half: the built `lib/client.js` loads through the real
 *    `window.__ModuleLoader__` shape, appends one important stylesheet with
 *    every token, aligns the appearance, and cleans up after disposal.
 *
 * Run: node verify.mjs
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import vm from 'node:vm'

import {
  deriveTokens,
  declarations,
  PALETTE,
  SHIKI,
  SKIN_ID,
} from './src/palette.mjs'

const here = dirname(fileURLToPath(import.meta.url))
let failures = 0
function check(label, condition, detail = '') {
  if (condition) {
    console.log(`ok   ${label}`)
  } else {
    failures += 1
    console.error(`FAIL ${label}${detail ? ` — ${detail}` : ''}`)
  }
}

// ── 1. palette derivation ────────────────────────────────────────────────
const tokens = deriveTokens(PALETTE)
const tokenNames = Object.keys(tokens)
check('derives a full token surface', tokenNames.length >= 100, `${tokenNames.length} tokens`)
check('every token is a non-empty string', tokenNames.every((name) => typeof tokens[name] === 'string' && tokens[name].trim() !== ''))
check('no token leaks "undefined"', tokenNames.every((name) => !tokens[name].includes('undefined')))
check('canvas token follows the palette', tokens['--dsw-alias-bg-base'] === PALETTE.base)
check('text token follows the palette', tokens['--dsw-alias-label-primary'] === PALETTE.text)
check('accent token follows the palette', tokens['--dsw-alias-brand-primary'] === PALETTE.accent)
check('syntax roles cover shiki keys', Object.keys(SHIKI).every((name) => name.startsWith('--shiki-')))
check('declarations are important', declarations({ '--x': '#000' }) === '--x:#000!important')

// ── 2. host half ─────────────────────────────────────────────────────────
const host = await import(pathToFileURL(join(here, 'index.js')).href)
check('host exports a plugin name', typeof host.name === 'string' && host.name.length > 0)
check('host exports apply()', typeof host.apply === 'function')

const handlers = new Map()
const fakeHostCtx = {
  effect(fn, _label) { return fn() },
  on(event, handler) { handlers.set(event, handler); return () => handlers.delete(event) },
}
host.apply(fakeHostCtx)
check('host subscribes to webserver/index-inject', handlers.has('webserver/index-inject'))

const table = []
handlers.get('webserver/index-inject')(table)
check('host pushes exactly one row', table.length === 1, JSON.stringify(table).slice(0, 120))
check('host row is a style row', table[0]?.kind === 'style')
check('host style carries the palette', typeof table[0]?.text === 'string' && table[0].text.includes('--dsw-alias-bg-base:#002451!important'))
check('host style carries syntax colors', table[0]?.text.includes('--shiki-token-keyword:#ebbbff!important'))
check('host style is scoped to the document root', table[0]?.text.startsWith('html,html body,html body[data-ds-dark-theme]{'))
check('host tolerates a bad table', (() => {
  const throwingTable = { push() { throw new Error('nope') } }
  try {
    handlers.get('webserver/index-inject')(throwingTable)
    return true
  } catch {
    return false
  }
})())

// ── 3. browser half ──────────────────────────────────────────────────────
const source = readFileSync(join(here, 'lib', 'client.js'), 'utf8')
let loaded = null
const appended = []
const removed = []
function makeStyle() {
  return {
    tagName: 'style',
    attributes: {},
    textContent: '',
    setAttribute(name, value) { this.attributes[name] = value },
    remove() { removed.push(this) },
  }
}
const head = { appendChild(node) { appended.push(node) } }
const documentStub = {
  head,
  documentElement: { appendChild(node) { appended.push(node) } },
  createElement(tag) {
    if (tag !== 'style') throw new Error(`unexpected element ${tag}`)
    return makeStyle()
  },
}
const context = {
  window: { __ModuleLoader__: { load(def) { loaded = def } } },
  document: documentStub,
  console,
}
vm.createContext(context)
vm.runInContext(source, context, { filename: 'lib/client.js' })

check('bundle registers through the module loader', loaded !== null && loaded.id === 'dsh-skin-tomorrow-night-blue')

let themePreference = 'light'
let setThemeCalls = []
const disposers = []
const bundle = loaded.factory((name) => {
  throw new Error(`bundle must not require ${name}`)
})
check('bundle exports inject=[theme]', JSON.stringify(bundle.inject) === '["theme"]')
check('bundle exports apply()', typeof bundle.apply === 'function')

const fakeClientCtx = {
  effect(fn, _label) { const dispose = fn(); if (typeof dispose === 'function') disposers.push(dispose); return dispose },
  theme: {
    getTheme() { return { preference: themePreference } },
    setTheme(next) { setThemeCalls.push(next); themePreference = next },
  },
}
bundle.apply(fakeClientCtx)
check('browser half appends one stylesheet', appended.length === 1)
const css = appended[0]?.textContent ?? ''
check('browser stylesheet marks the skin', appended[0]?.attributes['data-dsh-skin'] === SKIN_ID)
check('browser stylesheet carries the palette', css.includes('--dsw-alias-bg-base:#002451!important'))
check('browser stylesheet carries syntax colors', css.includes('--shiki-token-comment:#7285b7!important'))
check('browser stylesheet has no empty values', !css.includes(':;') && !css.includes('undefined'))
check('browser half aligned the appearance to dark', setThemeCalls.length === 1 && setThemeCalls[0] === 'dark')
check('browser half registers a disposer', disposers.length >= 1)
for (const dispose of disposers) dispose()
check('disposal removes the stylesheet', removed.length === 1 && appended[0]?.textContent === css)

// The skin must still render when the theme service is unavailable (plugin
// half-order edge cases) and never throw from apply().
const noThemeBundle = loaded.factory(() => null)
const errors = []
const originalError = console.error
console.error = (...args) => errors.push(args)
noThemeBundle.apply({ effect(fn) { fn() }, get() { return null } })
console.error = originalError
check('browser half survives a missing theme service', errors.length === 0)

console.log('')
if (failures > 0) {
  console.error(`${failures} check(s) failed`)
  process.exitCode = 1
} else {
  console.log('all checks passed')
}
