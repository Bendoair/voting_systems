import { dhondt } from '../../engines/shared'
import type { ListCandidate, OpenListDeal, OpenListParty, OpenListSnapshot } from './types'
import { OPENLIST_SEATS } from './types'

function sharesRecord(parties: OpenListParty[]): Record<string, number> {
  return Object.fromEntries(parties.map((p) => [p.id, p.share / 100]))
}

export function seatAlloc(parties: OpenListParty[]): Record<string, number> {
  return dhondt(sharesRecord(parties), OPENLIST_SEATS)
}

export function sortedList(list: ListCandidate[]): ListCandidate[] {
  return [...list].sort((a, b) => b.personal - a.personal || a.id.localeCompare(b.id))
}

export function playerRank(list: ListCandidate[], playerId: string): number {
  return sortedList(list).findIndex((c) => c.id === playerId) + 1
}

export function snapshot(deal: OpenListDeal, parties: OpenListParty[], list: ListCandidate[]): OpenListSnapshot {
  const seats = seatAlloc(parties)
  const playerSeats = seats[deal.playerPartyId] ?? 0
  const rank = playerRank(list, deal.playerId)
  return {
    parties,
    list: sortedList(list),
    seats,
    playerSeats,
    playerRank: rank,
    inProjected: rank <= playerSeats && playerSeats > 0,
  }
}

export function closedListWouldWin(deal: OpenListDeal, playerSeats: number): boolean {
  const origRank = deal.originalOrder.indexOf(deal.playerId) + 1
  return origRank > 0 && origRank <= playerSeats && playerSeats > 0
}

export function isElected(snap: OpenListSnapshot): boolean {
  return snap.inProjected
}
