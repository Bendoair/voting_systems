# Feature: Case study

## Intent

Show, with a **frozen scenario**, that changing only the counting rules can flip who wins seats — even when votes and geography stay fixed.

Pedagogical cast: one large plant-leaning party vs a fragmented meat-leaning camp. The point is spoilers / majority illusion / rule sensitivity, not forecasting a real election.

## Structure

**Route:** `/case-study`  
**Page:** `src/pages/CaseStudy.tsx`  
**Scenario builder:** `src/data/caseStudy.ts` — parties, regional diet baselines, runs every system via `runElection`  
**Geography:** same county / OEVK data as simulation (`counties`, `oevkDistricts`)  
**Views:** preference bar (`CasePreferenceBar`), diet geo map (`CaseDietGeoMap` + legend), seat / preference comparisons

### Data contract

- Parties and baselines are **constants** for the case study. Editing them is a content change, not a user control.
- Results are derived by calling the shared engines so case study and simulation stay consistent.
- Locale only changes labels (party names, chrome), not the numeric scenario.

### i18n

Keys under `case.*`.

## Boundaries

- No party editor here — that belongs to simulation.
- Visuals should emphasize **comparison across systems**, not free exploration.
- If you change engine semantics, re-check case-study narrative copy; the story assumes specific qualitative outcomes.
