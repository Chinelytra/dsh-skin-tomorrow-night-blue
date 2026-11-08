/**
 * dsh-skin-tomorrow-night-blue v1.0.0 — browser half (built from src/palette.mjs; do not edit by hand).
 */
window.__ModuleLoader__.load({
  id: "dsh-skin-tomorrow-night-blue",
  factory: function (require) {
    var module = { exports: {} };
    var exports = module.exports;

var data = {"id":"tomorrow-night-blue","name":"Tomorrow Night Blue","tokens":[["--dsw-alias-bg-base","#002451"],["--dsw-alias-bg-layer-1","#00346e"],["--dsw-alias-bg-layer-2","#003f8e"],["--dsw-alias-bg-layer-3","#003f8e"],["--dsw-alias-bg-layer-4","#003f8e"],["--dsw-alias-bg-overlay","#003f8e"],["--dsw-alias-bg-document-preview","#001b3d"],["--dsw-alias-label-document-preview","#bbdaff"],["--dsw-alias-bg-module-platform","#00346e"],["--dsw-alias-bg-multi-select","#00346e"],["--dsw-alias-bg-skeleton","color-mix(in srgb, #ffffff 8%, transparent)"],["--dsw-alias-bg-mask-1","rgba(0, 0, 0, 0.3)"],["--dsw-alias-bg-mask-2","rgba(0, 0, 0, 0.14)"],["--dsw-alias-bg-mask-3","rgba(0, 0, 0, 0.48)"],["--dsw-alias-bg-mask-photo","rgba(0, 0, 0, 0.88)"],["--dsw-alias-bg-mask-drop","color-mix(in srgb, #002451 70%, transparent)"],["--dsw-alias-border-l1","color-mix(in srgb, #0a3f7a 55%, transparent)"],["--dsw-alias-border-l2","#0a3f7a"],["--dsw-alias-border-l3","color-mix(in srgb, #0a3f7a 72%, #ffffff)"],["--dsw-alias-border-l4","color-mix(in srgb, #0a3f7a 52%, #ffffff)"],["--dsw-alias-border-l2-darkmode-thin","color-mix(in srgb, #0a3f7a 55%, transparent)"],["--dsw-alias-border-inverted","color-mix(in srgb, #ffffff 6%, transparent)"],["--dsw-alias-border-inverted2","color-mix(in srgb, #ffffff 8%, transparent)"],["--dsw-alias-label-primary","#ffffff"],["--dsw-alias-label-secondary","#bbdaff"],["--dsw-alias-label-tertiary","#7285b7"],["--dsw-alias-label-caption","#7285b7"],["--dsw-alias-label-dimmed","color-mix(in srgb, #ffffff 32%, transparent)"],["--dsw-alias-label-primary-foreground","#002451"],["--dsw-alias-label-primary-inverted","#002451"],["--dsw-alias-label-primary-dimmed","#bbdaff"],["--dsw-alias-label-primary-bluish","#ffffff"],["--dsw-alias-label-shimmer","color-mix(in srgb, #ffffff 45%, transparent)"],["--dsw-alias-label-deep-diving","#bbdaff"],["--dsw-alias-label-deep-diving-shimmer","color-mix(in srgb, #bbdaff 60%, transparent)"],["--dsw-alias-brand-primary","#bbdaff"],["--dsw-alias-brand-text","#bbdaff"],["--dsw-alias-brand-primary-invert","#002451"],["--dsw-alias-brand-primary-new-colorprimary-new-color","#bbdaff"],["--dsw-alias-link","#99ffff"],["--dsw-alias-button-info-fill","#99ffff"],["--dsw-alias-button-info-hover","color-mix(in srgb, #99ffff 82%, #ffffff)"],["--dsw-alias-button-primary-fill","#bbdaff"],["--dsw-alias-button-primary-hover","color-mix(in srgb, #bbdaff 82%, #ffffff)"],["--dsw-alias-button-primary-dimmed","color-mix(in srgb, #bbdaff 22%, transparent)"],["--dsw-alias-button-contrast-fill","#ffffff"],["--dsw-alias-button-elevated-fill","#00346e"],["--dsw-alias-button-floating-fill","#003f8e"],["--dsw-alias-button-floating-hover","color-mix(in srgb, #003f8e 78%, #ffffff)"],["--dsw-alias-button-ghost-active-fill","#00346e"],["--dsw-alias-button-ghost-active-hover","color-mix(in srgb, #00346e 78%, #ffffff)"],["--dsw-alias-button-ghost-active-border","#0a3f7a"],["--dsw-alias-button-tool-bar-fill-invisible","rgba(0, 15, 40, 0.36)"],["--dsw-alias-button-tool-bar-fill","rgba(0, 52, 110, 0.5)"],["--dsw-alias-button-tool-bar-hover","rgba(0, 52, 110, 0.62)"],["--dsw-alias-interactive-bg-hover","color-mix(in srgb, #ffffff 7%, transparent)"],["--dsw-alias-interactive-bg-active","color-mix(in srgb, #ffffff 12%, transparent)"],["--dsw-alias-interactive-bg-hover-accent","color-mix(in srgb, #bbdaff 14%, transparent)"],["--dsw-alias-interactive-bg-hover-danger","color-mix(in srgb, #ff9da4 12%, transparent)"],["--dsw-alias-interactive-bg-hover-solid","#003f8e"],["--dsw-alias-state-error-primary","#ff9da4"],["--dsw-alias-state-error-secondary","color-mix(in srgb, #ff9da4 80%, #ffffff)"],["--dsw-alias-state-success-primary","#d1f1a9"],["--dsw-alias-state-success-secondary","color-mix(in srgb, #d1f1a9 80%, #ffffff)"],["--dsw-alias-state-success-tertiary","color-mix(in srgb, #d1f1a9 16%, transparent)"],["--dsw-alias-state-warn-primary","#ffc58f"],["--dsw-alias-state-warn-secondary","color-mix(in srgb, #ffc58f 80%, #ffffff)"],["--dsw-alias-state-warn-label","color-mix(in srgb, #ffc58f 82%, #ffffff)"],["--dsw-alias-state-warn-tertiary","color-mix(in srgb, #ffc58f 16%, transparent)"],["--dsw-alias-state-business-primary","#99ffff"],["--dsw-alias-state-business-tertiary","color-mix(in srgb, #99ffff 16%, transparent)"],["--dsw-alias-state-idle-primary","#7285b7"],["--dsw-alias-state-done-primary","#ebbbff"],["--dsw-alias-markdown-code-block","#00346e"],["--dsw-alias-markdown-code-block-banner","color-mix(in srgb, #00346e 70%, #002451)"],["--dsw-alias-markdown-inline-code","#00346e"],["--dsw-alias-markdown-citation","color-mix(in srgb, #ffffff 12%, transparent)"],["--dsw-alias-markdown-tag","#00346e"],["--dsw-alias-markdown-placeholder","color-mix(in srgb, #ffffff 26%, transparent)"],["--dsw-alias-markdown-code-segment-selected","#00346e"],["--dsw-alias-markdown-code-segment-unselected","#00346e"],["--dsw-alias-code-diff-added","#d1f1a9"],["--dsw-alias-code-diff-deleted","#ff9da4"],["--dsw-alias-file-diff-added-bg","color-mix(in srgb, #d1f1a9 14%, transparent)"],["--dsw-alias-file-diff-added-gutter","color-mix(in srgb, #d1f1a9 24%, transparent)"],["--dsw-alias-file-diff-added-marker","#d1f1a9"],["--dsw-alias-file-diff-deleted-bg","color-mix(in srgb, #ff9da4 14%, transparent)"],["--dsw-alias-file-diff-deleted-gutter","color-mix(in srgb, #ff9da4 24%, transparent)"],["--dsw-alias-file-diff-deleted-marker","#ff9da4"],["--dsw-alias-scrollbar-bg-l1","color-mix(in srgb, #0a3f7a 62%, #ffffff)"],["--dsw-alias-scrollbar-bg-l2","color-mix(in srgb, #0a3f7a 62%, #ffffff)"],["--dsw-alias-scrollbar-hover-l1","color-mix(in srgb, #0a3f7a 84%, #ffffff)"],["--dsw-alias-scrollbar-hover-l2","color-mix(in srgb, #0a3f7a 84%, #ffffff)"],["--dsw-alias-toast-bg","#003f8e"],["--dsw-alias-toast-label","#ffffff"],["--dsw-alias-tooltip-bg","#003f8e"],["--dsw-alias-tooltip-key-bg","color-mix(in srgb, #003f8e 80%, #ffffff)"],["--dsw-alias-menu-icon","#bbdaff"],["--dsw-alias-menu-group-header-fill","color-mix(in srgb, #003f8e 94%, transparent)"],["--dsw-alias-switch-thumb","#bbdaff"],["--dsw-alias-bg-document-selection","color-mix(in srgb, #bbdaff 40%, transparent)"],["--dsw-focus-ring-color","#bbdaff"],["--dsw-specific-sidebar-fill","#001b3d"],["--dsw-specific-sidebar-nav-item-hover","color-mix(in srgb, #ffffff 7%, transparent)"],["--dsw-specific-sidebar-nav-item-active","#00346e"],["--dsw-specific-sidebar-nav-item-active-accent","color-mix(in srgb, #bbdaff 18%, transparent)"],["--dsw-specific-bubble","#00346e"],["--dsw-specific-bubble-highlight","color-mix(in srgb, #bbdaff 16%, transparent)"],["--dsw-specific-input-major","#00346e"],["--dsw-specific-login-input","#00346e"],["--dsw-specific-menu","#003f8e"],["--dsw-specific-selector","#00346e"],["--dsw-specific-tip","#00346e"]],"syntax":[["--shiki-foreground","#ffffff"],["--shiki-background","#00346e"],["--shiki-token-constant","#ffc58f"],["--shiki-token-string","#d1f1a9"],["--shiki-token-comment","#7285b7"],["--shiki-token-keyword","#ebbbff"],["--shiki-token-parameter","#ff9da4"],["--shiki-token-function","#99ffff"],["--shiki-token-string-expression","#d1f1a9"],["--shiki-token-punctuation","#bbdaff"],["--shiki-token-link","#bbdaff"]]};

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

    return module.exports;
  },
});
