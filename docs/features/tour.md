# Feature: Tour

## Intent

Give a first-time visitor a **shared vocabulary** before they hit explainers, simulation, or games:

- People differ; no party matches anyone perfectly.
- Multi-issue preference is hard to draw; two axes keep a usable map.
- Parties occupy positions; voters attach to the nearest (or vote tactically).
- **Same people, different rules** → different outcomes — so further exploration matters.

The tour ends by pointing outward (case study, systems, games, simulate), not by teaching Hungary’s constitution in detail.

## Structure

**Entry:** `/tour` · **Page:** `src/pages/Tour.tsx`  
**Scenario data:** `src/data/tourScenario.ts` (parties, voters, Emma tactical override, dimension joke constant)  
**Visualization:** `src/components/Compass.tsx` (preference plane, extra axes, dimension explosion, Voronoi, crowd, hover prefs)

### Steps (fixed narrative order)

| Step | Idea | Data / viz |
|------|------|------------|
| 1 | We differ | Copy only |
| 2 | No perfect match / dimensionality | Compass dimension reel (autoplay) |
| 3 | Place yourself on the food compass | Interactive “you” |
| 4 | Parties on the map | Parties + Voronoi |
| 5 | Nearest-party voting | Crowd + hover preference lines |
| 6 | Tactical voting (Emma) | Override link Fruit → Vegetable |
| 7 | Same people, different rules → explore | Links to case / systems / games / simulate |

Step count is intentional: step 7 is the finale. Do not reintroduce a separate “Hungary wrap-up” step unless the product story changes.

### Step 2: dimension reel

The point is made without asking for a click. `DimensionReel` (in `Tour.tsx`) drives `Compass` through fixed stages: two labelled axes → a third (cheap ↔ fine dining) → a fourth drawn dashed, because honestly it needs 4D → further unlabelled axes appearing faster and faster → the dimension explosion with the absurd axis count. A caption names each stage.

Playback starts ~5s after the step opens, so the reader can take in the two axes first; **Replay** restarts it immediately. Re-entering the step remounts the reel and restarts the wait.

### i18n

Keys under `tour.*` (`tour.sN.title` / `body`, explore blurbs, compass labels, party names).

## Boundaries

- Tour **does not** run the election engines. It builds intuition only.
- Party/voter positions are a pedagogical cast, not the simulation defaults.
- Keep new steps rare; prefer enriching existing steps over lengthening the path.
