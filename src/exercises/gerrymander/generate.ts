import { createNoise2D } from 'simplex-noise'
import {
  DIFFICULTY_BANDS,
  GRID_SIZE,
  type GerryDifficulty,
  type GerryMap,
  type Party,
} from './types'

function mulberry32(seed: number) {
  let t = seed >>> 0
  return () => {
    t = (t + 0x6d2b79f5) >>> 0
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

function fbm2(
  noise: (x: number, y: number) => number,
  x: number,
  y: number,
  octaves = 4,
): number {
  let amp = 1
  let freq = 1
  let sum = 0
  let norm = 0
  for (let i = 0; i < octaves; i++) {
    sum += noise(x * freq, y * freq) * amp
    norm += amp
    amp *= 0.5
    freq *= 2
  }
  return sum / norm
}

function generateOnce(
  seed: number,
  shareMin: number,
  shareMax: number,
): GerryMap | null {
  const rand = mulberry32(seed)
  const shapeNoise = createNoise2D(rand)
  const voterNoise = createNoise2D(rand)

  const width = GRID_SIZE
  const height = GRID_SIZE
  const land: boolean[] = new Array(width * height).fill(false)
  const party: Party[] = new Array(width * height).fill('opponent')

  const cx = (width - 1) / 2
  const cy = (height - 1) / 2
  const rx = width * (0.38 + rand() * 0.06)
  const ry = height * (0.34 + rand() * 0.08)
  const shapeScale = 0.045 + rand() * 0.02
  const shapeThresh = 0.12 + rand() * 0.1

  let landCount = 0
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x
      const dx = (x - cx) / rx
      const dy = (y - cy) / ry
      const radial = 1 - (dx * dx + dy * dy)
      const n = fbm2(shapeNoise, x * shapeScale + 10, y * shapeScale + 3, 4)
      const score = radial * 0.72 + (n + 1) * 0.5 * 0.45
      if (score > 0.55 + shapeThresh * 0.15) {
        land[i] = true
        landCount++
      }
    }
  }

  if (landCount < 280 || landCount > 1400) return null

  const voterScale = 0.028 + rand() * 0.018
  const ox = rand() * 40
  const oy = rand() * 40
  const raw: number[] = new Array(width * height).fill(0)
  const landVals: number[] = []

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x
      if (!land[i]) continue
      const v = fbm2(voterNoise, x * voterScale + ox, y * voterScale + oy, 3)
      raw[i] = v
      landVals.push(v)
    }
  }

  landVals.sort((a, b) => a - b)
  const targetShare = shareMin + rand() * (shareMax - shareMin)
  const idx = Math.floor(landVals.length * targetShare)
  const thresh = landVals[Math.min(idx, landVals.length - 1)] ?? 0

  let playerCount = 0
  for (let i = 0; i < land.length; i++) {
    if (!land[i]) continue
    if (raw[i]! <= thresh) {
      party[i] = 'player'
      playerCount++
    } else {
      party[i] = 'opponent'
    }
  }

  const share = playerCount / landCount
  if (share < shareMin || share > shareMax) return null

  return { width, height, land, party, landCount, playerCount, seed }
}

function forceShare(map: GerryMap, shareMin: number, shareMax: number): GerryMap {
  const target = (shareMin + shareMax) / 2
  const want = Math.max(1, Math.round(map.landCount * target))
  const landIdx: number[] = []
  for (let i = 0; i < map.land.length; i++) {
    if (map.land[i]) landIdx.push(i)
  }
  // Prefer keeping blob structure: sort by current party so we flip boundary-ish randomly
  const rand = mulberry32(map.seed ^ 0x9e3779b9)
  for (let i = landIdx.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[landIdx[i], landIdx[j]] = [landIdx[j]!, landIdx[i]!]
  }
  const party = map.party.slice()
  for (let k = 0; k < landIdx.length; k++) {
    party[landIdx[k]!] = k < want ? 'player' : 'opponent'
  }
  return { ...map, party, playerCount: want }
}

/** Generate a playable county; player share follows difficulty band. */
export function generateGerryMap(
  seed = (Math.random() * 1e9) | 0,
  difficulty: GerryDifficulty = 'medium',
): GerryMap {
  const { min, max } = DIFFICULTY_BANDS[difficulty]
  for (let attempt = 0; attempt < 100; attempt++) {
    const map = generateOnce((seed + attempt * 9973) >>> 0, min, max)
    if (map) return map
  }
  const fallback = generateOnce(seed >>> 0, min, max)
  if (fallback) return forceShare(fallback, min, max)

  const width = GRID_SIZE
  const height = GRID_SIZE
  const land: boolean[] = []
  const party: Party[] = []
  let landCount = 0
  const cx = (width - 1) / 2
  const cy = (height - 1) / 2
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dx = (x - cx) / (width * 0.4)
      const dy = (y - cy) / (height * 0.36)
      const isLand = dx * dx + dy * dy < 1
      land.push(isLand)
      party.push('opponent')
      if (isLand) landCount++
    }
  }
  return forceShare(
    { width, height, land, party, landCount, playerCount: 0, seed },
    min,
    max,
  )
}
