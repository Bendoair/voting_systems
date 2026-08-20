# Feature: Games

## Intent

Let visitors **play with rules and geography** so advantages and failure modes stick. The hub lists short exercises; current games:

- **gerrymander** — draw districts so a minority of voters still wins a majority of seats
- **syspick** (Rendszertipp / System pick) — given a random party assignment, guess which counting system maximizes *your* seats
- **openlist** (Listahely / List place) — campaign on an open list: party share sets seats, personal support fills them; win by getting elected

User-facing name is **Games** (HU: **Játékok**). Code modules may still live under `exercises/` for historical path stability.

## Copy convention (all games)

Match the gerrymander pattern for hub + in-game framing:

| Key | Role |
|-----|------|
| `ex.<game>.cardBlurb` | **Concept explainer** on the hub card — what phenomenon the game teaches (definition / mechanism), not a how-to. |
| `ex.<game>.rules` / `rulesL*` | **Short in-world brief** in the page `info-panel gerry-brief` — narrative stake, second person, inviting. Prefer short line paragraphs (`rulesL1`…) when the brief is longer than one beat. |
| `ex.<game>.rulesP*` + `rulesLink` | **How-to dialog** — concrete steps; end with a short luck line. |

Desktop chrome: back link, title, `aside.info-panel.gerry-brief` with the in-world brief + `gerry-rules-btn`, modal for the numbered steps. Compact how-to reuses the same steps and only swaps in sleeve location notes (`compact.gerry.rulesP3b|P5b|P8b`).

Compact (≤720px): `CompactFlavorChrome` — star **Történet / Story** (`compact.ex.flavorLink`) beside Game rules. Story opens the in-world brief (`rules` / `rulesL*`); Game rules still opens `rulesP*`.

## Structure

### Hub

**Route:** `/games` (redirect from `/exercises`)  
**Page:** `src/pages/Exercises.tsx`  
**Copy:** `ex.title`, `ex.intro`, card keys under `ex.gerry.*`, `ex.syspick.*`, and `ex.openlist.*`

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
- After the pick, a Hungary election map with system tab chips compares outcomes; chips mark the player’s pick and the best system(s). Correct guesses trigger confetti; misses get a short rain wash (same overlay stack as Listahely).

### Open list (Listahely)

**Route:** `/games/openlist` (redirect from `/exercises/openlist`)  
**Page:** `src/pages/OpenListGame.tsx`  
**Module:** `src/exercises/openlist/`

| File | Role |
|------|------|
| `types.ts` | Toy chamber (21 seats), list size (8), week bounds, deal / event / snapshot shapes |
| `generate.ts` | SysPick-style multi-party shares (no 50–50 two-party deals), list rank peaked at the D’Hondt cutoff (slight lean to barely out; never start in by 3+ seats), noisy weekly outcomes |
| `score.ts` | D’Hondt via `engines/shared`, live list order, projected IN/OUT, closed-list what-if |

Shared compact chrome: `src/components/CompactFlavorChrome.tsx`. Party-share sampling lives in `src/exercises/dealParties.ts` (`buildMultiPartyDeal`). Week overlays live in `src/components/ConfettiBurst.tsx` (`FullscreenEffect`; `ConfettiBurst` stays the SysPick / Gerrymander API).

#### Game rules (product)

- Teaching: open list is two coupled counts — (1) party votes → D’Hondt seats, (2) personal preference → who fills them. Closed list shares (1) and freezes (2).
- In-world brief (`rulesL*`): **Zedország / Zed-country** is running a new open-list election; the player is a named candidate who needs the party to do well *and* not miss the cutoff.
- How-to dialog (`rulesP*`): desktop copy refers to the two-column layout. Compact uses `compact.openlist.rulesP*` (tabs **You | Campaign**, no left/right).
- Win: **you are elected** (rank ≤ party seats after election). Copy does not scold party-first vs self-first play.
- Starting rank is peaked at the live D’Hondt cutoff: **barely in** (last projected seat) or **barely out** (first seat out), with a slight lean to just off the list. Other ranks still show up often, but you never start **in by 3+ seats** (never 3 list-mates below you who are also in). If the party has 0 seats or fills the whole list, the nearest edge is used instead.
- Campaign length random **3–6 weeks**, peaked at **4**. Each week the player picks Campaign for Party / Balanced Campaign / Campaign for Yourself; the field also moves. Intended effects are noisy (planned / fizzle / overperform).
- Other parties are **aggregate share swings only** (no rival lists). They may campaign or fall victim to infighting. List-mates drift in the background; copy mentions a list-mate only if a **self** campaign actually changes the player’s rank or the cutoff.
- Consequence copy: separate caption chips for **your party’s week** (`A pártod hete` / `Your party’s week`) vs **the field** (green / red / neutral). A surge shows a small lightning mark on that kicker; a fizzle shows a teardrop. Overlay only on a surge (yellow forked lightning along the screen edges) or a fizzle (rain); a planned week has no flash. New deal must not replay an overlay.
- After the last week: election-night screen (no ID card, no action cards). A seeded jitter (share σ ≈ 3pp, light preference noise) is applied so last-week standings are not 1:1 the lock. Results **count in** toward those finals (climb / dip / overshoot / settle, varied per party), then lock. Confetti if in; **longer rain** if out (not a dark wash). Then a closed-list what-if (same seats, **original** list order) — mechanism beat, not a second win condition.
- Toy chamber, not the 199-seat Hungary sim. Do **not** reuse `src/engines/openList.ts` as-is; do reuse `dhondt`. Syspick’s “List = open and closed seats” stays unchanged.

## Boundaries

- Do not reuse simulation engines for gerrymander scoring; that game is a separate pedagogical mechanic.
- **Syspick does** reuse `runElection` so outcomes stay consistent with simulation and the case study.
- New games: add `src/exercises/<name>/`, a hub card, routes under `/games/...`, and a feature subsection here.
- Keep copy in `ex.*` / `ex.<game>.*` for both locales.

## Mobile composition (≤720px)

**Hub C:** Full-viewport carousel or stacked cards that fit without scroll (shrink visual band). All three games remain.

**Hub B:** Tiny scroll if cards are tall.

**Gerrymander C:** Board fills most of the viewport (playfield **64×48** / 4:3); `BottomSheet` (portaled to `document.body`) for district palette + status (peek: active district + seats; grab handle in **accent** green; expand: undo, difficulty under New map, actions), anchored **above** the site bottom nav. View toggle on board chrome. Compact chrome: star **Story** next to **Game rules** (same `i` pill as the other games); Story opens the in-world county brief. On entry, Game rules wiggles briefly (`useEntryHint`). How-to is the desktop list plus compact sleeve notes on district panel / Undo / Fill Remaining Space (`compact.gerry.rulesP3b|P5b|P8b`).

**Gerrymander B:** Board then HUD below (current ≤900 stack) — acceptable only if sheet feels wrong.

**SysPick deal C:** Tabs **Lineup | Pick** — Lineup stacks You above rivals; Pick = system chips + confirm. Compact chrome: star **Story** next to **Game rules**; Story opens `rulesL*`. On entry, Game rules wiggles briefly.

**SysPick reveal C:** Tabs **Map | Seats** + system chips; win/lose banner sticky top.

**SysPick B:** Short scroll deal → pick → reveal as desktop, tightened.

**Open list campaign C:** Tabs **You | Campaign**. Compact chrome: star **Story** next to **Game rules** (same pill as the other games); Story opens the in-world `rulesL*` brief. On entry, Game rules wiggles briefly. You = portrait left, vertical divider, name / party / vote % / projected seats on the right, then the live list. Campaign = your current list row (rank, IN/OUT, party tint) under the tabs, then **Campaign: Week n / total**, three action cards left with caption chips in a matching-height scroller on the right (surge/fizzle marks on the party-week kicker), vertical bars below (kept on-screen). Site bottom nav stays (no `useOwnBottomNav`).

**Open list election C:** One page (no List | Result tabs). Story / Game rules pills stay in the header; the counting/result strip sits in the tab slot. The party list is a window clipped around you, **the same height as the campaign play stack** (your row + week counter + three action cards) so the bars do not jump. You stay centered unless that would leave empty space — then the window pins to the top (or bottom) of the list. Clipped edges fade, except the edge your row sits on. Count-in bars, then closed-list line and new deal after lock. How-to dialog uses `compact.openlist.rulesP*` (no left/right desktop layout talk).

**Open list B:** Short scroll of the two campaign rows, then election night as desktop, tightened.
