import { DIET_STEPS } from '../data/diet'
import { normalizeVotePercents } from '../data/defaultParties'
import type { Party } from '../engines'
import { PARTY_POOL } from './syspick/types'

/** Player share ~ N(25, 10); ~95% of mass lands in 5–45 */
const PLAYER_POP_MEAN = 25
const PLAYER_POP_STD = 10
const PLAYER_POP_MIN = 5
const PLAYER_POP_MAX = 48

const MIN_PARTIES = 3
const MAX_PARTIES = 5

/** Mulberry32 — deterministic enough for replayable deals from a seed */
export function mulberry32(seed: number): () => number {
  let t = seed >>> 0
  return () => {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

/** Standard normal via Box–Muller */
export function randomNormal(rng: () => number): number {
  const u1 = Math.max(1e-12, rng())
  const u2 = rng()
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
}

export function samplePlayerPopularity(rng: () => number): number {
  for (let i = 0; i < 12; i++) {
    const v = Math.round(PLAYER_POP_MEAN + PLAYER_POP_STD * randomNormal(rng))
    if (v >= PLAYER_POP_MIN && v <= PLAYER_POP_MAX) return v
  }
  return Math.max(
    PLAYER_POP_MIN,
    Math.min(PLAYER_POP_MAX, Math.round(PLAYER_POP_MEAN + PLAYER_POP_STD * randomNormal(rng))),
  )
}

export function pickN<T>(rng: () => number, items: T[], n: number): T[] {
  const pool = items.slice()
  const out: T[] = []
  while (out.length < n && pool.length > 0) {
    const i = Math.floor(rng() * pool.length)
    out.push(pool.splice(i, 1)[0]!)
  }
  return out
}

/** Split `total` into `count` positive integer shares (unequal-ish). */
export function splitRemainder(rng: () => number, total: number, count: number): number[] {
  if (count <= 0) return []
  if (count === 1) return [total]
  const minEach = 1
  let left = Math.max(total, count * minEach)
  const weights = Array.from({ length: count }, () => {
    const u = rng()
    return u * u * (0.35 + rng() * 2) + 0.05
  })
  const wSum = weights.reduce((a, b) => a + b, 0)
  const raw = weights.map((w) => (w / wSum) * left)
  const floored = raw.map((v) => Math.max(minEach, Math.floor(v)))
  let remaining = left - floored.reduce((a, b) => a + b, 0)
  const order = raw
    .map((v, i) => ({ i, frac: v - Math.floor(v) }))
    .sort((a, b) => b.frac - a.frac)
  let k = 0
  while (remaining > 0) {
    floored[order[k % order.length]!.i]! += 1
    remaining -= 1
    k += 1
  }
  while (remaining < 0) {
    let big = 0
    for (let i = 1; i < count; i++) {
      if (floored[i]! > floored[big]!) big = i
    }
    if (floored[big]! <= minEach) break
    floored[big]! -= 1
    remaining += 1
  }
  return floored
}

function randomDietLean(rng: () => number): number {
  return DIET_STEPS[Math.floor(rng() * DIET_STEPS.length)]!
}

function partyFromTemplate(
  tpl: (typeof PARTY_POOL)[number],
  popularity: number,
  dietLean: number,
  locale: 'hu' | 'en',
): Party {
  return {
    id: tpl.id,
    color: tpl.color,
    fruit: tpl.fruit,
    popularity,
    dietLean,
    name: locale === 'en' ? tpl.nameEn : tpl.nameHu,
  }
}

/**
 * Multi-party deal: player popularity ~ truncated N(25, 10);
 * remaining vote share split across 2–4 rivals.
 */
export function buildMultiPartyDeal(
  rng: () => number,
  locale: 'hu' | 'en',
  minParties = MIN_PARTIES,
  maxParties = MAX_PARTIES,
): { parties: Party[]; playerPartyId: string } {
  const n = minParties + Math.floor(rng() * (maxParties - minParties + 1))
  const templates = pickN(rng, PARTY_POOL, n)
  const playerSlot = Math.floor(rng() * n)
  const playerPop = samplePlayerPopularity(rng)
  const otherPops = splitRemainder(rng, 100 - playerPop, n - 1)
  let oi = 0
  const pops = templates.map((_, i) => (i === playerSlot ? playerPop : otherPops[oi++]!))
  const parties = normalizeVotePercents(
    templates.map((tpl, i) => partyFromTemplate(tpl, pops[i]!, randomDietLean(rng), locale)),
  )
  return { parties, playerPartyId: parties[playerSlot]!.id }
}
