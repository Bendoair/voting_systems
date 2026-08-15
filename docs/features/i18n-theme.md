# Feature: i18n and theme

## Intent

- **Hungarian-first** bilingual UI: every visitor-facing string has HU and EN.
- **Light/dark** appearance without forking feature logic.

## Structure

### Locale

- `src/i18n/messages.ts` — `hu` and `en` catalogs (`Record<string, string>`).
- `src/i18n/index.tsx` — `I18nProvider`, `useI18n()`, `t(key)`, persistence in `localStorage` (`vs-locale`).
- Default locale: `hu`.

Key prefixes by area: `brand` / `nav` / `home`, `tour`, `sys`, `case`, `sim`, `ex`, plus shared chrome.

### Theme

- `src/theme.tsx` — theme state + toggle; CSS variables in `src/styles/app.css`.
- Components should prefer variables (`--ink`, `--accent`, …) over hard-coded palette when adding UI.

## Boundaries

- Do not hard-code user-visible sentences in components when a catalog key exists or should exist.
- Add keys to **both** `hu` and `en` in the same change.
- Theme and locale are orthogonal; features must not assume a fixed theme when encoding meaning (use semantic colors / party colors from data where needed).
