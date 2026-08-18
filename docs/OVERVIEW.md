# Voting systems — project overview

Educational SPA about how **voting rules shape representation**, framed for Hungary’s reform debate. Hungarian is the primary locale; English is a full second language.

The site is not a prediction tool. It teaches mechanisms: same people and preferences, different counting rules → different outcomes.

## Product shape

| Area | Route | Role |
|------|--------|------|
| Home | `/` | Brand + orientation. Compact: one-viewport hero + CTAs; guide list in a “Where to start?” dialog (includes Games). |
| Tour | `/tour` | Guided mental model (preferences → parties → tactics → “rules matter”) |
| Systems | `/systems`, `/systems/:id` | Catalog + deep explainers for common systems |
| Case study | `/case-study` | Frozen scenario: identical inputs, compared across systems (tour + page modes) |
| Games | `/games`, `/games/gerrymander`, `/games/syspick`, `/games/openlist` | Interactive exercises that make distortions tangible |
| Simulate | `/simulate` | Adjustable parties, geography, seats; live engine runs |

Legacy `/exercises*` URLs redirect to `/games*`.

## Mental model (shared across features)

1. **Preferences** — abstract “diet lean” (meat ↔ plant) stands in for political taste; multi-issue life is simplified to axes people can see.
2. **Parties** — positions on that axis plus popularity / affinities.
3. **Geography** — counties (and OEVK-style districts) turn national taste into local contests. **Polarization** (same word in simulation and system-pick) is how strongly county preference pulls votes away from the national average.
4. **Rules** — engines map the same inputs to seats under different systems.
5. **Comparison** — case study and simulation exist so the visitor *sees* rule effects, not only reads about them.

## Source layout

```
src/
  pages/           # route-level screens
  components/      # reusable UI (maps, editors, charts, tour compass, compact chrome)
  hooks/           # useCompactLayout, useCompactChrome
  data/            # static scenarios, counties, system metadata, examples, mapGeo cache
  engines/         # pure election math (no React)
  exercises/       # game modules (gerrymander, syspick, openlist)
  i18n/            # HU/EN catalogs + provider
  styles/          # global CSS (incl. html.is-compact)
  theme.tsx        # light/dark preference
  utils/           # small shared helpers (e.g. map coloring)
```

**Convention:** domain logic lives in `engines/` and `data/`; pages compose them. Games keep their own module under `exercises/<name>/`. User-facing copy lives in `i18n/messages.ts`, never hard-coded in pages when both locales are needed.

## Cross-cutting concerns

- **i18n** — `hu` default; keys shared across features (`tour.*`, `sys.*`, `case.*`, `sim.*`, `ex.*`, `compact.*`, `segment.*`).
- **Theme** — light/dark via `ThemeProvider`; header uses sun/moon + flag icons; CSS variables in `app.css`.
- **Maps** — Hungary GeoJSON via `data/mapGeo.ts` (cached loaders) + `d3-geo`; gerrymander uses a generated **64×48** grid, not real counties.
- **Compact layout (≤720px)** — see below; each feature doc has a **Mobile composition** section (C primary / B fallback).
- **Docs** — this folder; each feature has its own doc focused on *intent and structure*.

### Compact layout (site-wide)

- Breakpoint: `max-width: 720px` → `useCompactLayout()` sets `html.is-compact`.
- **One route per feature** — no `pages/mobile/*` forks; composition only (tabs / steps / sheets).
- Site chrome: slim top brand + theme/lang; **bottom nav** for Tour / Systems / Case / Games / Simulate (Home via brand).
- **`useOwnBottomNav(true)`** only when a page supplies its own bottom bar (Tour; case-study **tour** mode). Otherwise keep the site bottom nav.
- Shared primitives: `PanelTabs`, `BottomSheet` (portaled to `document.body` so `position: fixed` is viewport-true), `SegmentDots` for staged caption beats.
- Gerrymander district sleeve sits **above** the site bottom nav (`bottomOffset`), not instead of it.

## Feature docs

| Doc | Covers |
|-----|--------|
| [features/tour.md](./features/tour.md) | Guided tour narrative and step structure |
| [features/systems.md](./features/systems.md) | System catalog and explainers |
| [features/case-study.md](./features/case-study.md) | Frozen multi-system comparison |
| [features/simulation.md](./features/simulation.md) | Interactive election playground |
| [features/games.md](./features/games.md) | Games hub + gerrymander + system pick + open-list campaign |
| [features/engines.md](./features/engines.md) | Shared election engines and types |
| [features/i18n-theme.md](./features/i18n-theme.md) | Locale and appearance |

Agent working agreements: see [`../AGENTS.md`](../AGENTS.md).
