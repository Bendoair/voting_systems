export const DIET_STEPS = [-1, -0.5, 0, 0.5, 1] as const

export type DietTone = 'meat' | 'slightMeat' | 'mid' | 'slightPlant' | 'plant'

const TONES: DietTone[] = ['meat', 'slightMeat', 'mid', 'slightPlant', 'plant']

/** Snap continuous lean to nearest of the five preference steps. */
export function snapDiet(v: number): (typeof DIET_STEPS)[number] {
  let best: (typeof DIET_STEPS)[number] = DIET_STEPS[2]
  let bestD = Infinity
  for (const s of DIET_STEPS) {
    const d = Math.abs(s - v)
    if (d < bestD) {
      bestD = d
      best = s
    }
  }
  return best
}

export function dietStepIndex(v: number): number {
  return DIET_STEPS.indexOf(snapDiet(v))
}

export function dietFromStepIndex(i: number): (typeof DIET_STEPS)[number] {
  const clamped = Math.max(0, Math.min(DIET_STEPS.length - 1, Math.round(i)))
  return DIET_STEPS[clamped]!
}

export function dietTone(v: number): DietTone {
  return TONES[dietStepIndex(v)]!
}
