import { useLayoutEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { CompactChromeProvider, useCompactChrome } from '../hooks/useCompactChrome'
import { useCompactLayout } from '../hooks/useCompactLayout'
import { useI18n } from '../i18n'
import { useTheme } from '../theme'
import { scrollAppToTop } from '../utils/scrollAppToTop'

const MAIN_LINKS = [
  { to: '/tour', labelKey: 'nav.tour', icon: 'tour' },
  { to: '/systems', labelKey: 'nav.systems', icon: 'systems' },
  { to: '/case-study', labelKey: 'nav.case', icon: 'case' },
  { to: '/games', labelKey: 'nav.exercises', icon: 'games' },
  { to: '/simulate', labelKey: 'nav.simulate', icon: 'simulate' },
] as const

type NavIconId = (typeof MAIN_LINKS)[number]['icon']

function NavIcon({ id }: { id: NavIconId }) {
  const common = {
    viewBox: '0 0 24 24',
    width: '1.15em',
    height: '1.15em',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.9,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }
  switch (id) {
    case 'tour':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3.2" />
          <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2" />
          <path d="M6.4 6.4l1.6 1.6M16 16l1.6 1.6M17.6 6.4 16 8M8 16l-1.6 1.6" />
        </svg>
      )
    case 'systems':
      return (
        <svg {...common}>
          <path d="M5 7h14M5 12h14M5 17h10" />
        </svg>
      )
    case 'case':
      return (
        <svg {...common}>
          <rect x="4.5" y="4.5" width="6.5" height="15" rx="1.2" />
          <rect x="13" y="4.5" width="6.5" height="15" rx="1.2" />
        </svg>
      )
    case 'games':
      return (
        <svg {...common}>
          <rect x="3.5" y="8" width="17" height="9.5" rx="3" />
          <path d="M8 12.75h3.2M9.6 11.1v3.2M15.2 11.5h.1M17.1 14h.1" />
        </svg>
      )
    case 'simulate':
      return (
        <svg {...common}>
          <path d="M4.5 16.5 9 9.5l3.2 4.2 3.3-6.2 4 9" />
          <circle cx="9" cy="9.5" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="12.2" cy="13.7" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="15.5" cy="7.5" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      )
  }
}

function ThemeIcon({ theme }: { theme: 'light' | 'dark' }) {
  if (theme === 'dark') {
    return (
      <svg className="theme-icon" viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="4.25" fill="currentColor" />
        <path
          d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.4 5.4l1.55 1.55M17.05 17.05l1.55 1.55M17.05 5.4l-1.55 1.55M5.4 17.05l1.55-1.55"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  return (
    <svg className="theme-icon" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M19.5 13.4A7.4 7.4 0 0 1 10.6 4.5 7.6 7.6 0 1 0 19.5 13.4Z"
        fill="currentColor"
      />
    </svg>
  )
}

function LangFlag({ locale }: { locale: 'hu' | 'en' }) {
  if (locale === 'hu') {
    return (
      <svg className="flag-icon" viewBox="0 0 24 16" aria-hidden>
        <rect width="24" height="16" rx="1.5" fill="#fff" />
        <rect width="24" height="5.35" y="0" fill="#c8102e" />
        <rect width="24" height="5.35" y="10.65" fill="#00843d" />
      </svg>
    )
  }
  return (
    <svg className="flag-icon" viewBox="0 0 24 16" aria-hidden>
      <rect width="24" height="16" rx="1.5" fill="#012169" />
      <path d="M0 0l24 16M24 0L0 16" stroke="#fff" strokeWidth="3.2" />
      <path d="M0 0l24 16M24 0L0 16" stroke="#c8102e" strokeWidth="1.6" />
      <path d="M12 0v16M0 8h24" stroke="#fff" strokeWidth="5" />
      <path d="M12 0v16M0 8h24" stroke="#c8102e" strokeWidth="2.6" />
    </svg>
  )
}

function LayoutInner() {
  const { t, locale, setLocale } = useI18n()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const compact = useCompactLayout()
  const { ownsBottomNav } = useCompactChrome()
  const showBottomNav = compact && !ownsBottomNav
  const nextLocale = locale === 'hu' ? 'en' : 'hu'

  useLayoutEffect(() => {
    scrollAppToTop()
  }, [location.pathname, location.search])

  return (
    <div className={`app-shell ${compact ? 'is-compact-shell' : ''}`}>
      <header className="site-header">
        <NavLink to="/" className="brand">
          <span className="brand-mark" aria-hidden />
          <span className="brand-text">{t('brand.title')}</span>
        </NavLink>
        <div className="header-tools">
          {!compact && (
            <nav className="nav" aria-label={t('nav.main')}>
              {MAIN_LINKS.map((link) => (
                <NavLink key={link.to} to={link.to}>
                  {t(link.labelKey)}
                </NavLink>
              ))}
            </nav>
          )}
          <button
            type="button"
            className="lang-btn icon-btn theme-btn"
            onClick={toggleTheme}
            aria-label={t('nav.theme')}
            title={theme === 'dark' ? t('nav.themeLight') : t('nav.themeDark')}
          >
            <ThemeIcon theme={theme} />
          </button>
          <button
            type="button"
            className="lang-btn icon-btn"
            onClick={() => setLocale(nextLocale)}
            aria-label={t('nav.langSwitch')}
            title={t('nav.langSwitch')}
          >
            <LangFlag locale={nextLocale} />
          </button>
        </div>
      </header>
      <main className="main">
        <div key={location.pathname} className="page-transition">
          <Outlet />
        </div>
      </main>
      {!compact && (
        <footer className="site-footer">
          <p>{t('footer.note')}</p>
        </footer>
      )}
      {showBottomNav && (
        <nav className="site-bottom-nav" aria-label={t('nav.main')}>
          {MAIN_LINKS.map((link, i) => (
            <span key={link.to} className="site-bottom-slot">
              {i > 0 && (
                <span className="site-bottom-sep" aria-hidden>
                  |
                </span>
              )}
              <NavLink to={link.to} className="site-bottom-link">
                <span className="site-bottom-icon">
                  <NavIcon id={link.icon} />
                </span>
                <span className="site-bottom-label">{t(link.labelKey)}</span>
              </NavLink>
            </span>
          ))}
        </nav>
      )}
    </div>
  )
}

export function Layout() {
  return (
    <CompactChromeProvider>
      <LayoutInner />
    </CompactChromeProvider>
  )
}
