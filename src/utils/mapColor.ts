/** Mix hex color toward a muted paper tone by t in [0,1] (1 = full mute). */
function mixHex(hex: string, toward: string, t: number): string {
  const a = parseHex(hex)
  const b = parseHex(toward)
  if (!a || !b) return hex
  const u = Math.max(0, Math.min(1, t))
  const m = (x: number, y: number) => Math.round(x + (y - x) * u)
  return `#${[m(a[0], b[0]), m(a[1], b[1]), m(a[2], b[2])]
    .map((n) => n.toString(16).padStart(2, '0'))
    .join('')}`
}

function parseHex(hex: string): [number, number, number] | null {
  const h = hex.replace('#', '').trim()
  if (h.length === 3) {
    return [
      parseInt(h[0]! + h[0]!, 16),
      parseInt(h[1]! + h[1]!, 16),
      parseInt(h[2]! + h[2]!, 16),
    ]
  }
  if (h.length !== 6) return null
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}

/**
 * Party color washed toward map paper when the lead is thin;
 * strong leads stay vivid (higher “saturation” via less mixing).
 */
export function colorForLead(partyHex: string, lead: number): string {
  const strength = Math.max(0, Math.min(1, lead / 0.28))
  const mute = 1 - (0.2 + 0.8 * strength)
  const wash =
    typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark'
      ? '#3a3832'
      : '#c8c2b6'
  return mixHex(partyHex, wash, mute)
}

/** Margin between 1st and 2nd share (0–1). */
export function voteLead(shares: Record<string, number> | undefined): {
  leaderId: string
  lead: number
  top: { id: string; share: number }[]
} {
  const ranked = Object.entries(shares ?? {})
    .map(([id, share]) => ({ id, share }))
    .sort((a, b) => b.share - a.share)
  const first = ranked[0]
  const second = ranked[1]
  if (!first) return { leaderId: '', lead: 0, top: [] }
  return {
    leaderId: first.id,
    lead: first.share - (second?.share ?? 0),
    top: ranked.slice(0, 3),
  }
}

/** Continuous meat (−1) → mid → plant (+1) wash for geography maps. */
export function colorForDiet(lean: number): string {
  const t = Math.max(0, Math.min(1, (lean + 1) / 2))
  if (t <= 0.5) return mixHex('#8d6e4c', '#c4b49a', t * 2)
  return mixHex('#c4b49a', '#5f8f55', (t - 0.5) * 2)
}

/** Population-weighted national diet baseline in [-1, 1]. */
export function nationalDietLean(
  regions: { population: number; dietBaseline?: number }[],
): number {
  const totalPop = regions.reduce((a, r) => a + r.population, 0)
  if (totalPop <= 0) return 0
  return (
    regions.reduce((a, r) => a + r.population * (r.dietBaseline ?? 0), 0) / totalPop
  )
}
