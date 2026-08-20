import { useEffect, useState } from 'react'

/** Class for a short one-shot wiggle after navigating to a game page. */
export function useEntryHint(durationMs = 2400): string {
  const [on, setOn] = useState(true)

  useEffect(() => {
    const id = window.setTimeout(() => setOn(false), durationMs)
    return () => window.clearTimeout(id)
  }, [durationMs])

  return on ? 'is-entry-hint' : ''
}
