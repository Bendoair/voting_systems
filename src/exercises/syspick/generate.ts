import { REGIONS } from '../../data/counties'
import { OEVK_DISTRICTS } from '../../data/oevkDistricts'
import { DIET_STEPS } from '../../data/diet'
import { normalizeVotePercents } from '../../data/defaultParties'
import { isLocalDistrictSystem } from '../../data/systems'
import { runElection, type Party, type Region, type SystemId } from '../../engines'
import {
  PARTY_POOL,
  SYSPICK_DISTRICT_SEATS,
  SYSPICK_MAX_PARTIES,
  SYSPICK_MIN_PARTIES,
  SYSPICK_SYSTEMS,
  SYSPICK_TOTAL_SEATS,
  type SysPickScenario,
} from './types'

/** ~10% of deals are a two-party large matchup */
const TWO_PARTY_CHANCE = 0.1
/** Player share ~ N(25, 10); ~95% of mass lands in 5–45 (±20 around the median) */
const PLAYER_POP_MEAN = 25
const PLAYER_POP_STD = 10
const PLAYER_POP_MIN = 5
const PLAYER_POP_MAX = 48

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
function randomNormal(rng: () => number): number {
  const u1 = Math.max(1e-12, rng())
  const u2 = rng()
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
}

function samplePlayerPopularity(rng: () => number): number {
  for (let i = 0; i < 12; i++) {
    const v = Math.round(PLAYER_POP_MEAN + PLAYER_POP_STD * randomNormal(rng))
    if (v >= PLAYER_POP_MIN && v <= PLAYER_POP_MAX) return v
  }
  return Math.max(
    PLAYER_POP_MIN,
    Math.min(PLAYER_POP_MAX, Math.round(PLAYER_POP_MEAN + PLAYER_POP_STD * randomNormal(rng))),
  )
}

function pickN<T>(rng: () => number, items: T[], n: number): T[] {
  const pool = items.slice()
  const out: T[] = []
  while (out.length < n && pool.length > 0) {
    const i = Math.floor(rng() * pool.length)
    out.push(pool.splice(i, 1)[0]!)
  }
  return out
}

/** Split `total` into `count` positive integer shares (unequal-ish). */
function splitRemainder(rng: () => number, total: number, count: number): number[] {
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
  let rem = left - floored.reduce((a, b) => a + b, 0)
  const order = raw
    .map((v, i) => ({ i, frac: v - Math.floor(v) }))
    .sort((a, b) => b.frac - a.frac)
  let k = 0
  while (rem > 0) {
    floored[order[k % order.length]!.i]! += 1
    rem -= 1
    k += 1
  }
  while (rem < 0) {
    // Steal from the current largest above min
    let big = 0
    for (let i = 1; i < count; i++) {
      if (floored[i]! > floored[big]!) big = i
    }
    if (floored[big]! <= minEach) break
    floored[big]! -= 1
    rem += 1
  }
  return floored
}

function randomDietLean(rng: () => number): number {
  return DIET_STEPS[Math.floor(rng() * DIET_STEPS.length)]!
}

function perturbBaselines(rng: () => number): Region[] {
  return REGIONS.map((r) => {
    const jitter = (rng() - 0.5) * 0.7
    const dietBaseline = Math.max(-1, Math.min(1, r.dietBaseline + jitter))
    const snapped = DIET_STEPS.reduce((best, s) =>
      Math.abs(s - dietBaseline) < Math.abs(best - dietBaseline) ? s : best,
    )
    return { ...r, dietBaseline: snapped }
  })
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

/** Two large parties (~40–60 split); diets independent; player is one of them. */
function buildTwoPartyDeal(
  rng: () => number,
  locale: 'hu' | 'en',
): { parties: Party[]; playerPartyId: string } {
  const templates = pickN(rng, PARTY_POOL, 2)
  // Player share in a large-party duel: typically 42–58
  const playerPop = 42 + Math.floor(rng() * 17)
  const otherPop = 100 - playerPop
  const playerIdx = rng() < 0.5 ? 0 : 1
  const pops = playerIdx === 0 ? [playerPop, otherPop] : [otherPop, playerPop]
  const parties = normalizeVotePercents(
    templates.map((tpl, i) =>
      partyFromTemplate(tpl, pops[i]!, randomDietLean(rng), locale),
    ),
  )
  return { parties, playerPartyId: parties[playerIdx]!.id }
}

/**
 * Multi-party deal: player popularity ~ truncated N(25, 10);
 * remaining vote share split across 2–4 rivals.
 */
function buildMultiPartyDeal(
  rng: () => number,
  locale: 'hu' | 'en',
): { parties: Party[]; playerPartyId: string } {
  const n =
    SYSPICK_MIN_PARTIES +
    Math.floor(rng() * (SYSPICK_MAX_PARTIES - SYSPICK_MIN_PARTIES + 1))
  const templates = pickN(rng, PARTY_POOL, n)
  const playerSlot = Math.floor(rng() * n)
  const playerPop = samplePlayerPopularity(rng)
  const otherPops = splitRemainder(rng, 100 - playerPop, n - 1)
  let oi = 0
  const pops = templates.map((_, i) =>
    i === playerSlot ? playerPop : otherPops[oi++]!,
  )
  const parties = normalizeVotePercents(
    templates.map((tpl, i) =>
      partyFromTemplate(tpl, pops[i]!, randomDietLean(rng), locale),
    ),
  )
  return { parties, playerPartyId: parties[playerSlot]!.id }
}


function dealLineup(
  rng: () => number,
  locale: 'hu' | 'en',
): { parties: Party[]; playerPartyId: string } {
  if (rng() < TWO_PARTY_CHANCE) return buildTwoPartyDeal(rng, locale)
  return buildMultiPartyDeal(rng, locale)
}

function electionInput(
  parties: Party[],
  regions: Region[],
  polarization: number,
  system: SystemId,
) {
  const districted = isLocalDistrictSystem(system)
  return {
    parties,
    regions,
    districts: OEVK_DISTRICTS,
    totalSeats: districted ? SYSPICK_DISTRICT_SEATS : SYSPICK_TOTAL_SEATS,
    districtSeats: system === 'mixed' ? SYSPICK_DISTRICT_SEATS : undefined,
    districtMethod: system === 'mixed' ? ('plurality' as const) : undefined,
    polarization,
  }
}

function scoreScenario(
  seed: number,
  parties: Party[],
  playerPartyId: string,
  regions: Region[],
  polarization: number,
): SysPickScenario {
  const bySystem = {} as SysPickScenario['bySystem']
  const playerSeats = {} as SysPickScenario['playerSeats']

  for (const system of SYSPICK_SYSTEMS) {
    const result = runElection(system, electionInput(parties, regions, polarization, system))
    bySystem[system] = result
    playerSeats[system] =
      result.seats.find((s) => s.partyId === playerPartyId)?.seats ?? 0
  }

  let bestSeats = -1
  for (const system of SYSPICK_SYSTEMS) {
    bestSeats = Math.max(bestSeats, playerSeats[system]!)
  }
  const bestSystems = SYSPICK_SYSTEMS.filter((s) => playerSeats[s] === bestSeats)
  const worstSeats = Math.min(...SYSPICK_SYSTEMS.map((s) => playerSeats[s]!))

  return {
    seed,
    parties,
    playerPartyId,
    regions,
    polarization,
    bySystem,
    playerSeats,
    bestSystems,
    bestSeats,
    seatSpread: bestSeats - worstSeats,
  }
}

/**
 * Deal a fresh round. Retries until systems meaningfully diverge for the
 * player (or attempts are exhausted).
 */
export function generateSysPickScenario(
  locale: 'hu' | 'en',
  seed = (Math.random() * 0xffffffff) >>> 0,
): SysPickScenario {
  const MAX_ATTEMPTS = 24
  let best: SysPickScenario | null = null

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const attemptSeed = (seed + attempt * 9973) >>> 0
    const rng = mulberry32(attemptSeed)
    const { parties, playerPartyId } = dealLineup(rng, locale)
    const regions = perturbBaselines(rng)
    const polarization = 0.45 + rng() * 0.5
    const scenario = scoreScenario(
      attemptSeed,
      parties,
      playerPartyId,
      regions,
      polarization,
    )
    if (!best || scenario.seatSpread > best.seatSpread) best = scenario
    if (scenario.seatSpread >= 2 && scenario.bestSystems.length < SYSPICK_SYSTEMS.length) {
      return scenario
    }
  }

  return best!
}

export function relabelParties(
  scenario: SysPickScenario,
  locale: 'hu' | 'en',
): SysPickScenario {
  const parties = scenario.parties.map((p) => {
    const tpl = PARTY_POOL.find((t) => t.id === p.id)
    if (!tpl) return p
    return { ...p, name: locale === 'en' ? tpl.nameEn : tpl.nameHu }
  })
  return { ...scenario, parties }
}
