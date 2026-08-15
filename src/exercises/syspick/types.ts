import type { ElectionResult, Party, Region, SystemId } from '../../engines'

export const SYSPICK_TOTAL_SEATS = 199
export const SYSPICK_DISTRICT_SEATS = 106
export const SYSPICK_MIN_PARTIES = 3
export const SYSPICK_MAX_PARTIES = 5

/**
 * Playable systems in UI / map-tab order.
 * Open + closed list share D’Hondt seats here → one “List” choice (`closed-list`).
 */
export const SYSPICK_SYSTEMS: SystemId[] = [
  'closed-list',
  'local',
  'ranked',
  'two-round',
  'mixed',
]

export const SYSPICK_SECTIONS: { titleKey: string; ids: SystemId[] }[] = [
  { titleKey: 'systems.section.list', ids: ['closed-list'] },
  { titleKey: 'systems.section.local', ids: ['local', 'ranked', 'two-round'] },
  { titleKey: 'systems.section.mixed', ids: ['mixed'] },
]

/** Fruit party templates (names localized at deal time) */
export interface PartyTemplate {
  id: string
  color: string
  fruit: string
  nameHu: string
  nameEn: string
}

export const PARTY_POOL: PartyTemplate[] = [
  { id: 'apple', color: '#C62828', fruit: '🍎', nameHu: 'Alma', nameEn: 'Apple' },
  { id: 'grape', color: '#6A1B9A', fruit: '🍇', nameHu: 'Szőlő', nameEn: 'Grape' },
  { id: 'orange', color: '#EF6C00', fruit: '🍊', nameHu: 'Narancs', nameEn: 'Orange' },
  { id: 'banana', color: '#E6B800', fruit: '🍌', nameHu: 'Banán', nameEn: 'Banana' },
  { id: 'lime', color: '#2E7D32', fruit: '🍋‍🟩', nameHu: 'Lime', nameEn: 'Lime' },
  { id: 'blueberry', color: '#1565C0', fruit: '🫐', nameHu: 'Áfonya', nameEn: 'Blueberry' },
  { id: 'peach', color: '#E91E63', fruit: '🍑', nameHu: 'Őszibarack', nameEn: 'Peach' },
  { id: 'pear', color: '#7CB342', fruit: '🍐', nameHu: 'Körte', nameEn: 'Pear' },
]

export interface SysPickScenario {
  seed: number
  parties: Party[]
  playerPartyId: string
  regions: Region[]
  polarization: number
  /** Precomputed engine results for playable systems */
  bySystem: Record<SystemId, ElectionResult>
  /** Seats won by the player under each playable system */
  playerSeats: Record<SystemId, number>
  /** Systems that maximize player seats (ties allowed) */
  bestSystems: SystemId[]
  bestSeats: number
  /** Spread between best and worst player seat counts (for interestingness) */
  seatSpread: number
}

export type SysPickPhase = 'pick' | 'reveal'
