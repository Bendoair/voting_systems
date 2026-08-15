import { useCallback, useEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react'
import type { DistrictId, DistrictTally, GerryMap } from './types'
import {
  DISTRICT_COLORS,
  DISTRICT_COUNT,
  OPPONENT_COLOR,
  PLAYER_COLOR,
} from './types'
import { districtCentroid, type Pt } from './polygon'

export type GerryViewMode = 'voters' | 'districts'

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ]
}

function mixRgb(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ]
}

function districtAt(assignment: DistrictId[], map: GerryMap, x: number, y: number): number {
  if (x < 0 || y < 0 || x >= map.width || y >= map.height) return -1
  const i = y * map.width + x
  if (!map.land[i]) return -1
  return assignment[i] ?? 0
}

function edgeKey(x1: number, y1: number, x2: number, y2: number): string {
  if (x1 < x2 || (x1 === x2 && y1 < y2)) return `${x1},${y1},${x2},${y2}`
  return `${x2},${y2},${x1},${y1}`
}

function themeInk(): string {
  if (typeof document === 'undefined') return '#1c1914'
  return getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#1c1914'
}

function themePaper(): string {
  if (typeof document === 'undefined') return '#f3eee4'
  return (
    getComputedStyle(document.documentElement).getPropertyValue('--paper-2').trim() || '#f3eee4'
  )
}

export function GerryBoard({
  map,
  assignment,
  tallies,
  viewMode,
  activeDistrict,
  labelYou,
  labelThem,
  labelTie,
  onStrokeComplete,
}: {
  map: GerryMap
  assignment: DistrictId[]
  tallies: DistrictTally[]
  viewMode: GerryViewMode
  activeDistrict: number
  labelYou: string
  labelThem: string
  labelTie: string
  onStrokeComplete: (points: Pt[]) => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const strokeRef = useRef<Pt[]>([])
  const strokePreview = useRef<Pt[]>([])

  const cellSize = Math.max(8, Math.floor(560 / Math.max(map.width, map.height)))
  const cssW = map.width * cellSize
  const cssH = map.height * cellSize

  const canvasPoint = (e: ReactPointerEvent<HTMLCanvasElement>): Pt | null => {
    const canvas = canvasRef.current
    if (!canvas) return null
    const rect = canvas.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * cssW
    const y = ((e.clientY - rect.top) / rect.height) * cssH
    return { x, y }
  }

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = cssW * dpr
    canvas.height = cssH * dpr
    canvas.style.width = `${cssW}px`
    canvas.style.height = `${cssH}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, cssW, cssH)

    const playerRgb = hexToRgb(PLAYER_COLOR)
    const opponentRgb = hexToRgb(OPPONENT_COLOR)
    const ink = themeInk()
    const paper = themePaper()
    const districtView = viewMode === 'districts'

    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        const i = y * map.width + x
        if (!map.land[i]) continue
        const px = x * cellSize
        const py = y * cellSize
        const base = map.party[i] === 'player' ? playerRgb : opponentRgb
        const d = assignment[i] ?? 0

        if (d >= 1 && d <= DISTRICT_COUNT) {
          const distRgb = hexToRgb(DISTRICT_COLORS[d - 1]!)
          const t = districtView ? 0.82 : 0.12
          const rgb = mixRgb(base, distRgb, t)
          ctx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
        } else {
          ctx.fillStyle = `rgb(${base[0]},${base[1]},${base[2]})`
        }
        ctx.fillRect(px, py, cellSize + 0.5, cellSize + 0.5)
      }
    }

    type Seg = { x1: number; y1: number; x2: number; y2: number; color: string }
    const byColor = new Map<string, Seg[]>()
    const seen = new Set<string>()

    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        const i = y * map.width + x
        if (!map.land[i]) continue
        const d = assignment[i] ?? 0
        if (d < 1 || d > DISTRICT_COUNT) continue

        const neighbors: [number, number, number, number, number, number][] = [
          [0, -1, x, y, x + 1, y],
          [0, 1, x, y + 1, x + 1, y + 1],
          [-1, 0, x, y, x, y + 1],
          [1, 0, x + 1, y, x + 1, y + 1],
        ]

        for (const [nx, ny, c1x, c1y, c2x, c2y] of neighbors) {
          const nd = districtAt(assignment, map, x + nx, y + ny)
          if (nd === d) continue
          if (nd >= 1 && nd <= DISTRICT_COUNT && nd < d) continue

          const key = edgeKey(c1x, c1y, c2x, c2y)
          if (seen.has(key)) continue
          seen.add(key)

          const color =
            nd >= 1 && nd <= DISTRICT_COUNT ? ink : DISTRICT_COLORS[d - 1]!
          const list = byColor.get(color) ?? []
          list.push({
            x1: c1x * cellSize,
            y1: c1y * cellSize,
            x2: c2x * cellSize,
            y2: c2y * cellSize,
            color,
          })
          byColor.set(color, list)
        }
      }
    }

    ctx.lineWidth = Math.max(districtView ? 2.5 : 3, cellSize * (districtView ? 0.2 : 0.28))
    ctx.lineCap = 'square'
    ctx.lineJoin = 'miter'
    for (const [color, list] of byColor) {
      ctx.strokeStyle = color
      ctx.beginPath()
      for (const s of list) {
        ctx.moveTo(s.x1, s.y1)
        ctx.lineTo(s.x2, s.y2)
      }
      ctx.stroke()
    }

    // Centroid labels
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    for (let d = 1; d <= DISTRICT_COUNT; d++) {
      const tally = tallies[d - 1]
      if (!tally || tally.total === 0) continue
      const c = districtCentroid(map.width, map.height, map.land, assignment, d)
      if (!c) continue
      const cx = c.x * cellSize
      const cy = c.y * cellSize
      const winnerLabel =
        tally.winner === 'player'
          ? labelYou
          : tally.winner === 'opponent'
            ? labelThem
            : tally.winner === 'tie'
              ? labelTie
              : ''
      const bg =
        tally.winner === 'player'
          ? PLAYER_COLOR
          : tally.winner === 'opponent'
            ? OPPONENT_COLOR
            : ink

      const line1 = `#${d}`
      const line2 = `${winnerLabel} ${tally.player}–${tally.opponent}`
      const padX = 6
      ctx.font = `bold ${Math.max(10, cellSize * 0.7)}px sans-serif`
      const w1 = ctx.measureText(line1).width
      ctx.font = `${Math.max(9, cellSize * 0.55)}px sans-serif`
      const w2 = ctx.measureText(line2).width
      const boxW = Math.max(w1, w2) + padX * 2
      const boxH = districtView ? 28 : 24

      ctx.fillStyle = paper
      ctx.globalAlpha = districtView ? 0.94 : 0.88
      ctx.fillRect(cx - boxW / 2, cy - boxH / 2, boxW, boxH)
      ctx.globalAlpha = 1
      ctx.strokeStyle = bg
      ctx.lineWidth = 2
      ctx.strokeRect(cx - boxW / 2, cy - boxH / 2, boxW, boxH)

      ctx.fillStyle = ink
      ctx.font = `bold ${Math.max(10, cellSize * 0.7)}px sans-serif`
      ctx.fillText(line1, cx, cy - (districtView ? 6 : 5))
      ctx.fillStyle = bg
      ctx.font = `bold ${Math.max(9, cellSize * 0.55)}px sans-serif`
      ctx.fillText(line2, cx, cy + (districtView ? 7 : 6))
    }

    // Live stroke preview
    const preview = strokePreview.current
    if (preview.length >= 2) {
      ctx.strokeStyle = DISTRICT_COLORS[activeDistrict - 1] ?? ink
      ctx.lineWidth = 2.5
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.setLineDash([6, 4])
      ctx.beginPath()
      ctx.moveTo(preview[0]!.x, preview[0]!.y)
      for (let i = 1; i < preview.length; i++) {
        ctx.lineTo(preview[i]!.x, preview[i]!.y)
      }
      ctx.stroke()
      ctx.setLineDash([])
      // closing hint
      ctx.globalAlpha = 0.45
      ctx.beginPath()
      ctx.moveTo(preview[preview.length - 1]!.x, preview[preview.length - 1]!.y)
      ctx.lineTo(preview[0]!.x, preview[0]!.y)
      ctx.stroke()
      ctx.globalAlpha = 1
    }
  }, [
    map,
    assignment,
    tallies,
    viewMode,
    activeDistrict,
    labelYou,
    labelThem,
    labelTie,
    cellSize,
    cssW,
    cssH,
  ])

  useEffect(() => {
    draw()
  }, [draw])

  function endStroke() {
    if (!drawing.current) return
    drawing.current = false
    const pts = strokeRef.current
    strokeRef.current = []
    strokePreview.current = []
    draw()
    if (pts.length >= 3) onStrokeComplete(pts)
  }

  return (
    <canvas
      ref={canvasRef}
      className="gerry-canvas"
      width={cssW}
      height={cssH}
      aria-label="Gerrymander map"
      onPointerDown={(e) => {
        const p = canvasPoint(e)
        if (!p) return
        drawing.current = true
        strokeRef.current = [p]
        strokePreview.current = [p]
        e.currentTarget.setPointerCapture(e.pointerId)
        draw()
      }}
      onPointerMove={(e) => {
        if (!drawing.current) return
        const p = canvasPoint(e)
        if (!p) return
        const last = strokeRef.current[strokeRef.current.length - 1]
        if (last && Math.hypot(p.x - last.x, p.y - last.y) < 3) return
        strokeRef.current.push(p)
        strokePreview.current = strokeRef.current.slice()
        draw()
      }}
      onPointerUp={endStroke}
      onPointerCancel={endStroke}
    />
  )
}
