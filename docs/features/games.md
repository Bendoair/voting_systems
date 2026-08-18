# Feature: Games

## Intent

Let visitors **play with rules and geography** so advantages and failure modes stick. The hub lists short exercises; current games:

- **gerrymander** — draw districts so a minority of voters still wins a majority of seats
- **syspick** (Rendszertipp / System pick) — given a random party assignment, guess which counting system maximizes *your* seats

User-facing name is **Games** (HU: **Játékok**). Code modules may still live under `exercises/` for historical path stability.

## Copy convention (all games)

Match the gerrymander pattern for hub + in-game framing:

| Key | Role |
|-----|------|
| `ex.<game>.cardBlurb` | **Concept explainer** on the hub card — what phenomenon the game teaches (definition / mechanism), not a how-to. |
| `ex.<game>.rules` / `rulesL*` | **Short in-world brief** in the page `info-panel gerry-brief` — narrative stake, second person, inviting. Prefer short line paragraphs (`rulesL1`…) when the brief is longer than one beat. |
| `ex.<game>.rulesP*` + `rulesLink` | **How-to dialog** opened from the brief — concrete steps; end with a short luck line. |

UI chrome: back link, title, `aside.info-panel.gerry-brief` with rules paragraph + `gerry-rules-btn`, modal dialog for the numbered steps.

## Structure

### Hub

**Route:** `/games` (redirect from `/exercises`)  
**Page:** `src/pages/Exercises.tsx`  
**Copy:** `ex.title`, `ex.intro`, card keys under `ex.gerry.*` and `ex.syspick.*`

### Gerrymander

**Route:** `/games/gerrymander`  
**Page:** `src/pages/Gerrymander.tsx`  
**Module:** `src/exercises/gerrymander/`

| File | Role |
|------|------|
| `types.ts` | Grid constants (`GRID_WIDTH` / `GRID_HEIGHT`), difficulty bands, colors, score types |
| `generate.ts` | Procedural county landmask + voter field; player share by difficulty |
| `score.ts` | District tallies, win condition, fill remaining space, undo helpers |
| `polygon.ts` | Lasso stroke → point-in-polygon assignment |
| `Board.tsx` | Map interaction (voters vs districts views) |

#### Game rules (product)

- Fixed number of districts (`DISTRICT_COUNT`).
- Win: all land cells assigned **and** player holds a majority of districts (soft size balance is advisory).
- Assignment via closed-path lasso; active district overwrites.
- Difficulty sets **player popular-vote share** only (Easy → Insane bands in `DIFFICULTY_BANDS`); changing the slider must **not** regenerate until “New map”.
- Map generation is abstract (simplex noise), not real Hungarian counties. Playfield is **64×48** (4:3).

### System pick (Rendszertipp)

**Route:** `/games/syspick` (redirect from `/exercises/syspick`)  
**Page:** `src/pages/SysPick.tsx`  
**Module:** `src/exercises/syspick/`

| File | Role |
|------|------|
| `types.ts` | Party pool, seat budgets, scenario shape |
| `generate.ts` | Random lineup + geography + precomputed `runElection` for every `SystemId` |
| `score.ts` | Optimal-pick check and seat ranking helpers |

#### Game rules (product)

- Each deal: usually 3–5 parties; ~10% of deals are a two-party large matchup (≈42–58% split) with independent diet leans.
- Player vote share is sampled from a truncated normal **N(25, 10)** (median ~25%, most outcomes within ±20 → roughly 5–45%), then rivals fill the remainder. Two-party mode assigns you one of the two large camps instead.
- Player picks **one** system via chips in a single panel with subsections (list / local / mixed). Open and closed list are one **List** choice (same D’Hondt seats). Local chips include FPTP, IRV, two-round, Borda, and approval. Map result tabs follow the same order. Win if the pick maximizes the player’s seats (ties count).
- Engines and seat budgets match simulation / case study (`199` / `106` OEVK, mixed uses plurality districts).
- Generation retries until systems diverge for the player (seat spread ≥ 2 when possible).
- Deal UI shows a compact county diet map (meat↔plant) under the assigned party, plus population-weighted national lean.
- After the pick, a Hungary election map with system tab chips compares outcomes; chips mark the player’s pick and the best system(s). Correct guesses trigger confetti.

## Boundaries

- Do not reuse simulation engines for gerrymander scoring; that game is a separate pedagogical mechanic.
- **Syspick does** reuse `runElection` so outcomes stay consistent with simulation and the case study.
- New games: add `src/exercises/<name>/`, a hub card, routes under `/games/...`, and a feature subsection here.
- Keep copy in `ex.*` / `ex.<game>.*` for both locales.

## Mobile composition (≤720px)

**Hub C:** Full-viewport carousel or two stacked cards that fit without scroll (shrink visual band). Both games remain.

**Hub B:** Tiny scroll if cards are tall.

**Gerrymander C:** Board fills most of the viewport (playfield **64×48** / 4:3); `BottomSheet` (portaled to `document.body`) for district palette + status (peek: active district + seats; expand: undo, difficulty under New map, actions), anchored **above** the site bottom nav. View toggle on board chrome. Rules stay dialog.

**Gerrymander B:** Board then HUD below (current ≤900 stack) — acceptable only if sheet feels wrong.

**SysPick deal C:** Tabs **Lineup | Pick** — Lineup stacks You above rivals; Pick = system chips + confirm.

**SysPick reveal C:** Tabs **Map | Seats** + system chips; win/lose banner sticky top.

**SysPick B:** Short scroll deal → pick → reveal as desktop, tightened.
