# Feature: Systems (explainers)

## Intent

A **reference catalog** of common voting systems: what each does, why it exists, what it buys, and what it breaks. Aimed at curious readers in a reform conversation — not at lawyers.

Each system ties to:

- Conceptual pros/cons and “when it helps / hurts”
- Real-world Wikipedia-linked examples (`systemExamples`)
- Optional jump into simulation with that system preselected
- For relevant systems, a path into the gerrymander game (district distortion)
- Page intro CTA: system-pick game under the systems intro; gerrymander next to the local section; open-list campaign next to the list section (shared `system-game-btn` style)

## Structure

**Routes:** `/systems` (index), `/systems/:id` (detail)  
**Pages:** `src/pages/Systems.tsx`, `src/pages/SystemDetail.tsx`  
**Metadata:** `src/data/systems.ts` — `SystemMeta` flags (`usesDistricts`, `usesList`, `proportional`)  
**Examples:** `src/data/systemExamples.ts`  
**Presentation helpers:** `src/components/ProsCons.tsx`

## Adding a system

Checklist (keep HU/EN copy in `src/i18n/messages.ts`):

1. **Explainer** in the right catalog group (`SYSTEM_GROUPS` in `src/data/systems.ts`: list / local / mixed), plus `SYSTEMS` meta flags, full `sys.<id>.*` keys, and `SYSTEM_EXAMPLES`.
2. **Engine** module + `runElection` case. Simulation uses `SYSTEMS` as the dropdown; local district systems must use OEVK seat budget via `isLocalDistrictSystem`.
3. **Games** that compare counting rules: add to syspick sections/chips (`ex.syspick.chip.*`). Gerrymander is FPTP packing/cracking only, unless the new system changes that mechanic. Dedicated explainer games (gerrymander on local, Listahely on list / `open-list` detail) stay next to those catalog sections.
4. Ask before adding to **case study** (frozen spoiler story) or **mixed district-method** dropdown. Tour is the preference mental model, not the catalog.

### System ids (stable)

Aligned with engines (`SystemId`):

| Id | Rough meaning |
|----|----------------|
| `local` | Single-member plurality (FPTP-style) |
| `closed-list` | Closed-list PR |
| `mixed` | Mixed local + list (Hungary-like teaching model) |
| `open-list` | Open-list PR |
| `ranked` | Instant-runoff / ranked choice (district) |
| `borda` | Ranked choice with Borda points (district) |
| `two-round` | Two-round runoff |
| `approval` | Approval voting (district; any number of Xs) |

Copy lives in i18n as `sys.<id>.*` (name, summary, rationale, pros, cons, when). Do not duplicate long prose in TS data files.

## Boundaries

- Explainers **describe**; engines **implement**. If behavior and copy disagree, fix one to match the intended teaching model and document the choice in `engines.md`.
- Adding a system means: engine + `SYSTEMS` / `SYSTEM_GROUPS` + full HU/EN `sys.*` keys + examples + syspick chips if it is a playable counting rule. See **Adding a system**.

## Mobile composition (≤720px)

**Catalog C:** Segmented **List | Local | Mixed** — one section at a time; full-width rows; game CTAs under the segment.

**Catalog B:** Single short scroll of three sections (tightened stack).

**Detail C:** Tabs **Summary | Pros/cons | Examples**; sticky Simulate CTA. Open-list detail also links to Listahely.

**Detail B:** Short scroll with collapsed pros/cons accordion.
