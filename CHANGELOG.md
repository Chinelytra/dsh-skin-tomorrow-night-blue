# Changelog

## [1.0.0] — 2026-11-08

Initial public release.

- Tomorrow Night Blue palette (Chris Kempson's Tomorrow Theme) mapped onto 113
  `--dsw-alias-*` DSH design tokens and 11 Shiki syntax roles.
- Host half injects the palette into served `index.html` responses through
  `webserver/index-inject`, so the browser surface paints the skin on first
  frame.
- Browser half ships as a standard DSH `__ModuleLoader__` bundle and wins the
  cascade over the layout presenter's inline token variables.
- Offline verification script (`verify.mjs`) and a CI workflow that rebuilds the
  bundle and runs it.
