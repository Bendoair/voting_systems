import { useEffect, useState } from 'react'

const QUERY = '(max-width: 720px)'

/** True below 720px — compact / phone layouts. */
export function useCompactLayout(): boolean {
  const [compact, setCompact] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(QUERY).matches
  })

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const apply = () => {
      const next = mq.matches
      setCompact(next)
      document.documentElement.classList.toggle('is-compact', next)
    }
    apply()
    mq.addEventListener('change', apply)
    return () => {
      mq.removeEventListener('change', apply)
      document.documentElement.classList.remove('is-compact')
    }
  }, [])

  return compact
}
