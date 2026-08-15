export type Pt = { x: number; y: number }

/** Ray-cast point-in-polygon (canvas / cell-center coords). */
export function pointInPolygon(px: number, py: number, poly: Pt[]): boolean {
  if (poly.length < 3) return false
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i]!.x
    const yi = poly[i]!.y
    const xj = poly[j]!.x
    const yj = poly[j]!.y
    const intersect =
      yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi + 0.0) + xi
    if (intersect) inside = !inside
  }
  return inside
}

export function pathLength(poly: Pt[]): number {
  let len = 0
  for (let i = 1; i < poly.length; i++) {
    const a = poly[i - 1]!
    const b = poly[i]!
    len += Math.hypot(b.x - a.x, b.y - a.y)
  }
  return len
}

/** Approximate polygon area (shoelace), absolute. */
export function polygonArea(poly: Pt[]): number {
  if (poly.length < 3) return 0
  let a = 0
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    a += poly[j]!.x * poly[i]!.y - poly[i]!.x * poly[j]!.y
  }
  return Math.abs(a / 2)
}

export function downsampleStroke(points: Pt[], minDist: number): Pt[] {
  if (points.length === 0) return []
  const out: Pt[] = [points[0]!]
  for (let i = 1; i < points.length; i++) {
    const p = points[i]!
    const last = out[out.length - 1]!
    if (Math.hypot(p.x - last.x, p.y - last.y) >= minDist) out.push(p)
  }
  return out
}

/** Centroid of land cells belonging to a district (grid coords, cell centers). */
export function districtCentroid(
  width: number,
  height: number,
  land: boolean[],
  assignment: number[],
  districtId: number,
): Pt | null {
  let sx = 0
  let sy = 0
  let n = 0
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x
      if (!land[i] || assignment[i] !== districtId) continue
      sx += x + 0.5
      sy += y + 0.5
      n++
    }
  }
  if (n === 0) return null
  return { x: sx / n, y: sy / n }
}
