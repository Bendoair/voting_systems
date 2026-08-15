import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n'
import { useTheme } from '../theme'

export function Layout() {
  const { t, locale, setLocale } = useI18n()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink to="/" className="brand">
          <span className="brand-mark" aria-hidden />
          <span className="brand-text">{t('brand.title')}</span>
        </NavLink>
        <nav className="nav">
          <NavLink to="/tour">{t('nav.tour')}</NavLink>
          <NavLink to="/systems">{t('nav.systems')}</NavLink>
          <NavLink to="/case-study">{t('nav.case')}</NavLink>
          <NavLink to="/games">{t('nav.exercises')}</NavLink>
          <NavLink to="/simulate">{t('nav.simulate')}</NavLink>
          <button
            type="button"
            className="lang-btn theme-btn"
            onClick={toggleTheme}
            aria-label={t('nav.theme')}
            title={t('nav.theme')}
          >
            {theme === 'dark' ? t('nav.themeLight') : t('nav.themeDark')}
          </button>
          <button
            type="button"
            className="lang-btn"
            onClick={() => setLocale(locale === 'hu' ? 'en' : 'hu')}
            aria-label="Language"
          >
            {t('nav.lang')}
          </button>
        </nav>
      </header>
      <main className="main">
        <div key={location.pathname} className="page-transition">
          <Outlet />
        </div>
      </main>
      <footer className="site-footer">
        <p>{t('footer.note')}</p>
      </footer>
    </div>
  )
}
