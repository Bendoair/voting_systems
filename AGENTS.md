# Agent guidelines — voting-systems

This folder is the project root for the voting-systems app (it may sit inside a larger workspace of unrelated experiments). **Stay inside this project** unless the user explicitly asks otherwise.

For product intent and feature boundaries, read [`docs/OVERVIEW.md`](./docs/OVERVIEW.md) and the matching file under [`docs/features/`](./docs/features/). Update those docs when you add or materially change a feature.

## Always keep convention

- Mirror existing patterns: pages compose; `engines/` and `data/` own domain logic; games live under `exercises/<name>/`.
- Prefer small, focused changes. Do not “clean up” unrelated files or invent parallel abstractions.
- Routes and user-facing names: **Games** (`/games`); keep redirects for `/exercises` if you touch routing.
- Bilingual by default: add or edit strings in **both** `hu` and `en` in `src/i18n/messages.ts`. Hungarian is primary.
- Stable ids (`SystemId`, party ids, i18n key prefixes) matter more than renaming for taste.

## Use libraries where possible

- Prefer dependencies already in `package.json` (React, React Router, d3-geo, visx, simplex-noise) over hand-rolled equivalents.
- Election math belongs in `src/engines/` (pure TS). Do not reimplement seat allocation inside React components.
- Maps: use existing GeoJSON + d3-geo helpers; do not paste new projection math without need.
- For new UI math/visualization, check visx / d3-geo first before custom canvas/SVG stacks.

## Keep structure

```
pages/ → screens
components/ → reusable view pieces
data/ → static & scenario data
engines/ → pure election functions
exercises/ → self-contained games
i18n/ → all user-visible copy
docs/ → intent/structure documentation
```

- New **feature**: page (or exercise module) + data/engine hooks as needed + i18n + a short `docs/features/*.md` entry + link from `OVERVIEW.md`.
- New **system**: engine module + `SYSTEMS` meta + `sys.*` copy both locales + examples if applicable.
- Do not put app code or project README at a parent monorepo root; this project’s docs live here.

## Use the linter

- Before finishing a change set, run **`npm run lint`** (oxlint) and fix issues you introduced.
- Also keep **`npm run build`** / `tsc` green when you touch types or public APIs.
- Do not disable lint rules casually; match local style instead.

## Docs vs UI

Feature docs describe **intent and structure**, not pixel-level UI. If you change behavior (win conditions, engine semantics, tour step count, difficulty bands), update the relevant doc in the same change.

## Compact layout (≤720px)

- Use `useCompactLayout()` / `html.is-compact` for phone composition. **Do not fork** `pages/mobile/*` or duplicate engines/i18n.
- Compact may add tabs/sheets/bottom nav; keep the same information reachable. Cut only secondary chrome.
- Tour and case-tour claim the bottom bar via `useOwnBottomNav` so site bottom nav does not stack.
- Desktop layouts above 720px stay unchanged unless the change is shared.
