import type { Party, Region, District, VoteShares } from './types'

/** Softmax-style normalize positive weights to shares summing to 1 */
export function normalize(weights: Record<string, number>): Record<string, number> {
  const entries = Object.entries(weights)
  const sum = entries.reduce((a, [, v]) => a + Math.max(0, v), 0)
  if (sum <= 0) {
    const eq = 1 / Math.max(1, entries.length)
    return Object.fromEntries(entries.map(([k]) => [k, eq]))
  }
  return Object.fromEntries(entries.map(([k, v]) => [k, Math.max(0, v) / sum]))
}

function clampDiet(v: number): number {
  return Math.max(-1, Math.min(1, v))
}

/** Closest-party affinity on meat↔plant; mild places prefer mild parties. */
export function dietAffinity(partyLean: number, placeDiet: number): number {
  const gap = Math.abs(clampDiet(partyLean) - clampDiet(placeDiet))
  return 1 - gap / 2
}

/** Seeded noise in roughly [-amplitude, +amplitude] */
function seededNoise(seedKey: string, salt: number, amplitude: number): number {
  const h = hashStr(`${seedKey}:${salt}`)
  return ((h % 1000) / 1000 - 0.5) * 2 * amplitude
}

/**
 * Vote shares from national vote % reweighted by meat↔plant closeness.
 * Counties/districts get seeded diet noise so races aren't identical.
 */
export function computeVoteShares(
  parties: Party[],
  regions: Region[],
  districts: District[],
  polarization = 0.7,
): VoteShares {
  const pol = Math.max(0, Math.min(1, polarization))
  const national = normalize(
    Object.fromEntries(parties.map((p) => [p.id, Math.max(0, p.popularity)])),
  )

  const regionDiet: Record<string, number> = {}
  const byRegion: VoteShares['byRegion'] = {}

  for (const region of regions) {
    const baseline = region.dietBaseline ?? 0
    const diet = clampDiet(baseline + seededNoise(region.id, 11, 0.1))
    regionDiet[region.id] = diet

    const raw: Record<string, number> = {}
    for (const p of parties) {
      const aff = dietAffinity(p.dietLean ?? 0, diet)
      const geo = (1 - pol) + pol * aff
      raw[p.id] = (national[p.id] ?? 0) * Math.max(0.02, geo)
    }
    byRegion[region.id] = normalize(raw)
  }

  const byDistrict: VoteShares['byDistrict'] = {}
  for (const d of districts) {
    const parentDiet = regionDiet[d.regionId] ?? 0
    const diet = clampDiet(parentDiet + seededNoise(d.id, 29, 0.22))
    const raw: Record<string, number> = {}
    for (const p of parties) {
      const aff = dietAffinity(p.dietLean ?? 0, diet)
      const geo = (1 - pol) + pol * aff
      // Tiny residual so equal affinities don't produce identical district ties
      const jitter = 1 + seededNoise(d.id + p.id, 7, 0.04)
      raw[p.id] = (national[p.id] ?? 0) * Math.max(0.02, geo) * jitter
    }
    byDistrict[d.id] = normalize(raw)
  }

  return { national, byRegion, byDistrict }
}

function hashStr(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

/** D'Hondt seat allocation */
export function dhondt(shares: Record<string, number>, seats: number): Record<string, number> {
  const ids = Object.keys(shares)
  const result: Record<string, number> = Object.fromEntries(ids.map((id) => [id, 0]))
  if (seats <= 0 || ids.length === 0) return result

  for (let s = 0; s < seats; s++) {
    let bestId = ids[0]!
    let best = -1
    for (const id of ids) {
      const quot = (shares[id] ?? 0) / ((result[id] ?? 0) + 1)
      if (quot > best) {
        best = quot
        bestId = id
      }
    }
    result[bestId] = (result[bestId] ?? 0) + 1
  }
  return result
}

export function pluralityWinner(shares: Record<string, number>): string {
  let bestId = ''
  let best = -1
  for (const [id, v] of Object.entries(shares)) {
    if (v > best) {
      best = v
      bestId = id
    }
  }
  return bestId
}

export function buildSeatResults(
  parties: Party[],
  seatMap: Record<string, number>,
  national: Record<string, number>,
  totalSeats: number,
) {
  return parties.map((p) => {
    const seats = seatMap[p.id] ?? 0
    return {
      partyId: p.id,
      seats,
      voteShare: national[p.id] ?? 0,
      seatShare: totalSeats > 0 ? seats / totalSeats : 0,
    }
  })
}

export function regionLeadersFromShares(
  byRegion: Record<string, Record<string, number>>,
): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [rid, shares] of Object.entries(byRegion)) {
    out[rid] = pluralityWinner(shares)
  }
  return out
}

/** County / region “leader” = party that won the most districts there. */
export function regionLeadersFromDistrictWinners(
  winners: { districtId: string; partyId: string }[],
  districts: { id: string; regionId: string }[],
): Record<string, string> {
  const regionByDistrict = Object.fromEntries(districts.map((d) => [d.id, d.regionId]))
  const wins: Record<string, Record<string, number>> = {}
  for (const w of winners) {
    const rid = regionByDistrict[w.districtId]
    if (!rid) continue
    wins[rid] ??= {}
    wins[rid]![w.partyId] = (wins[rid]![w.partyId] ?? 0) + 1
  }
  return regionLeadersFromShares(wins)
}
