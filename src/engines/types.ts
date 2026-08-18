export type SystemId =
  | 'local'
  | 'closed-list'
  | 'mixed'
  | 'open-list'
  | 'ranked'
  | 'two-round'
  | 'borda'
  | 'approval'

/** How single-member district seats are decided (used by mixed, and standalone systems) */
export type DistrictMethod = 'plurality' | 'ranked' | 'two-round'

export const DISTRICT_METHODS: DistrictMethod[] = ['plurality', 'ranked', 'two-round']

export interface Party {
  id: string
  name: string
  color: string
  fruit: string
  /** National vote share in percent; parties should sum to 100 */
  popularity: number
  /** Meat (−1) ↔ plant (+1); counties prefer the closest party on this axis */
  dietLean: number
}

export interface Region {
  id: string
  nameHu: string
  nameEn: string
  /** Matches GeoJSON feature property `megye` */
  megye: string
  /** Relative population weight */
  population: number
  /** County baseline on meat (−1) ↔ plant (+1) */
  dietBaseline: number
}

export interface District {
  id: string
  regionId: string
  name: string
  /** Share of region population */
  weight: number
}

export interface ElectionInput {
  parties: Party[]
  regions: Region[]
  districts: District[]
  totalSeats: number
  /** For mixed: how many seats are single-member districts */
  districtSeats?: number
  /** For mixed: how district seats are awarded (default plurality / HU-like) */
  districtMethod?: DistrictMethod
  /** 0 = ignore geography, 1 = strong closest-party meat/plant divide */
  polarization?: number
  /** For open list: preference boosts per party (candidate index → boost) */
  preferenceBoosts?: Record<string, number[]>
}

export interface SeatResult {
  partyId: string
  seats: number
  voteShare: number
  seatShare: number
}

export interface DistrictWinner {
  districtId: string
  partyId: string
  votes: Record<string, number>
}

export interface ElectionResult {
  seats: SeatResult[]
  districtWinners: DistrictWinner[]
  regionLeaders: Record<string, string>
  /** regionId → partyId → share (for map lead/saturation) */
  regionShares: Record<string, Record<string, number>>
  /** districtId → partyId → share */
  districtShares: Record<string, Record<string, number>>
  /** Optional open-list candidate order after preferences */
  openListOrder?: Record<string, string[]>
  notes?: string[]
}

export interface VoteShares {
  /** partyId → share 0–1 */
  national: Record<string, number>
  /** regionId → partyId → share */
  byRegion: Record<string, Record<string, number>>
  /** districtId → partyId → share */
  byDistrict: Record<string, Record<string, number>>
}
