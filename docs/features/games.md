# Feature: Games

## Intent

Let visitors **play with rules and geography** so advantages and failure modes stick. The hub lists short exercises; the flagship is **gerrymander**: draw districts so a minority of voters still wins a majority of seats.

User-facing name is **Games** (HU: **Játékok**). Code modules may still live under `exercises/` for historical path stability.

## Structure

### Hub

**Route:** `/games` (redirect from `/exercises`)  
**Page:** `src/pages/Exercises.tsx`  
**Copy:** `ex.title`, `ex.intro`, card keys under `ex.gerry.*`

### Gerrymander

**Route:** `/games/gerrymander`  
**Page:** `src/pages/Gerrymander.tsx`  
**Module:** `src/exercises/gerrymander/`

| File | Role |
|------|------|
| `types.ts` | Grid constants, difficulty bands, colors, score types |
| `generate.ts` | Procedural county landmask + voter field; player share by difficulty |
| `score.ts` | District tallies, win condition, fill remaining space, undo helpers |
| `polygon.ts` | Lasso stroke → point-in-polygon assignment |
| `Board.tsx` | Map interaction (voters vs districts views) |

#### Game rules (product)

- Fixed number of districts (`DISTRICT_COUNT`).
- Win: all land cells assigned **and** player holds a majority of districts (soft size balance is advisory).
- Assignment via closed-path lasso; active district overwrites.
- Difficulty sets **player popular-vote share** only (Easy → Insane bands in `DIFFICULTY_BANDS`); changing the slider must **not** regenerate until “New map”.
- Map generation is abstract (simplex noise), not real Hungarian counties.

## Boundaries

- Do not reuse simulation engines for gerrymander scoring; this is a separate pedagogical mechanic.
- New games: add `src/exercises/<name>/`, a hub card, routes under `/games/...`, and a feature subsection here.
- Keep copy in `ex.*` / `ex.<game>.*` for both locales.
