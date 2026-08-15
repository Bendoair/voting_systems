import type { ElectionInput, ElectionResult } from './types'
import {
  computeVoteShares,
  dhondt,
  buildSeatResults,
  regionLeadersFromShares,
} from './shared'

/**
 * Open list: D'Hondt seats by party, then within-party candidate order
 * shifted by preference boosts (higher boost → higher on list).
 */
export function runOpenList(input: ElectionInput): ElectionResult {
  const { parties, regions, districts, totalSeats } = input
  const votes = computeVoteShares(parties, regions, districts, input.polarization ?? 0.7)
  const seatMap = dhondt(votes.national, totalSeats)

  const openListOrder: Record<string, string[]> = {}
  const boosts = input.preferenceBoosts ?? {}

  for (const p of parties) {
    const seats = seatMap[p.id] ?? 0
    const n = Math.max(seats, 5)
    const candidates = Array.from({ length: n }, (_, i) => `${p.fruit}-${i + 1}`)
    const pref = boosts[p.id] ?? candidates.map((_, i) => (i === 0 ? 0.3 : 0.1 / (i + 1)))
    const scored = candidates.map((name, i) => ({
      name,
      score: (pref[i] ?? 0) + (n - i) * 0.01,
    }))
    scored.sort((a, b) => b.score - a.score)
    openListOrder[p.id] = scored.map((s) => s.name)
  }

  return {
    seats: buildSeatResults(parties, seatMap, votes.national, totalSeats),
    districtWinners: [],
    regionLeaders: regionLeadersFromShares(votes.byRegion),
    regionShares: votes.byRegion,
    districtShares: votes.byDistrict,
    openListOrder,
    notes: ['open-list', 'dhondt'],
  }
}
