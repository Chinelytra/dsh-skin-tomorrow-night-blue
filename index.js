/**
 * Host half of dsh-skin-tomorrow-night-blue.
 *
 * The skin's durable layer lives in the browser half (lib/client.js), which
 * stacks the palette over ui-theme's alias tokens. This host half adds the
 * pre-paint layer for HTML surfaces served by the web server: the same palette
 * is injected into every index response so a page never flashes the default
 * palette while its scripts load.
 *
 * Injection rows are the webserver's structured `style` rows — pure data, no
 * raw string transforms — and a failure here must never break the index
 * response.
 */
import {
  deriveTokens,
  declarations,
  PALETTE,
  SHIKI,
} from './src/palette.mjs'

/** The plugin name Cordis reports for this row. */
export const name = 'dsh-skin-tomorrow-night-blue'

/**
 * Pre-paint stylesheet for served index responses.
 *
 * The selectors keep the declarations at the same-or-higher specificity than
 * ui-theme's base sheets, and `!important` lets this layer outrank the inline
 * custom properties ui-layout writes once the app is live.
 * @returns {string} the CSS text.
 */
function bootStyle() {
  const alias = declarations(deriveTokens(PALETTE))
  const syntax = declarations(SHIKI)
  return `html,html body,html body[data-ds-dark-theme]{${alias};${syntax}}`
}

/**
 * Mount the host half.
 * @param {object} ctx - host context.
 */
export function apply(ctx) {
  let css = ''
  try {
    css = bootStyle()
  } catch {
    return
  }
  ctx.effect(() => ctx.on('webserver/index-inject', (table) => {
    try {
      table.push({ kind: 'style', text: css })
    } catch {
      /* a failed injection must never break the index response */
    }
  }), 'skin-tomorrow-night-blue: pre-paint style')
}
