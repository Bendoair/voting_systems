import { Link } from 'react-router-dom'
import { SalamanderPixel } from '../components/SalamanderPixel'
import { useI18n } from '../i18n'

export function Exercises() {
  const { t } = useI18n()

  return (
    <div className="page games-page exercises-page">
      <header className="page-head">
        <h1>{t('ex.title')}</h1>
        <p>{t('ex.intro')}</p>
      </header>

      <div className="ex-grid">
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
      </div>
    </div>
  )
}
