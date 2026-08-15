import type { Party } from '../engines/types'

/** Default lineup: middle, slight plant, slight meat, extreme meat */
const BASE = [
  {
    id: 'lime',
    color: '#2E7D32',
    fruit: '🍋‍🟩',
    popularity: 25,
    dietLean: 0,
    nameHu: 'Lime',
    nameEn: 'Lime',
  },
  {
    id: 'banana',
    color: '#E6B800',
    fruit: '🍌',
    popularity: 25,
    dietLean: 0.5,
    nameHu: 'Banán',
    nameEn: 'Banana',
  },
  {
    id: 'grape',
    color: '#6A1B9A',
    fruit: '🍇',
    popularity: 25,
    dietLean: -0.5,
    nameHu: 'Szőlő',
    nameEn: 'Grape',
  },
  {
    id: 'orange',
    color: '#EF6C00',
    fruit: '🍊',
    popularity: 25,
    dietLean: -1,
    nameHu: 'Narancs',
    nameEn: 'Orange',
  },
] as const

export function getDefaultParties(locale: 'hu' | 'en'): Party[] {
  return BASE.map((p) => ({
    id: p.id,
    color: p.color,
    fruit: p.fruit,
    popularity: p.popularity,
    dietLean: p.dietLean,
    name: locale === 'en' ? p.nameEn : p.nameHu,
  }))
}

export const DEFAULT_PARTIES = getDefaultParties('hu')

/** Scale current shares so they sum to exactly 100 (integer percents). */
export function normalizeVotePercents(parties: Party[]): Party[] {
  if (parties.length === 0) return parties
  const raw = parties.map((p) => Math.max(0, p.popularity))
  const sum = raw.reduce((a, b) => a + b, 0)
  if (sum <= 0) {
    const each = Math.floor(100 / parties.length)
    let rem = 100 - each * parties.length
    return parties.map((p, i) => ({
      ...p,
      popularity: each + (i < rem ? 1 : 0),
    }))
  }
  const scaled = raw.map((v) => (v / sum) * 100)
  const floored = scaled.map((v) => Math.floor(v))
  let rem = 100 - floored.reduce((a, b) => a + b, 0)
  const order = scaled
    .map((v, i) => ({ i, frac: v - floored[i]! }))
    .sort((a, b) => b.frac - a.frac)
  const out = floored.slice()
  for (let k = 0; k < rem; k++) {
    out[order[k % order.length]!.i]! += 1
  }
  return parties.map((p, i) => ({ ...p, popularity: out[i]! }))
}

/** Set one party's vote % without touching the others. */
export function setPartyVotePercent(
  parties: Party[],
  id: string,
  nextPercent: number,
): Party[] {
  const target = Math.max(0, Math.min(100, Math.round(nextPercent)))
  return parties.map((p) => (p.id === id ? { ...p, popularity: target } : p))
}
