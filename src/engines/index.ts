import type { ElectionInput, ElectionResult, SystemId } from './types'
import { runLocal } from './plurality'
import { runClosedList } from './proportional'
import { runMixed } from './mixed'
import { runOpenList } from './openList'
import { runIRV } from './irv'
import { runTwoRound } from './twoRound'

export function runElection(system: SystemId, input: ElectionInput): ElectionResult {
  switch (system) {
    case 'local':
      return runLocal(input)
    case 'closed-list':
      return runClosedList(input)
    case 'mixed':
      return runMixed(input)
    case 'open-list':
      return runOpenList(input)
    case 'ranked':
      return runIRV(input)
    case 'two-round':
      return runTwoRound(input)
    default:
      return runClosedList(input)
  }
}

export * from './types'
export { computeVoteShares, dhondt } from './shared'
