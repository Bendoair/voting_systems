import type { DistrictMethod, ElectionInput, ElectionResult, DistrictWinner } from './types'
import {
  computeVoteShares,
  pluralityWinner,
  dhondt,
  buildSeatResults,
  regionLeadersFromDistrictWinners,
} from './shared'
import { irvWinner, twoRoundWinner } from './districtRules'

/**
 * Simplified mixed system:
 * - district seats via configurable rule (FPTP / IRV / two-round)
 * - remaining list seats via D'Hondt on national votes
 * - for plurality districts only: mild "winner compensation" list boost (HU-like critique)
 */
export function runMixed(input: ElectionInput): ElectionResult {
  const { parties, regions, districts, totalSeats } = input
  const method: DistrictMethod = input.districtMethod ?? 'plurality'
  const districtSeatCount = Math.min(
    input.districtSeats ?? Math.round(totalSeats * 0.53),
    totalSeats,
    districts.length,
  )
  const listSeats = totalSeats - districtSeatCount

  const votes = computeVoteShares(parties, regions, districts, input.polarization ?? 0.7)
  const seatMap: Record<string, number> = Object.fromEntries(parties.map((p) => [p.id, 0]))
  const districtWinners: DistrictWinner[] = []

  const active = districts.slice(0, districtSeatCount)
  for (const d of active) {
    const shares = { ...(votes.byDistrict[d.id] ?? {}) }
    const winner =
      method === 'ranked'
        ? irvWinner(shares, parties)
        : method === 'two-round'
          ? twoRoundWinner(shares, parties)
          : pluralityWinner(shares)
    seatMap[winner] = (seatMap[winner] ?? 0) + 1
    districtWinners.push({ districtId: d.id, partyId: winner, votes: shares })
  }

  const listBase: Record<string, number> = { ...votes.national }
  if (method === 'plurality') {
    // Compensatory list: slight boost for parties that won many districts
    // (simplified "winner compensation" critique of the status quo)
    for (const p of parties) {
      const won = districtWinners.filter((w) => w.partyId === p.id).length
      const bonus = (won / Math.max(1, districtSeatCount)) * 0.12
      listBase[p.id] = (listBase[p.id] ?? 0) * (1 + bonus)
    }
    const sum = Object.values(listBase).reduce((a, b) => a + b, 0)
    for (const id of Object.keys(listBase)) listBase[id]! /= sum || 1
  }

  const listMap = dhondt(listBase, listSeats)
  for (const p of parties) {
    seatMap[p.id] = (seatMap[p.id] ?? 0) + (listMap[p.id] ?? 0)
  }

  return {
    seats: buildSeatResults(parties, seatMap, votes.national, totalSeats),
    districtWinners,
    regionLeaders: regionLeadersFromDistrictWinners(districtWinners, active),
    regionShares: votes.byRegion,
    districtShares: votes.byDistrict,
    notes: [
      'mixed-simplified',
      `district-${method}`,
      ...(method === 'plurality' ? ['winner-compensation'] : ['list-dhondt-national']),
    ],
  }
}
