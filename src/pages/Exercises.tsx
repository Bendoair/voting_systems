import { Link } from 'react-router-dom'
import { SalamanderPixel } from '../components/SalamanderPixel'
import { useCompactLayout } from '../hooks/useCompactLayout'
import { useI18n } from '../i18n'

export function Exercises() {
  const { t } = useI18n()
  const compact = useCompactLayout()

  return (
    <div className={`page games-page exercises-page ${compact ? 'is-compact-page' : ''}`}>
      <header className="page-head">
        <h1>{t('ex.title')}</h1>
        {!compact && <p>{t('ex.intro')}</p>}
      </header>

      <div className={`ex-grid ${compact ? 'is-compact-grid' : ''}`}>
        <Link to="/games/gerrymander" className="ex-card ex-card-gerry">
          <div className="ex-card-visual" aria-hidden>
            <SalamanderPixel className="ex-card-salamander" />
            <span className="ex-card-badge">{t('ex.gerry.badge')}</span>
          </div>
          <div className="ex-card-body">
            <h2>{t('ex.gerry.cardTitle')}</h2>
            <p>{t('ex.gerry.cardBlurb')}</p>
            <span className="ex-card-cta btn primary">{t('ex.gerry.play')}</span>
          </div>
        </Link>

        <Link to="/games/syspick" className="ex-card ex-card-syspick">
          <div className="ex-card-visual" aria-hidden>
            <div className="syspick-card-glyphs">
              <span className="syspick-card-chip">FPTP</span>
              <span className="syspick-card-chip is-accent">PR</span>
              <span className="syspick-card-chip">IRV</span>
            </div>
            <span className="ex-card-badge">{t('ex.syspick.badge')}</span>
          </div>
          <div className="ex-card-body">
            <h2>{t('ex.syspick.cardTitle')}</h2>
            <p>{t('ex.syspick.cardBlurb')}</p>
            <span className="ex-card-cta btn primary">{t('ex.syspick.play')}</span>
          </div>
        </Link>

        <Link to="/games/openlist" className="ex-card ex-card-openlist">
          <div className="ex-card-visual" aria-hidden>
            <div className="openlist-card-list">
              <span className="is-in" />
              <span className="is-in" />
              <span className="is-in" />
              <span className="is-cut" />
              <span />
              <span />
            </div>
            <span className="ex-card-badge">{t('ex.openlist.badge')}</span>
          </div>
          <div className="ex-card-body">
            <h2>{t('ex.openlist.cardTitle')}</h2>
            <p>{t('ex.openlist.cardBlurb')}</p>
            <span className="ex-card-cta btn primary">{t('ex.openlist.play')}</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
