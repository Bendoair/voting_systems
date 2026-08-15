import type { ElectionInput, ElectionResult, DistrictWinner } from './types'
import {
  computeVoteShares,
  buildSeatResults,
  regionLeadersFromDistrictWinners,
} from './shared'
import { irvWinner } from './districtRules'

/**
 * Instant-runoff (IRV) per district.
 * Transfers follow meat↔plant closeness so split similar parties can consolidate.
 */
export function runIRV(input: ElectionInput): ElectionResult {
  const { parties, regions, districts, totalSeats } = input
  const votes = computeVoteShares(parties, regions, districts, input.polarization ?? 0.7)
  const seatMap: Record<string, number> = Object.fromEntries(parties.map((p) => [p.id, 0]))
  const districtWinners: DistrictWinner[] = []

  const active = districts.slice(0, totalSeats)
  for (const d of active) {
    const shares = { ...(votes.byDistrict[d.id] ?? {}) }
    const winner = irvWinner(shares, parties)
    seatMap[winner] = (seatMap[winner] ?? 0) + 1
    districtWinners.push({ districtId: d.id, partyId: winner, votes: shares })
  }

  return {
    seats: buildSeatResults(parties, seatMap, votes.national, active.length),
    districtWinners,
    regionLeaders: regionLeadersFromDistrictWinners(districtWinners, active),
    regionShares: votes.byRegion,
    districtShares: votes.byDistrict,
    notes: ['irv'],
  }
}
