import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { createElement } from 'react'
import { en, hu, type Locale } from './messages'

const catalogs = { hu, en } as const

interface I18nValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nValue | null>(null)

function loadLocale(): Locale {
  try {
    const v = localStorage.getItem('vs-locale')
    if (v === 'en' || v === 'hu') return v
  } catch {
    /* ignore */
  }
  return 'hu'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(loadLocale)

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    try {
      localStorage.setItem('vs-locale', l)
    } catch {
      /* ignore */
    }
  }, [])

  const t = useCallback(
    (key: string) => catalogs[locale][key] ?? catalogs.en[key] ?? key,
    [locale],
  )

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t])

  return createElement(I18nContext.Provider, { value }, children)
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n outside provider')
  return ctx
}
