# Feature: Simulation

## Intent

A **playground** for cold numbers: pick a system, tweak parties and geography, see seats, vote shares, and a county map color by local winners. Visitors should feel the levers (polarization, baselines, seat budgets, district method on mixed systems).

This is exploratory, not authoritative. Affinities and diet lean are teaching knobs.

## Structure

**Route:** `/simulate` (optional `?system=<SystemId>`)  
**Page:** `src/pages/Simulate.tsx`  
**Defaults:** `src/data/defaultParties.ts`, `src/data/counties.ts`, `src/data/oevkDistricts.ts`  
**Engine:** `runElection(system, input)` from `src/engines`  
**Editors / output:** `PartyEditor`, `GeographyEditor`, `HungaryMap`, `SeatChart`

### Input model (conceptual)

- **Parties** — popularity, diet lean, optional urban/rural and young/old affinities, color/fruit identity.
- **Regions** — county diet baselines (meat ↔ plant).
- **Districts** — OEVK-style single-member units for districted systems.
- **Seats** — total seats; mixed systems also expose a local-seat budget and district method.
- **Polarization** — how strongly per-county meat↔plant preference pulls votes away from the national average (same label language as system-pick); districts within a county may vary slightly.

### Output model

- Seat list with vote share vs seat share
- Optional disproportionality summary
- Map colored by district/county winners where meaningful

### Presentation (desktop)

- Three-column layout: party/setup | map + results | sticky **geo** rail.
- Geo rail: collapsed vertical strip (`sim.geographyClosed`); open header is short **Geography / Földrajz** (`sim.geographyOpen`) — meat↔plant lives in the editor note, not the toggle.
- Map county/district toggle keeps a stable SVG aspect ratio so opening geo + switching views does not jump the map box.

### i18n

Keys under `sim.*` (incl. `sim.geographyOpen` / `sim.geographyClosed` for the desktop geo rail; `sim.polarization` = **Polarizáció / Polarization**, same term as system-pick). Compact panel tabs use `compact.sim.*` (Geography tab label is short **Geo**).

## Boundaries

- Keep election math out of the page: only assemble `ElectionInput` and display `ElectionResult`.
- URL `system` query is a deep-link convenience from system explainers; other state is session UI state (not persisted unless that becomes an explicit feature).
- Map/GeoJSON simplification is for the web; do not treat boundaries as cadastral truth.
- County ↔ district map toggle must not change the map’s layout box (stable SVG aspect ratio); avoid view-specific `min-height` jumps when the geo column is open.

## Mobile composition (≤720px)

**C:** System select + panel tabs **Parties | Map | Results | Geo** (Geo is a narrow tab) — one pane visible. Sticky live seat-count chip. Map height capped (`~min(42dvh, 280px)` multi-panel; up to `~50dvh` when Map is focus). Geography stays reachable, not removed.

**B:** Stack panes with short scroll and sticky jump links (worse for editing + map together).
