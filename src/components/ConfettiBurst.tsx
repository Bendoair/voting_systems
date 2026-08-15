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

/** Fullscreen confetti; portals to body so it covers the viewport on mobile too. */
export function ConfettiBurst({ active }: { active: boolean }) {
  const [show, setShow] = useState(false)
  const [burstKey, setBurstKey] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!active) {
      setShow(false)
      return
    }
    setBurstKey((k) => k + 1)
    setShow(true)
    const id = window.setTimeout(() => setShow(false), 6500)
    return () => window.clearTimeout(id)
  }, [active])

  const pieces = useMemo(() => {
    if (!show) return [] as Piece[]
    return Array.from({ length: 110 }, (_, i) => {
      const size = 10 + Math.random() * 14
      return {
        id: i,
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
  }, [show, burstKey])

  if (!mounted || !show) return null

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
