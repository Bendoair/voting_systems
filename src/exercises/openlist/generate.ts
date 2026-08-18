import { PARTY_POOL } from '../syspick/types'
import { buildMultiPartyDeal, mulberry32, randomNormal } from '../dealParties'
import type {
  CampaignAction,
  FieldSwing,
  ListCandidate,
  OpenListDeal,
  OpenListParty,
  OutcomeQuality,
  PortraitLook,
  WeekEvent,
} from './types'
import { OPENLIST_LIST_SIZE, OPENLIST_MIN_WEEKS } from './types'
import { playerRank, seatAlloc, snapshot } from './score'

const GIVEN_SHORT = [
  'Bence',
  'Gábor',
  'Péter',
  'László',
  'Tamás',
  'András',
  'Márton',
  'Zoltán',
  'István',
  'Attila',
  'Dániel',
  'Balázs',
]

const GIVEN_LONG = [
  'Anna',
  'Eszter',
  'Katalin',
  'Zsófia',
  'Réka',
  'Nóra',
  'Judit',
  'Mária',
  'Éva',
  'Orsolya',
  'Lili',
  'Viktória',
]

const FAMILY = [
  'Nagy',
  'Kovács',
  'Tóth',
  'Szabó',
  'Horváth',
  'Varga',
  'Kiss',
  'Molnár',
  'Németh',
  'Farkas',
  'Balogh',
  'Papp',
  'Takács',
  'Juhász',
  'Lakatos',
  'Mészáros',
  'Oláh',
  'Simon',
  'Rácz',
  'Fekete',
  'Szűcs',
  'Kocsis',
  'Borbély',
  'Gulyás',
  'Bíró',
  'Vincze',
  'Lengyel',
  'Török',
  'Orosz',
  'Sárközi',
  'Csató',
  'Hajdú',
  'Székely',
  'Hargitai',
  'Csíki',
  'Udvarhelyi',
  'Kőszegi',
  'Zsámboki',
  'Palotás',
  'Gönczi',
  'Bodor',
  'Herczeg',
  'Kende',
  'Csányi',
  'Hunyadi',
  'Báthori',
  'Zrínyi',
  'Eötvös',
  'Bethlen',
  'Károlyi',
  'Pálffy',
  'Zichy',
  'Bánffy',
  'Teleki',
  'Apafi',
  'Kinizsi',
  'Kovács-Nagy',
  'Szabó-Kiss',
  'Németh-Farkas',
  'Tóth-Székely',
]

const HAIR = ['#1c1914', '#3d2914', '#6b4423', '#4a3728', '#2c1810', '#5c4033', '#1a1a1a']
const SUITS = ['#1f3a5f', '#3d2914', '#2d4a3e', '#4a1f2d', '#2a2a32', '#3a4550', '#5c3d1e']

function pickName(
  rng: () => number,
  look: PortraitLook,
  used: Set<string>,
): { givenName: string; familyName: string; name: string } {
  const givenPool = look === 'short' ? GIVEN_SHORT : GIVEN_LONG
  for (let i = 0; i < 40; i++) {
    const givenName = givenPool[Math.floor(rng() * givenPool.length)]!
    const familyName = FAMILY[Math.floor(rng() * FAMILY.length)]!
    const name = `${familyName} ${givenName}`
    if (!used.has(name)) {
      used.add(name)
      return { givenName, familyName, name }
    }
  }
  const givenName = givenPool[Math.floor(rng() * givenPool.length)]!
  const familyName = FAMILY[Math.floor(rng() * FAMILY.length)]!
  const name = `${familyName} ${givenName} ${used.size}`
  used.add(name)
  return { givenName, familyName, name }
}

/** Peak around 4 weeks in 3–6. */
export function sampleWeeks(rng: () => number): number {
  const weights = [2, 6, 3, 1]
  const total = weights.reduce((a, b) => a + b, 0)
  let roll = rng() * total
  for (let i = 0; i < weights.length; i++) {
    roll -= weights[i]!
    if (roll <= 0) return OPENLIST_MIN_WEEKS + i
  }
  return 4
}

/** Weighted pick: 1-based index. */
function pickWeighted(rng: () => number, weights: number[]): number {
  const total = weights.reduce((a, b) => a + b, 0)
  if (total <= 0) return weights.length
  let roll = rng() * total
  for (let i = 0; i < weights.length; i++) {
    roll -= weights[i]!
    if (roll <= 0) return i + 1
  }
  return weights.length
}

/**
 * Rank on an `n`-person list. Most deals sit on the cutoff
 * (last projected seat, or first seat out), with a slight lean to just out.
 * Other ranks stay common, but never start in with 3+ list-mates still in below you.
 */
export function samplePlayerRank(rng: () => number, seats: number, n: number): number {
  const barelyIn = seats >= 1 && seats <= n ? seats : 0
  const barelyOut = seats >= 0 && seats < n ? seats + 1 : 0
  const weights = Array.from({ length: n }, (_, i) => {
    const rank = i + 1
    if (rank <= seats && seats - rank >= 3) return 0
    if (rank === barelyOut) return barelyIn > 0 ? 5 : 7
    if (rank === barelyIn) return 3
    return 1
  })
  return pickWeighted(rng, weights)
}

function personalLadder(rng: () => number, n: number): number[] {
  const scores = Array.from({ length: n }, (_, i) => 100 - i * (8 + rng() * 4) + (rng() - 0.5) * 6)
  for (let i = scores.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    const tmp = scores[i]!
    scores[i] = scores[j]!
    scores[j] = tmp
  }
  return scores
}

export function generateOpenListDeal(
  locale: 'hu' | 'en',
  seed = (Math.random() * 0xffffffff) >>> 0,
): OpenListDeal {
  const rng = mulberry32(seed)
  const { parties: raw, playerPartyId } = buildMultiPartyDeal(rng, locale)
  const parties: OpenListParty[] = raw.map((p) => ({
    id: p.id,
    name: p.name,
    fruit: p.fruit,
    color: p.color,
    share: p.popularity,
  }))
  const tpl = PARTY_POOL.find((t) => t.id === playerPartyId)
  const suitColor = tpl?.color ?? SUITS[0]!
  const used = new Set<string>()
  const scores = personalLadder(rng, OPENLIST_LIST_SIZE)
  const looks: PortraitLook[] = scores.map(() => {
    if (rng() < 0.5) return 'short'
    return rng() < 0.5 ? 'ponytail' : 'bun'
  })
  const list: ListCandidate[] = scores.map((personal, i) => {
    const look = looks[i]!
    const nm = pickName(rng, look, used)
    return {
      id: `c${i}`,
      ...nm,
      look,
      hairColor: HAIR[Math.floor(rng() * HAIR.length)]!,
      suitColor: SUITS[Math.floor(rng() * SUITS.length)]!,
      personal,
    }
  })
  const ordered = [...list].sort((a, b) => b.personal - a.personal || a.id.localeCompare(b.id))
  const seats = seatAlloc(parties)[playerPartyId] ?? 0
  const rank = samplePlayerRank(rng, seats, OPENLIST_LIST_SIZE)
  const you = ordered[rank - 1]!
  you.id = 'you'
  you.suitColor = suitColor

  return {
    seed,
    weeksTotal: sampleWeeks(rng),
    parties,
    playerPartyId,
    playerId: 'you',
    originalOrder: ordered.map((c) => c.id),
    list,
  }
}

export function relabelParties(parties: OpenListParty[], locale: 'hu' | 'en'): OpenListParty[] {
  return parties.map((p) => {
    const tpl = PARTY_POOL.find((t) => t.id === p.id)
    if (!tpl) return p
    return { ...p, name: locale === 'en' ? tpl.nameEn : tpl.nameHu }
  })
}

export function relabelOpenListDeal(deal: OpenListDeal, locale: 'hu' | 'en'): OpenListDeal {
  return { ...deal, parties: relabelParties(deal.parties, locale) }
}

function quality(rng: () => number): OutcomeQuality {
  const r = rng()
  if (r < 0.12) return 'fizzle'
  if (r < 0.24) return 'overperform'
  return 'planned'
}

function scaleFor(q: OutcomeQuality, rng: () => number): number {
  if (q === 'fizzle') return -0.35 - rng() * 0.5
  if (q === 'overperform') return 1.55 + rng() * 0.7
  return 0.75 + rng() * 0.5
}

function renormalize(parties: OpenListParty[]): OpenListParty[] {
  const sum = parties.reduce((a, p) => a + Math.max(0.4, p.share), 0)
  return parties.map((p) => ({
    ...p,
    share: Math.round((Math.max(0.4, p.share) / sum) * 1000) / 10,
  }))
}

/** Late-count noise on party shares (percentage points). */
const NIGHT_SHARE_SIGMA = 3
/** Preference noise, smaller than a week's list drift. Adjacent ranks swap only if already close. */
const NIGHT_PERSONAL_SIGMA = 0.55

/** Small election-night jitter so last-week standings are not 1:1 the lock. */
export function jitterElection(
  parties: OpenListParty[],
  list: ListCandidate[],
  rng: () => number,
): { parties: OpenListParty[]; list: ListCandidate[] } {
  const noisy = parties.map((p) => ({
    ...p,
    share: p.share + randomNormal(rng) * NIGHT_SHARE_SIGMA,
  }))
  return {
    parties: renormalize(noisy),
    list: list.map((c) => ({
      ...c,
      personal: c.personal + randomNormal(rng) * NIGHT_PERSONAL_SIGMA,
    })),
  }
}

export function applyWeek(
  deal: OpenListDeal,
  parties: OpenListParty[],
  list: ListCandidate[],
  action: CampaignAction,
  week: number,
  rng: () => number,
): { parties: OpenListParty[]; list: ListCandidate[]; event: WeekEvent } {
  const before = snapshot(deal, parties, list)
  const q = quality(rng)
  const s = scaleFor(q, rng)

  let nextParties = parties.map((p) => ({ ...p }))
  const player = nextParties.find((p) => p.id === deal.playerPartyId)!
  const intendedParty =
    action === 'party' ? 2.4 * s : action === 'balanced' ? 1.1 * s : -0.7 * Math.abs(s) * (s < 0 ? -1 : 1)
  player.share += intendedParty

  const field: { partyId: string; kind: FieldSwing }[] = []
  for (const p of nextParties) {
    if (p.id === deal.playerPartyId) continue
    const roll = rng()
    let kind: FieldSwing = 'quiet'
    let delta = (rng() - 0.5) * 0.6
    if (roll < 0.22) {
      kind = 'campaign'
      delta = 0.8 + rng() * 1.8
    } else if (roll < 0.38) {
      kind = 'infight'
      delta = -(0.8 + rng() * 1.8)
    }
    p.share += delta
    if (kind !== 'quiet') field.push({ partyId: p.id, kind })
  }
  nextParties = renormalize(nextParties)

  const nextList = list.map((c) => ({ ...c }))
  const you = nextList.find((c) => c.id === deal.playerId)!
  const intendedYou =
    action === 'own' ? 9 * s : action === 'balanced' ? 4.5 * s : 0.6 * (s < 0 ? s : 0.4)
  you.personal += intendedYou

  let listMateSelf: WeekEvent['listMateSelf']
  const rankBefore = before.playerRank
  const seatsBefore = before.playerSeats

  for (const c of nextList) {
    if (c.id === deal.playerId) continue
    const drift = (rng() - 0.5) * 2.2
    c.personal += drift
    if (rng() < 0.14) {
      const surge = 6 + rng() * 8
      c.personal += surge
      const afterRank = playerRank(nextList, deal.playerId)
      const afterSeats = seatAlloc(nextParties)[deal.playerPartyId] ?? 0
      const cutoffFlip =
        (rankBefore <= seatsBefore) !== (afterRank <= afterSeats) || afterRank !== rankBefore
      if (cutoffFlip && !listMateSelf) {
        listMateSelf = { id: c.id, name: c.name }
      }
    }
  }

  const after = snapshot(deal, nextParties, nextList)
  return {
    parties: nextParties,
    list: nextList,
    event: {
      week,
      action,
      quality: q,
      field,
      listMateSelf,
      playerRankBefore: before.playerRank,
      playerRankAfter: after.playerRank,
      seatsBefore: before.playerSeats,
      seatsAfter: after.playerSeats,
      playerShareBefore: before.parties.find((p) => p.id === deal.playerPartyId)!.share,
      playerShareAfter: after.parties.find((p) => p.id === deal.playerPartyId)!.share,
    },
  }
}

export function dealRng(seed: number, week: number): () => number {
  return mulberry32((seed ^ (week * 7919) ^ 0x9e3779b9) >>> 0)
}
