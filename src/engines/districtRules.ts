import type { Party } from './types'
import { dietAffinity, pluralityWinner } from './shared'

function leanOf(parties: Party[], id: string): number {
  return parties.find((p) => p.id === id)?.dietLean ?? 0
}

/** Parties in the race that have a share entry */
function raceIds(shares: Record<string, number>, parties: Party[]): string[] {
  const fromParties = parties.map((p) => p.id).filter((id) => id in shares)
  if (fromParties.length > 0) return fromParties
  return Object.keys(shares)
}

/**
 * Rank all candidates from a first-preference bloc: favorite first,
 * then remaining by meat↔plant closeness to that favorite.
 */
function rankFromFavorite(
  favoriteId: string,
  ids: string[],
  parties: Party[],
): string[] {
  const favLean = leanOf(parties, favoriteId)
  const others = ids.filter((id) => id !== favoriteId)
  others.sort((a, b) => {
    const da = dietAffinity(favLean, leanOf(parties, a))
    const db = dietAffinity(favLean, leanOf(parties, b))
    if (db !== da) return db - da
    return a.localeCompare(b)
  })
  return favoriteId && ids.includes(favoriteId)
    ? [favoriteId, ...others]
    : others
}

/** How strongly eliminated ballots prefer ideologically closer remaining parties */
const TRANSFER_SHARPNESS = 2.4

/**
 * Weight for transferring ballots from `fromLean` to a remaining party.
 * Closer on meat↔plant gets far more of the transfer than proportional-to-share.
 */
function transferWeight(fromLean: number, toLean: number): number {
  const aff = dietAffinity(fromLean, toLean) // 1 = identical, 0 = opposite
  return Math.pow(Math.max(0.02, aff), TRANSFER_SHARPNESS)
}

/**
 * Instant-runoff: eliminate lowest, transfer ballots to remaining parties by
 * diet closeness (not proportional to current totals — that ≈ FPTP).
 */
export function irvWinner(
  sharesIn: Record<string, number>,
  parties: Party[],
): string {
  const shares: Record<string, number> = { ...sharesIn }
  const remaining = new Set(
    Object.keys(shares).filter((id) => (shares[id] ?? 0) > 0 || parties.some((p) => p.id === id)),
  )
  // Keep only parties present in this race
  for (const id of [...remaining]) {
    if (!(id in sharesIn) && !parties.some((p) => p.id === id)) remaining.delete(id)
  }
  if (remaining.size === 0) {
    const ids = Object.keys(sharesIn)
    if (ids.length === 0) return ''
    remaining.clear()
    for (const id of ids) remaining.add(id)
  }

  while (remaining.size > 1) {
    let total = 0
    for (const id of remaining) total += shares[id] ?? 0
    for (const id of remaining) {
      if ((shares[id] ?? 0) / (total || 1) > 0.5) return id
    }

    let worst = ''
    let worstV = Infinity
    for (const id of remaining) {
      const v = shares[id] ?? 0
      if (v < worstV) {
        worstV = v
        worst = id
      }
    }
    if (!worst) break
    remaining.delete(worst)

    const fromLean = leanOf(parties, worst)
    const weights: Record<string, number> = {}
    let wSum = 0
    for (const id of remaining) {
      const w = transferWeight(fromLean, leanOf(parties, id))
      weights[id] = w
      wSum += w
    }
    for (const id of remaining) {
      const share = wSum > 0 ? (weights[id] ?? 0) / wSum : 1 / remaining.size
      shares[id] = (shares[id] ?? 0) + worstV * share
    }
    shares[worst] = 0
  }
  return [...remaining][0] ?? ''
}

/**
 * Two-round: if no majority, top two advance; other ballots transfer by
 * diet closeness to the finalists (not a fixed 55/45 to the plurality leader).
 */
export function twoRoundWinner(
  shares: Record<string, number>,
  parties: Party[],
): string {
  const partyIds = parties.map((p) => p.id).filter((id) => id in shares)
  const sorted = [...partyIds].sort((a, b) => (shares[b] ?? 0) - (shares[a] ?? 0))
  const first = sorted[0]
  if (!first) return pluralityWinner(shares)
  if ((shares[first] ?? 0) > 0.5) return first

  const second = sorted[1]
  if (!second) return first

  let a = shares[first] ?? 0
  let b = shares[second] ?? 0
  const leanA = leanOf(parties, first)
  const leanB = leanOf(parties, second)

  for (const id of partyIds) {
    if (id === first || id === second) continue
    const v = shares[id] ?? 0
    if (v <= 0) continue
    const fromLean = leanOf(parties, id)
    const wA = transferWeight(fromLean, leanA)
    const wB = transferWeight(fromLean, leanB)
    const sum = wA + wB
    if (sum <= 0) {
      a += v * 0.5
      b += v * 0.5
    } else {
      a += v * (wA / sum)
      b += v * (wB / sum)
    }
  }
  return a >= b ? first : second
}

/**
 * Classic Borda: n−1 points for 1st, n−2 for 2nd, … 0 for last.
 * Each first-preference bloc ranks itself first, then nearby tastes.
 */
export function bordaWinner(
  shares: Record<string, number>,
  parties: Party[],
): string {
  const ids = raceIds(shares, parties)
  if (ids.length === 0) return pluralityWinner(shares)
  const n = ids.length
  const scores: Record<string, number> = Object.fromEntries(ids.map((id) => [id, 0]))
  for (const fav of ids) {
    const bloc = shares[fav] ?? 0
    if (bloc <= 0) continue
    const ranking = rankFromFavorite(fav, ids, parties)
    ranking.forEach((id, rank) => {
      scores[id] = (scores[id] ?? 0) + bloc * (n - 1 - rank)
    })
  }
  return pluralityWinner(scores)
}

/**
 * Approve own first choice plus parties close on the diet axis.
 * Affinity 0.7 ≈ gap of 0.6 on meat↔plant (−1…+1).
 */
export const APPROVAL_AFFINITY = 0.7

export function approvalWinner(
  shares: Record<string, number>,
  parties: Party[],
): string {
  const ids = raceIds(shares, parties)
  if (ids.length === 0) return pluralityWinner(shares)
  const approvals: Record<string, number> = Object.fromEntries(ids.map((id) => [id, 0]))
  for (const fav of ids) {
    const bloc = shares[fav] ?? 0
    if (bloc <= 0) continue
    const favLean = leanOf(parties, fav)
    for (const id of ids) {
      const close =
        id === fav || dietAffinity(favLean, leanOf(parties, id)) >= APPROVAL_AFFINITY
      if (close) approvals[id] = (approvals[id] ?? 0) + bloc
    }
  }
  return pluralityWinner(approvals)
}
