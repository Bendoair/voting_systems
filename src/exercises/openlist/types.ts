export const OPENLIST_SEATS = 21
export const OPENLIST_LIST_SIZE = 8
export const OPENLIST_MIN_WEEKS = 3
export const OPENLIST_MAX_WEEKS = 6

export type PortraitLook = 'short' | 'ponytail' | 'bun'
export type CampaignAction = 'party' | 'balanced' | 'own'
export type OutcomeQuality = 'planned' | 'fizzle' | 'overperform'
export type FieldSwing = 'campaign' | 'infight' | 'quiet'
export type OpenListPhase = 'campaign' | 'night'

export interface ListCandidate {
  id: string
  name: string
  givenName: string
  familyName: string
  look: PortraitLook
  hairColor: string
  suitColor: string
  /** Personal preference score (relative; order is what matters) */
  personal: number
}

export interface OpenListParty {
  id: string
  name: string
  fruit: string
  color: string
  /** National vote percent, sums to 100 across parties */
  share: number
}

export interface OpenListDeal {
  seed: number
  weeksTotal: number
  parties: OpenListParty[]
  playerPartyId: string
  playerId: string
  /** Frozen original list order (closed-list what-if) */
  originalOrder: string[]
  list: ListCandidate[]
}

export interface WeekEvent {
  week: number
  action: CampaignAction
  quality: OutcomeQuality
  field: { partyId: string; kind: FieldSwing }[]
  /** List-mate who ran a self campaign that moved your rank or the cutoff */
  listMateSelf?: { id: string; name: string }
  playerRankBefore: number
  playerRankAfter: number
  seatsBefore: number
  seatsAfter: number
  playerShareBefore: number
  playerShareAfter: number
}

export interface OpenListSnapshot {
  parties: OpenListParty[]
  list: ListCandidate[]
  seats: Record<string, number>
  playerSeats: number
  playerRank: number
  inProjected: boolean
}
