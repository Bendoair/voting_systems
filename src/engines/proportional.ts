import type { ElectionInput, ElectionResult } from './types'
import {
  computeVoteShares,
  dhondt,
  buildSeatResults,
  regionLeadersFromShares,
} from './shared'

/** Closed national party list — D'Hondt */
export function runClosedList(input: ElectionInput): ElectionResult {
  const { parties, regions, districts, totalSeats } = input
  const votes = computeVoteShares(parties, regions, districts, input.polarization ?? 0.7)
  const seatMap = dhondt(votes.national, totalSeats)

  return {
    seats: buildSeatResults(parties, seatMap, votes.national, totalSeats),
    districtWinners: [],
    regionLeaders: regionLeadersFromShares(votes.byRegion),
    regionShares: votes.byRegion,
    districtShares: votes.byDistrict,
    notes: ['dhondt'],
  }
}
