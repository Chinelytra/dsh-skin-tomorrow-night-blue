/**
 * Tomorrow Night Blue — palette data and the DSH alias-token derivation.
 *
 * Source palette: "Tomorrow Night Blue" from Chris Kempson's Tomorrow Theme
 * (the classic deep-blue variant). The canonical swatches are:
 *   background #002451 · current line #00346e · selection #003f8e
 *   foreground #ffffff · comment #7285b7 · red #ff9da4 · orange #ffc58f
 *   yellow #ffeead · green #d1f1a9 · aqua #99ffff · blue #bbdaff · purple #ebbbff
 *
 * DSH's design system exposes color through `--dsw-alias-*` tokens, not through
 * editor roles. `deriveTokens()` expands the palette's 15 semantic anchors into
 * that token surface exactly the way the reference theme-preset plugin does, so
 * the skin composes with the design system instead of fighting it. Only tokens
 * the palette can name are rendered; everything else keeps the DSH default.
 *
 * @typedef {object} Palette
 * @property {string} base Application canvas.
 * @property {string} mantle Recessed chrome behind the canvas (sidebar, document preview).
 * @property {string} surface Primary raised surface (layer-1, dialogs, elevated buttons).
 * @property {string} surfaceAlt Secondary nested surface (layer-2/3, overlays, menus, tooltips).
 * @property {string} fill Subtle fill for code blocks, inputs, selectors, tips.
 * @property {string} text Primary text.
 * @property {string} textMuted Secondary text.
 * @property {string} textFaint Tertiary/caption text.
 * @property {string} border Border base color.
 * @property {string} accent Brand accent (buttons, selection, focus).
 * @property {string} onAccent Foreground drawn on top of `accent`.
 * @property {string} danger Error state.
 * @property {string} success Success state.
 * @property {string} warning Warning state.
 * @property {string} info Link/info/business state.
 */

/** Stable skin id used as the override source and the DOM marker. */
export const SKIN_ID = 'tomorrow-night-blue'

/** Display name (proper noun, not translated). */
export const SKIN_NAME = 'Tomorrow Night Blue'

/**
 * The palette. Tomorrow Night Blue has no official light counterpart, so the
 * skin keeps this palette in both appearance modes — it is a dark theme by
 * definition.
 * @type {Palette}
 */
export const PALETTE = Object.freeze({
  base: '#002451',
  mantle: '#001b3d',
  surface: '#00346e',
  surfaceAlt: '#003f8e',
  fill: '#00346e',
  text: '#ffffff',
  textMuted: '#bbdaff',
  textFaint: '#7285b7',
  border: '#0a3f7a',
  accent: '#bbdaff',
  onAccent: '#002451',
  danger: '#ff9da4',
  success: '#d1f1a9',
  warning: '#ffc58f',
  info: '#99ffff',
})

/**
 * Syntax highlighting roles, transcribed onto the Shiki custom properties that
 * ui-theme's `shiki.css` declares on `:root` / `body[data-ds-dark-theme]`.
 * @type {Readonly<Record<string, string>>}
 */
export const SHIKI = Object.freeze({
  '--shiki-foreground': '#ffffff',
  '--shiki-background': '#00346e',
  '--shiki-token-constant': '#ffc58f',
  '--shiki-token-string': '#d1f1a9',
  '--shiki-token-comment': '#7285b7',
  '--shiki-token-keyword': '#ebbbff',
  '--shiki-token-parameter': '#ff9da4',
  '--shiki-token-function': '#99ffff',
  '--shiki-token-string-expression': '#d1f1a9',
  '--shiki-token-punctuation': '#bbdaff',
  '--shiki-token-link': '#bbdaff',
})

/** `color-mix` over the palette's own colors so one palette serves every token. */
function alpha(color, percent) {
  return `color-mix(in srgb, ${color} ${percent}%, transparent)`
}

/** Blend `color` over `base` at `percent` strength. */
function over(color, percent, base) {
  return `color-mix(in srgb, ${color} ${percent}%, ${base})`
}

/**
 * Expand one palette into the DSH alias-token surface.
 *
 * Derived tokens resolve against the palette rather than the base stylesheet,
 * so the skin needs no matching `--dsw-static-*` values and stays independent
 * of which base palette is active behind it.
 * @param {Palette} p - the palette.
 * @returns {Record<string, string>} every overridden alias token.
 */
export function deriveTokens(p) {
  const hairline = alpha(p.border, 55)
  const hover = alpha(p.text, 7)
  const active = alpha(p.text, 12)

  return {
    // ---- surfaces ----
    '--dsw-alias-bg-base': p.base,
    '--dsw-alias-bg-layer-1': p.surface,
    '--dsw-alias-bg-layer-2': p.surfaceAlt,
    '--dsw-alias-bg-layer-3': p.surfaceAlt,
    '--dsw-alias-bg-layer-4': p.surfaceAlt,
    '--dsw-alias-bg-overlay': p.surfaceAlt,
    '--dsw-alias-bg-document-preview': p.mantle,
    '--dsw-alias-label-document-preview': p.textMuted,
    '--dsw-alias-bg-module-platform': p.fill,
    '--dsw-alias-bg-multi-select': p.fill,
    '--dsw-alias-bg-skeleton': alpha(p.text, 8),

    // ---- masks ----
    '--dsw-alias-bg-mask-1': 'rgba(0, 0, 0, 0.3)',
    '--dsw-alias-bg-mask-2': 'rgba(0, 0, 0, 0.14)',
    '--dsw-alias-bg-mask-3': 'rgba(0, 0, 0, 0.48)',
    '--dsw-alias-bg-mask-photo': 'rgba(0, 0, 0, 0.88)',
    '--dsw-alias-bg-mask-drop': alpha(p.base, 70),

    // ---- borders ----
    '--dsw-alias-border-l1': hairline,
    '--dsw-alias-border-l2': p.border,
    '--dsw-alias-border-l3': over(p.border, 72, p.text),
    '--dsw-alias-border-l4': over(p.border, 52, p.text),
    '--dsw-alias-border-l2-darkmode-thin': hairline,
    '--dsw-alias-border-inverted': alpha(p.text, 6),
    '--dsw-alias-border-inverted2': alpha(p.text, 8),

    // ---- labels ----
    '--dsw-alias-label-primary': p.text,
    '--dsw-alias-label-secondary': p.textMuted,
    '--dsw-alias-label-tertiary': p.textFaint,
    '--dsw-alias-label-caption': p.textFaint,
    '--dsw-alias-label-dimmed': alpha(p.text, 32),
    '--dsw-alias-label-primary-foreground': p.onAccent,
    '--dsw-alias-label-primary-inverted': p.base,
    '--dsw-alias-label-primary-dimmed': p.textMuted,
    '--dsw-alias-label-primary-bluish': p.text,
    '--dsw-alias-label-shimmer': alpha(p.text, 45),
    '--dsw-alias-label-deep-diving': p.accent,
    '--dsw-alias-label-deep-diving-shimmer': alpha(p.accent, 60),

    // ---- brand, link, buttons ----
    '--dsw-alias-brand-primary': p.accent,
    '--dsw-alias-brand-text': p.accent,
    '--dsw-alias-brand-primary-invert': p.onAccent,
    '--dsw-alias-brand-primary-new-colorprimary-new-color': p.accent,
    '--dsw-alias-link': p.info,
    '--dsw-alias-button-info-fill': p.info,
    '--dsw-alias-button-info-hover': over(p.info, 82, p.text),
    '--dsw-alias-button-primary-fill': p.accent,
    '--dsw-alias-button-primary-hover': over(p.accent, 82, p.text),
    '--dsw-alias-button-primary-dimmed': alpha(p.accent, 22),
    '--dsw-alias-button-contrast-fill': p.text,
    '--dsw-alias-button-elevated-fill': p.surface,
    '--dsw-alias-button-floating-fill': p.surfaceAlt,
    '--dsw-alias-button-floating-hover': over(p.surfaceAlt, 78, p.text),
    '--dsw-alias-button-ghost-active-fill': p.fill,
    '--dsw-alias-button-ghost-active-hover': over(p.fill, 78, p.text),
    '--dsw-alias-button-ghost-active-border': p.border,
    '--dsw-alias-button-tool-bar-fill-invisible': 'rgba(0, 15, 40, 0.36)',
    '--dsw-alias-button-tool-bar-fill': 'rgba(0, 52, 110, 0.5)',
    '--dsw-alias-button-tool-bar-hover': 'rgba(0, 52, 110, 0.62)',

    // ---- interactive ----
    '--dsw-alias-interactive-bg-hover': hover,
    '--dsw-alias-interactive-bg-active': active,
    '--dsw-alias-interactive-bg-hover-accent': alpha(p.accent, 14),
    '--dsw-alias-interactive-bg-hover-danger': alpha(p.danger, 12),
    '--dsw-alias-interactive-bg-hover-solid': p.surfaceAlt,

    // ---- states ----
    '--dsw-alias-state-error-primary': p.danger,
    '--dsw-alias-state-error-secondary': over(p.danger, 80, p.text),
    '--dsw-alias-state-success-primary': p.success,
    '--dsw-alias-state-success-secondary': over(p.success, 80, p.text),
    '--dsw-alias-state-success-tertiary': alpha(p.success, 16),
    '--dsw-alias-state-warn-primary': p.warning,
    '--dsw-alias-state-warn-secondary': over(p.warning, 80, p.text),
    '--dsw-alias-state-warn-label': over(p.warning, 82, p.text),
    '--dsw-alias-state-warn-tertiary': alpha(p.warning, 16),
    '--dsw-alias-state-business-primary': p.info,
    '--dsw-alias-state-business-tertiary': alpha(p.info, 16),
    '--dsw-alias-state-idle-primary': p.textFaint,
    '--dsw-alias-state-done-primary': '#ebbbff',

    // ---- markdown ----
    '--dsw-alias-markdown-code-block': p.fill,
    '--dsw-alias-markdown-code-block-banner': over(p.fill, 70, p.base),
    '--dsw-alias-markdown-inline-code': p.fill,
    '--dsw-alias-markdown-citation': alpha(p.text, 12),
    '--dsw-alias-markdown-tag': p.fill,
    '--dsw-alias-markdown-placeholder': alpha(p.text, 26),
    '--dsw-alias-markdown-code-segment-selected': p.surface,
    '--dsw-alias-markdown-code-segment-unselected': p.fill,

    // ---- diffs ----
    '--dsw-alias-code-diff-added': p.success,
    '--dsw-alias-code-diff-deleted': p.danger,
    '--dsw-alias-file-diff-added-bg': alpha(p.success, 14),
    '--dsw-alias-file-diff-added-gutter': alpha(p.success, 24),
    '--dsw-alias-file-diff-added-marker': p.success,
    '--dsw-alias-file-diff-deleted-bg': alpha(p.danger, 14),
    '--dsw-alias-file-diff-deleted-gutter': alpha(p.danger, 24),
    '--dsw-alias-file-diff-deleted-marker': p.danger,

    // ---- scrollbars ----
    '--dsw-alias-scrollbar-bg-l1': over(p.border, 62, p.text),
    '--dsw-alias-scrollbar-bg-l2': over(p.border, 62, p.text),
    '--dsw-alias-scrollbar-hover-l1': over(p.border, 84, p.text),
    '--dsw-alias-scrollbar-hover-l2': over(p.border, 84, p.text),

    // ---- floating chrome ----
    '--dsw-alias-toast-bg': p.surfaceAlt,
    '--dsw-alias-toast-label': p.text,
    '--dsw-alias-tooltip-bg': p.surfaceAlt,
    '--dsw-alias-tooltip-key-bg': over(p.surfaceAlt, 80, p.text),
    '--dsw-alias-menu-icon': p.textMuted,
    '--dsw-alias-menu-group-header-fill': alpha(p.surfaceAlt, 94),
    '--dsw-alias-switch-thumb': p.textMuted,
    '--dsw-alias-bg-document-selection': alpha(p.accent, 40),
    '--dsw-focus-ring-color': p.accent,

    // ---- product-specific surfaces ----
    '--dsw-specific-sidebar-fill': p.mantle,
    '--dsw-specific-sidebar-nav-item-hover': hover,
    '--dsw-specific-sidebar-nav-item-active': p.fill,
    '--dsw-specific-sidebar-nav-item-active-accent': alpha(p.accent, 18),
    '--dsw-specific-bubble': p.fill,
    '--dsw-specific-bubble-highlight': alpha(p.accent, 16),
    '--dsw-specific-input-major': p.surface,
    '--dsw-specific-login-input': p.fill,
    '--dsw-specific-menu': p.surfaceAlt,
    '--dsw-specific-selector': p.fill,
    '--dsw-specific-tip': p.fill,
  }
}

/**
 * Every overridden token as plain CSS declarations for a stylesheet layer.
 * `!important` is deliberate: ui-layout writes the composed alias tokens as
 * inline custom properties on `<body>`, and a stylesheet declaration only
 * outranks an inline one when it is important. The skin is a fixed palette, so
 * winning that cascade is the intent.
 * @param {Record<string, string>} tokens - token → value map.
 * @returns {string} `--name:value!important;…` CSS declaration text.
 */
export function declarations(tokens) {
  return Object.entries(tokens)
    .map(([name, value]) => `${name}:${value}!important`)
    .join(';')
}
