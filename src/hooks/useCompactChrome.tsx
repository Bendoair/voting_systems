import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type CompactChromeValue = {
  /** When true, Layout hides the site bottom nav (page has its own sticky bar). */
  ownsBottomNav: boolean
  setOwnsBottomNav: (owns: boolean) => void
}

const CompactChromeContext = createContext<CompactChromeValue | null>(null)

export function CompactChromeProvider({ children }: { children: ReactNode }) {
  const [ownsBottomNav, setOwnsBottomNavState] = useState(false)
  const setOwnsBottomNav = useCallback((owns: boolean) => {
    setOwnsBottomNavState(owns)
  }, [])
  const value = useMemo(
    () => ({ ownsBottomNav, setOwnsBottomNav }),
    [ownsBottomNav, setOwnsBottomNav],
  )
  return (
    <CompactChromeContext.Provider value={value}>{children}</CompactChromeContext.Provider>
  )
}

export function useCompactChrome() {
  const ctx = useContext(CompactChromeContext)
  if (!ctx) {
    return {
      ownsBottomNav: false,
      setOwnsBottomNav: (_owns: boolean) => undefined,
    }
  }
  return ctx
}

/** Claim the bottom chrome while mounted (tour / case tour). */
export function useOwnBottomNav(active: boolean) {
  const { setOwnsBottomNav } = useCompactChrome()
  useEffect(() => {
    if (!active) return
    setOwnsBottomNav(true)
    return () => setOwnsBottomNav(false)
  }, [active, setOwnsBottomNav])
}
