import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'

const COLORS = [
  '#1f6f5b',
  '#c45c26',
  '#3d7ea6',
  '#e9c46a',
  '#8b5a9e',
  '#2a9d8f',
  '#ef6c00',
  '#c62828',
  '#f9a825',
]

export type EffectKind = 'confetti' | 'miss' | 'surge' | 'rain'

type Piece = {
  id: number
  left: number
  delay: number
  duration: number
  color: string
  rot: number
  drift: number
  size: number
  tall: boolean
}

const DURATION: Record<EffectKind, number> = {
  confetti: 6500,
  miss: 4200,
  surge: 1100,
  rain: 2600,
}

type Pt = { x: number; y: number }

type Bolt = {
  d: string
  delay: number
}

function toRibbon(pts: Pt[], w0: number, w1: number): string {
  if (pts.length < 2) return ''
  const left: Pt[] = []
  const right: Pt[] = []
  for (let i = 0; i < pts.length; i++) {
    const t = i / (pts.length - 1)
    const w = Math.max(0.12, w0 + (w1 - w0) * t)
    const prev = pts[Math.max(0, i - 1)]!
    const next = pts[Math.min(pts.length - 1, i + 1)]!
    let dx = next.x - prev.x
    let dy = next.y - prev.y
    const len = Math.hypot(dx, dy) || 1
    const nx = -dy / len
    const ny = dx / len
    const p = pts[i]!
    left.push({ x: p.x + nx * w, y: p.y + ny * w })
    right.push({ x: p.x - nx * w, y: p.y - ny * w })
  }
  const ring = left.concat(right.reverse())
  return `${ring.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')} Z`
}

function jagged(x0: number, y0: number, x1: number, y1: number, steps: number, amp: number, rng: () => number): Pt[] {
  const dx = x1 - x0
  const dy = y1 - y0
  const len = Math.hypot(dx, dy) || 1
  const px = -dy / len
  const py = dx / len
  const pts: Pt[] = [{ x: x0, y: y0 }]
  for (let i = 1; i < steps; i++) {
    const t = i / steps
    const jag = (rng() - 0.5) * 2 * amp * (0.45 + rng() * 0.7)
    pts.push({
      x: x0 + dx * t + px * jag,
      y: y0 + dy * t + py * jag,
    })
  }
  pts.push({ x: x1, y: y1 })
  return pts
}

function growFork(
  x: number,
  y: number,
  ang: number,
  len: number,
  w0: number,
  depth: number,
  out: Bolt[],
  rng: () => number,
) {
  const steps = 3 + Math.floor(rng() * 4)
  const amp = 5 + rng() * 9
  const x1 = x + Math.cos(ang) * len
  const y1 = y + Math.sin(ang) * len
  const pts = jagged(x, y, x1, y1, steps, amp, rng)
  out.push({ d: toRibbon(pts, w0, 0.12), delay: rng() * 0.12 })
  if (depth <= 0 || w0 < 0.7) return
  const tip = pts[pts.length - 1]!
  const n = rng() < 0.55 ? 2 : 1
  for (let k = 0; k < n; k++) {
    const childAng = ang + (rng() - 0.5) * 0.55
    const childLen = len * (0.28 + rng() * 0.32)
    growFork(tip.x, tip.y, childAng, childLen, w0 * 0.42, depth - 1, out, rng)
  }
  if (rng() < 0.45 && pts.length > 3) {
    const mid = pts[Math.floor(pts.length * (0.35 + rng() * 0.3))]!
    growFork(
      mid.x,
      mid.y,
      ang + (rng() < 0.5 ? -0.5 : 0.5),
      len * (0.16 + rng() * 0.2),
      w0 * 0.35,
      0,
      out,
      rng,
    )
  }
}

function strikeAngle(edge: 'left' | 'right' | 'top' | 'bottom', rng: () => number): number {
  const tilt = 0.2 + rng() * 0.32
  const fwd = rng() < 0.5
  if (edge === 'left') return fwd ? Math.PI / 2 - tilt : -Math.PI / 2 + tilt
  if (edge === 'right') return fwd ? Math.PI / 2 + tilt : -Math.PI / 2 - tilt
  if (edge === 'top') return fwd ? tilt : Math.PI - tilt
  return fwd ? -tilt : Math.PI + tilt
}

function generateEdge(
  w: number,
  h: number,
  edge: 'left' | 'right' | 'top' | 'bottom',
  rng: () => number,
): Bolt[] {
  const out: Bolt[] = []
  const inset = 14 + rng() * 12
  let x0 = 0
  let y0 = 0
  let x1 = 0
  let y1 = 0
  if (edge === 'left') {
    x0 = inset
    y0 = 0
    x1 = inset
    y1 = h
  } else if (edge === 'right') {
    x0 = w - inset
    y0 = 0
    x1 = w - inset
    y1 = h
  } else if (edge === 'top') {
    x0 = 0
    y0 = inset
    x1 = w
    y1 = inset
  } else {
    x0 = 0
    y0 = h - inset
    x1 = w
    y1 = h - inset
  }

  const reach = Math.min(w, h) * 0.34
  const strikes = 11 + Math.floor(rng() * 6)
  for (let i = 0; i < strikes; i++) {
    const u = rng()
    const t = u < 0.2 ? rng() * 0.14 : u < 0.4 ? 0.86 + rng() * 0.14 : 0.12 + rng() * 0.76
    const p = { x: x0 + (x1 - x0) * t, y: y0 + (y1 - y0) * t }
    const len = reach * (0.4 + rng() * 0.75)
    const width = 1.7 + rng() * 2.1
    growFork(p.x, p.y, strikeAngle(edge, rng), len, width, rng() < 0.7 ? 1 : 2, out, rng)
  }
  const needles = 7 + Math.floor(rng() * 5)
  for (let i = 0; i < needles; i++) {
    const t = rng()
    const p = { x: x0 + (x1 - x0) * t, y: y0 + (y1 - y0) * t }
    growFork(p.x, p.y, strikeAngle(edge, rng), 22 + rng() * 40, 0.85 + rng() * 0.5, 0, out, rng)
  }
  return out
}

function generateSurgeBolts(): { bolts: Bolt[]; w: number; h: number } {
  const w = window.innerWidth
  const h = window.innerHeight
  const rng = Math.random
  return {
    w,
    h,
    bolts: [
      ...generateEdge(w, h, 'left', rng),
      ...generateEdge(w, h, 'right', rng),
      ...generateEdge(w, h, 'top', rng),
      ...generateEdge(w, h, 'bottom', rng),
    ],
  }
}

/** Fullscreen overlay; portals to body. `kind` selects the burst. `token` retriggers while active. */
export function FullscreenEffect({
  active,
  kind = 'confetti',
  token = 0,
}: {
  active: boolean
  kind?: EffectKind
  token?: number
}) {
  const [show, setShow] = useState(false)
  const [burstKey, setBurstKey] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!active || token <= 0) {
      setShow(false)
      return
    }
    setBurstKey((k) => k + 1)
    setShow(true)
    const id = window.setTimeout(() => setShow(false), DURATION[kind])
    return () => window.clearTimeout(id)
  }, [active, kind, token])

  const pieces = useMemo(() => {
    if (!show || kind !== 'confetti') return [] as Piece[]
    return Array.from({ length: 110 }, (_, i) => {
      const size = 10 + Math.random() * 14
      return {
        id: i + burstKey * 1000,
        left: 2 + Math.random() * 96,
        delay: Math.random() * 0.9,
        duration: 3.2 + Math.random() * 2.8,
        color: COLORS[i % COLORS.length]!,
        rot: Math.random() * 360,
        drift: -12 + Math.random() * 24,
        size,
        tall: Math.random() > 0.45,
      }
    })
  }, [show, burstKey, kind])

  const drops = useMemo(() => {
    if (!show || (kind !== 'rain' && kind !== 'miss')) return [] as Piece[]
    const long = kind === 'miss'
    return Array.from({ length: long ? 120 : 80 }, (_, i) => ({
      id: i + burstKey * 1000,
      left: Math.random() * 100,
      delay: Math.random() * (long ? 2.6 : 0.55),
      duration: 0.95 + Math.random() * 0.85,
      color: '#6a849c',
      rot: -8 + Math.random() * 16,
      drift: -2 + Math.random() * 4,
      size: 28 + Math.random() * 28,
      tall: true,
    }))
  }, [show, burstKey, kind])

  const surge = useMemo(() => {
    if (!show || kind !== 'surge' || burstKey < 0) return { bolts: [] as Bolt[], w: 0, h: 0 }
    return generateSurgeBolts()
  }, [show, burstKey, kind])

  if (!mounted || !show) return null

  if (kind === 'surge') {
    return createPortal(
      <div key={burstKey} className="fx-surge" aria-hidden>
        <svg
          className="fx-surge-svg"
          viewBox={`0 0 ${surge.w} ${surge.h}`}
          preserveAspectRatio="none"
        >
          {surge.bolts.map((b, i) => (
            <path
              key={i}
              d={b.d}
              className="fx-bolt"
              style={{ animationDelay: `${b.delay}s` }}
            />
          ))}
        </svg>
      </div>,
      document.body,
    )
  }

  if (kind === 'rain' || kind === 'miss') {
    return createPortal(
      <div
        key={burstKey}
        className="fx-rain"
        style={{ animationDuration: `${DURATION[kind]}ms` }}
        aria-hidden
      >
        {drops.map((p) => (
          <span
            key={`${burstKey}-${p.id}`}
            className="fx-raindrop"
            style={
              {
                left: `${p.left}%`,
                width: Math.max(5, p.size * 0.18),
                height: p.size,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                '--confetti-rot': `${p.rot}deg`,
                '--confetti-drift': `${p.drift}vw`,
              } as CSSProperties
            }
          />
        ))}
      </div>,
      document.body,
    )
  }

  return createPortal(
    <div className="confetti-burst" aria-hidden>
      {pieces.map((p) => (
        <span
          key={`${burstKey}-${p.id}`}
          className={`confetti-piece ${p.tall ? 'is-tall' : ''}`}
          style={
            {
              left: `${p.left}%`,
              background: p.color,
              width: p.size,
              height: p.tall ? p.size * 1.35 : p.size * 0.55,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              '--confetti-rot': `${p.rot}deg`,
              '--confetti-drift': `${p.drift}vw`,
            } as CSSProperties
          }
        />
      ))}
    </div>,
    document.body,
  )
}

/** Existing API for SysPick / Gerrymander. */
export function ConfettiBurst({ active }: { active: boolean }) {
  return <FullscreenEffect active={active} kind="confetti" />
}
