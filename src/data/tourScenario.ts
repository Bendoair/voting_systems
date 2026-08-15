export interface CompassPoint {
  id: string
  /** i18n key suffix under tour.party.* (parties) or id (voters) */
  labelKey: string
  /** meat(-1) … plant(+1) */
  x: number
  /** traditional(-1) … reform(+1) */
  y: number
  color: string
  emoji: string
  kind: 'party' | 'voter'
  /** Display name for voters */
  name?: string
}

export const TOUR_PARTIES: CompassPoint[] = [
  { id: 'fruit', labelKey: 'fruit', x: 0.75, y: 0.55, color: '#C62828', emoji: '🍎', kind: 'party' },
  { id: 'veg', labelKey: 'veg', x: 0.55, y: 0.15, color: '#2E7D32', emoji: '🥦', kind: 'party' },
  { id: 'pork', labelKey: 'pork', x: -0.7, y: -0.35, color: '#EF6C00', emoji: '🥩', kind: 'party' },
  { id: 'chicken', labelKey: 'chicken', x: -0.35, y: 0.4, color: '#F9A825', emoji: '🍗', kind: 'party' },
  { id: 'fish', labelKey: 'fish', x: -0.1, y: 0.75, color: '#0277BD', emoji: '🐟', kind: 'party' },
]

export const TOUR_VOTERS: CompassPoint[] = [
  { id: 'anna', labelKey: 'anna', name: 'Réka', x: 0.65, y: 0.45, color: '#333', emoji: '👤', kind: 'voter' },
  { id: 'balazs', labelKey: 'balazs', name: 'Gergő', x: -0.6, y: -0.25, color: '#333', emoji: '👤', kind: 'voter' },
  { id: 'csilla', labelKey: 'csilla', name: 'Zsófi', x: -0.3, y: 0.35, color: '#333', emoji: '👤', kind: 'voter' },
  { id: 'david', labelKey: 'david', name: 'Tamás', x: 0.2, y: -0.5, color: '#333', emoji: '👤', kind: 'voter' },
  { id: 'emma', labelKey: 'emma', name: 'Emma', x: 0.98, y: 0.38, color: '#6A1B9A', emoji: '👤', kind: 'voter' },
]

/** Extra voters for crowd feel */
export const TOUR_CROWD: { id: string; x: number; y: number; name: string }[] = [
  { id: 'c1', name: 'Kata', x: 0.4, y: 0.35 },
  { id: 'c2', name: 'Bence', x: 0.15, y: 0.1 },
  { id: 'c3', name: 'Noémi', x: -0.45, y: 0.15 },
  { id: 'c4', name: 'Máté', x: -0.55, y: -0.5 },
  { id: 'c5', name: 'Lili', x: 0.05, y: -0.25 },
  { id: 'c6', name: 'Dániel', x: 0.5, y: -0.15 },
  { id: 'c7', name: 'Eszter', x: -0.2, y: -0.6 },
  { id: 'c8', name: 'Ákos', x: 0.7, y: 0.2 },
  { id: 'c9', name: 'Vivien', x: -0.75, y: 0.05 },
  { id: 'c10', name: 'Péter', x: 0.3, y: 0.65 },
  { id: 'c11', name: 'Fanni', x: -0.1, y: 0.25 },
  { id: 'c12', name: 'Olivér', x: 0.85, y: -0.3 },
]

export function nearestParty(voter: { x: number; y: number }, parties: CompassPoint[]): CompassPoint {
  let best = parties[0]!
  let bestD = Infinity
  for (const p of parties) {
    const d = (voter.x - p.x) ** 2 + (voter.y - p.y) ** 2
    if (d < bestD) {
      bestD = d
      best = p
    }
  }
  return best
}

/** Emma prefers Fruit but tactically votes Vegetable */
export const EMMA_TRUE = 'fruit'
export const EMMA_TACTICAL = 'veg'

export const HUGE_DIMS = '32212124'
