import {
  DISTRICT_COUNT,
  SIZE_TOLERANCE,
  type DistrictId,
  type DistrictTally,
  type GerryMap,
  type ScoreResult,
} from './types'

export function targetDistrictSize(map: GerryMap, districts = DISTRICT_COUNT): number {
  return Math.floor(map.landCount / districts)
}

export function scoreMap(
  map: GerryMap,
  assignment: DistrictId[],
  districts = DISTRICT_COUNT,
): ScoreResult {
  const target = targetDistrictSize(map, districts)
  const minSize = Math.floor(target * (1 - SIZE_TOLERANCE))
  const maxSize = Math.ceil(target * (1 + SIZE_TOLERANCE))
  const seatsNeeded = Math.floor(districts / 2) + 1

  const tallies: DistrictTally[] = Array.from({ length: districts }, (_, i) => ({
    id: i + 1,
    total: 0,
    player: 0,
    opponent: 0,
    winner: 'empty' as const,
    sizeOk: false,
  }))

  let unfilled = 0
  for (let i = 0; i < map.land.length; i++) {
    if (!map.land[i]) continue
    const d = assignment[i] ?? 0
    if (d < 1 || d > districts) {
      unfilled++
      continue
    }
    const t = tallies[d - 1]!
    t.total++
    if (map.party[i] === 'player') t.player++
    else t.opponent++
  }

  let playerSeats = 0
  let sizesOk = true
  for (const t of tallies) {
    if (t.total === 0) {
      t.winner = 'empty'
      t.sizeOk = false
      sizesOk = false
    } else {
      t.sizeOk = t.total >= minSize && t.total <= maxSize
      if (!t.sizeOk) sizesOk = false
      if (t.player > t.opponent) {
        t.winner = 'player'
        playerSeats++
      } else if (t.opponent > t.player) {
        t.winner = 'opponent'
      } else {
        t.winner = 'tie'
      }
    }
  }

  const allFilled = unfilled === 0
  // Size balance is soft guidance only — win = map filled + majority of districts
  const won = allFilled && playerSeats >= seatsNeeded

  return {
    tallies,
    playerSeats,
    seatsNeeded,
    unfilled,
    allFilled,
    sizesOk,
    won,
  }
}

export function emptyAssignment(map: GerryMap): DistrictId[] {
  return new Array(map.width * map.height).fill(0)
}

/**
 * Assign every unfilled land cell to the nearest already-assigned district
 * (fills gaps left by imperfect lasso borders).
 */
export function fixBorderGaps(
  map: GerryMap,
  assignment: DistrictId[],
  districts = DISTRICT_COUNT,
): DistrictId[] {
  const next = assignment.slice()
  const assigned: { x: number; y: number; d: number }[] = []
  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      const i = y * map.width + x
      if (!map.land[i]) continue
      const d = next[i] ?? 0
      if (d >= 1 && d <= districts) assigned.push({ x, y, d })
    }
  }
  if (assigned.length === 0) return next

  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      const i = y * map.width + x
      if (!map.land[i]) continue
      const cur = next[i] ?? 0
      if (cur >= 1 && cur <= districts) continue

      let bestD = assigned[0]!.d
      let bestDist = Infinity
      for (const a of assigned) {
        const dist = (a.x - x) ** 2 + (a.y - y) ** 2
        if (dist < bestDist) {
          bestDist = dist
          bestD = a.d
        }
      }
      next[i] = bestD
    }
  }
  return next
}
