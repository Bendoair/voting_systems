# Feature: i18n and theme

## Intent

- **Hungarian-first** bilingual UI: every visitor-facing string has HU and EN.
- **Light/dark** appearance without forking feature logic.

## Structure

### Locale

- `src/i18n/messages.ts` — `hu` and `en` catalogs (`Record<string, string>`).
- `src/i18n/index.tsx` — `I18nProvider`, `useI18n()`, `t(key)`, persistence in `localStorage` (`vs-locale`).
- Default locale: `hu`.

Key prefixes by area:

| Prefix | Area |
|--------|------|
| `brand` / `nav` / `home` | Shell + home |
| `tour` / `sys` / `case` / `sim` / `ex` | Features |
| `compact.*` | Compact-only chrome (panel tabs, short labels like `compact.sim.geo`) |
| `segment.*` | Staged-caption dotlist (`SegmentDots`) |

Shared vocabulary across features (keep wording aligned):

- **Polarization / Polarizáció** — simulation geo slider and system-pick deal meta (`sim.polarization`, `ex.syspick.polarization`).
- Meat ↔ plant diet tones — `sim.diet.*` reused in case study, syspick, tour.

### Theme

- `src/theme.tsx` — theme state + toggle; CSS variables in `src/styles/app.css`.
- Header chrome: **sun/moon** icon for theme; **flag** icon for the locale you would switch *to* (`nav.langSwitch`).
- Components should prefer variables (`--ink`, `--accent`, …) over hard-coded palette when adding UI.
- Compact chrome uses the same tokens; `html.is-compact` toggles layout CSS only.

## Boundaries

- Do not hard-code user-visible sentences in components when a catalog key exists or should exist.
- Add keys to **both** `hu` and `en` in the same change.
- Theme and locale are orthogonal; features must not assume a fixed theme when encoding meaning (use semantic colors / party colors from data where needed).
- Compact layouts must not fork catalogs into mobile-only message trees; reuse existing keys and add `compact.*` only for chrome unique to the ≤720px composition.
