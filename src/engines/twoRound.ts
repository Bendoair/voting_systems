import type { ElectionInput, ElectionResult, DistrictWinner } from './types'
import {
  computeVoteShares,
  buildSeatResults,
  regionLeadersFromDistrictWinners,
} from './shared'
import { twoRoundWinner } from './districtRules'

/**
 * Two-round runoff per district.
 * Round-2 transfers use meat↔plant closeness to the finalists.
 */
export function runTwoRound(input: ElectionInput): ElectionResult {
  const { parties, regions, districts, totalSeats } = input
  const votes = computeVoteShares(parties, regions, districts, input.polarization ?? 0.7)
  const seatMap: Record<string, number> = Object.fromEntries(parties.map((p) => [p.id, 0]))
  const districtWinners: DistrictWinner[] = []

  const active = districts.slice(0, totalSeats)
  for (const d of active) {
    const shares = { ...(votes.byDistrict[d.id] ?? {}) }
    const winner = twoRoundWinner(shares, parties)
    seatMap[winner] = (seatMap[winner] ?? 0) + 1
    districtWinners.push({ districtId: d.id, partyId: winner, votes: shares })
  }

  return {
    seats: buildSeatResults(parties, seatMap, votes.national, active.length),
    districtWinners,
    regionLeaders: regionLeadersFromDistrictWinners(districtWinners, active),
    regionShares: votes.byRegion,
    districtShares: votes.byDistrict,
    notes: ['two-round'],
  }
}
