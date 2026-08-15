import type { SystemId } from '../../engines'
import { SYSPICK_SYSTEMS, type SysPickScenario } from './types'

export function isOptimalPick(scenario: SysPickScenario, pick: SystemId): boolean {
  return scenario.bestSystems.includes(pick)
}

export function seatsFor(scenario: SysPickScenario, system: SystemId): number {
  return scenario.playerSeats[system] ?? 0
}

/** Sorted playable systems: best first, then by seats desc, then pick order */
export function rankedSystems(scenario: SysPickScenario): SystemId[] {
  return SYSPICK_SYSTEMS.slice().sort((a, b) => {
    const diff = (scenario.playerSeats[b] ?? 0) - (scenario.playerSeats[a] ?? 0)
    if (diff !== 0) return diff
    return SYSPICK_SYSTEMS.indexOf(a) - SYSPICK_SYSTEMS.indexOf(b)
  })
}
