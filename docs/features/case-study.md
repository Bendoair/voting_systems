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

### Presentation modes

Two modes on the same route:

| Mode | When | What |
|------|------|------|
| **Animated tour** | Default once per browser tab session (`sessionStorage` key `vs-case-tour-seen` unset) | Five guided steps with a shared caption slot, Prev/Next, and step animations |
| **Simple page** | After the tour is marked seen, or via the top-right toggle | Existing scroll narrative (intro → diet chart → four system blocks → geo → CTAs) |

A visible top-right toggle switches **Animated tour** ↔ **Simple page**. Leaving the tour (toggle to page, or **Done** on step 5) sets `vs-case-tour-seen` so later visits in the same tab open the page. Re-entering the tour does not clear that flag.

### Tour steps

| Step | Panel | Point |
|------|--------|--------|
| 1 | Preference chart | Highlight meat camp → plant party → reveal combined **vote** ladder inside the diet card (above the chart; seats stay off until later steps) |
| 2 | Pure list PR | Seats roughly track preferences |
| 3 | FPTP | Largest party sweeps; large distortions |
| 4 | Ranked (IRV) | Staged captions; pulse preference-vs-seats bars (majority shows, some disproportionality remains) |
| 5 | Two-round | Staged captions; pulse seats-by-party on enter |

Narration lives in one caption slot above the panel (not duplicated in the system block body). Navigation is manual only.

### Data contract

- Parties and baselines are **constants** for the case study. Editing them is a content change, not a user control.
- Results are derived by calling the shared engines so case study and simulation stay consistent.
- Locale only changes labels (party names, chrome), not the numeric scenario.

### i18n

Keys under `case.*` (page copy) and `case.tour.*` (tour chrome + step captions).

## Boundaries

- No party editor here — that belongs to simulation.
- Visuals should emphasize **comparison across systems**, not free exploration.
- If you change engine semantics, re-check case-study narrative copy; the story assumes specific qualitative outcomes.
- Tour does not include the bridge aside, geo map, or footer CTAs — those stay page-mode only.
