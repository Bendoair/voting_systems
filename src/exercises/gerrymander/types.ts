/** 0 = empty land unassigned; 1..D = district id */
export type DistrictId = number

export type Party = 'player' | 'opponent'

export interface GerryMap {
  width: number
  height: number
  /** true = land (inside county) */
  land: boolean[]
  /** party per cell; only meaningful when land[i] */
  party: Party[]
  landCount: number
  playerCount: number
  seed: number
}

export interface DistrictTally {
  id: number
  total: number
  player: number
  opponent: number
  winner: Party | 'tie' | 'empty'
  sizeOk: boolean
}

export interface ScoreResult {
  tallies: DistrictTally[]
  playerSeats: number
  seatsNeeded: number
  unfilled: number
  allFilled: boolean
  sizesOk: boolean
  won: boolean
}

export const DISTRICT_COUNT = 5
/** Playfield size (width × height). 4:3 reads better on phones than a square. */
export const GRID_WIDTH = 64
export const GRID_HEIGHT = 48
export const SIZE_TOLERANCE = 0.15

export type GerryDifficulty = 'easy' | 'medium' | 'hard' | 'insane'

export const DIFFICULTY_ORDER: GerryDifficulty[] = ['easy', 'medium', 'hard', 'insane']

export const DIFFICULTY_BANDS: Record<GerryDifficulty, { min: number; max: number }> = {
  easy: { min: 0.45, max: 0.47 },
  medium: { min: 0.4, max: 0.45 },
  hard: { min: 0.34, max: 0.39 },
  insane: { min: 0.25, max: 0.3 },
}

export const DISTRICT_COLORS = [
  '#3d7ea6',
  '#8b5a9e',
  '#c45c26',
  '#2a9d8f',
  '#e9c46a',
] as const

export const PLAYER_COLOR = '#1f6f5b'
export const OPPONENT_COLOR = '#9b2c2c'
