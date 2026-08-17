# Választási rendszerek / Voting systems

Hungarian-first educational site about how **voting rules shape representation** — guided tour, system explainers, a frozen case study, interactive simulation, and short games (including gerrymander).

Not a forecast. Same preferences and geography under different rules is the whole point.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
npm run lint     # oxlint
```

## Stack

| Layer | Choice |
|-------|--------|
| App | Vite + React 19 + TypeScript |
| Routing | React Router |
| Maps | d3-geo + Hungary GeoJSON |
| Tour viz | visx (scales, Voronoi, …) |
| Noise (gerrymander) | simplex-noise |
| Lint | oxlint |

Static SPA — no backend or env vars. Deploy on Vercel (or any static host) with framework **Vite**, build `npm run build`, output `dist`.

On Vercel, enable **Web Analytics** and **Speed Insights** in the project dashboard after deploy (`@vercel/analytics` + `@vercel/speed-insights` are already wired in `App.tsx`).

## What’s in the product

| Path | What it is |
|------|------------|
| `/` | Home / orientation |
| `/tour` | Guided preference → rules narrative (ends with explore links) |
| `/systems` | Catalog of voting systems |
| `/systems/:id` | Deep explainer + examples |
| `/case-study` | Fixed scenario, results compared across systems |
| `/games` | Games hub |
| `/games/gerrymander` | Draw districts; minority votes, majority seats |
| `/games/syspick` | Guess which system maximizes your party’s seats |
| `/simulate` | Tweak parties, geography, seats; live engine |

Old `/exercises` URLs redirect to `/games`.

## Project layout

```
src/pages/        routes
src/components/   shared UI (maps, compact tabs/sheets, …)
src/hooks/        compact layout + chrome
src/data/         scenarios, counties, system meta, map loaders
src/engines/      pure election math
src/exercises/    game modules
src/i18n/         HU / EN strings
docs/             intent & structure docs (start at OVERVIEW.md)
```

Compact phones (≤720px): same routes, tab/sheet composition — see OVERVIEW and each feature’s **Mobile composition** section.

## Documentation

- **[docs/OVERVIEW.md](./docs/OVERVIEW.md)** — project outline and feature index  
- **[docs/features/](./docs/features/)** — one doc per feature (intent + structure)  
- **[AGENTS.md](./AGENTS.md)** — conventions for coding agents  

County outlines: [geoHungary](https://github.com/wuerdo/geoHungary) (simplified for the web).
