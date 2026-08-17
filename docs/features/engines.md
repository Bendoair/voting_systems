# Feature: Election engines

## Intent

**Pure functions** that turn a shared election input into seats under each teaching system. Engines are the single source of truth for “what this system does” in case study and simulation.

No React, no i18n, no DOM.

## Structure

**Root:** `src/engines/`

| Piece | Role |
|-------|------|
| `types.ts` | `SystemId`, `Party`, `Region`, `ElectionInput`, `ElectionResult`, … |
| `index.ts` | `runElection(system, input)` dispatcher |
| `shared.ts` | Vote shares, D’Hondt, shared helpers |
| `districtRules.ts` | District winner methods used by mixed / local variants |
| `plurality.ts` | Local FPTP-style |
| `proportional.ts` | Closed list |
| `openList.ts` | Open list |
| `mixed.ts` | Local + list teaching hybrid |
| `irv.ts` | Ranked / IRV |
| `twoRound.ts` | Two-round |

### Input / output

- **In:** parties, regions (with diet baselines), districts, seat budgets, optional district method, polarization.
- **Out:** seats per party, vote/seat shares, and any system-specific breakdown the UI already consumes.

Consumers: `Simulate`, `caseStudy`, `syspick` (and anything else that must stay consistent with those). Polarization is an `ElectionInput` field; UI copy for it should stay aligned across simulation and system-pick.

## Boundaries

- Prefer extending `shared` / `districtRules` over copy-pasting seat math.
- Behavioral changes are product decisions: update case-study narrative and system explainer copy when outcomes shift.
- Unit tests are welcome here if added later; keep them next to engines, not in pages.
- Engines are viewport-agnostic; compact UI only changes how results are shown, never how seats are computed.
