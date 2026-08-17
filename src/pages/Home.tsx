import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCompactLayout } from '../hooks/useCompactLayout'
import { useI18n } from '../i18n'

function GuideList() {
  const { t } = useI18n()
  return (
    <ul className="home-guide">
      <li>
        <Link to="/tour">{t('home.guide.tour')}</Link>
        {': '}
        {t('home.guide.tourDesc')}
      </li>
      <li>
        <Link to="/systems">{t('home.guide.systems')}</Link>
        {': '}
        {t('home.guide.systemsDesc')}
      </li>
      <li>
        <Link to="/case-study">
          <strong>{t('home.guide.case')}</strong>
        </Link>
        {': '}
        {t('home.guide.caseDesc')}
      </li>
      <li>
        <Link to="/simulate">{t('home.guide.simulate')}</Link>
        {': '}
        {t('home.guide.simulateDesc')}
      </li>
      <li>
        <Link to="/games">{t('home.guide.games')}</Link>
        {': '}
        {t('home.guide.gamesDesc')}
      </li>
    </ul>
  )
}

export function Home() {
  const { t } = useI18n()
  const compact = useCompactLayout()
  const [guideOpen, setGuideOpen] = useState(false)
  const guideDialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const el = guideDialogRef.current
    if (!el) return
    if (guideOpen) {
      if (!el.open) el.showModal()
    } else if (el.open) {
      el.close()
    }
  }, [guideOpen])

  return (
    <div className={`home ${compact ? 'is-compact-page' : ''}`}>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Magyarország · Hungary</p>
          <h1>{t('brand.title')}</h1>
          <p className="tagline">{t('brand.tagline')}</p>
          <p className="lead">{t('home.lead')}</p>
          {!compact && <GuideList />}
          <div className="cta-row">
            <Link className="btn primary" to="/tour">
              {t('home.cta.tour')}
            </Link>
            <Link className="btn primary soft" to="/case-study">
              {t('home.cta.case')}
            </Link>
            {!compact && (
              <>
                <Link className="btn" to="/systems">
                  {t('home.cta.systems')}
                </Link>
                <Link className="btn" to="/simulate">
                  {t('home.cta.simulate')}
                </Link>
              </>
            )}
            {compact && (
              <>
                <Link className="btn" to="/games">
                  {t('nav.exercises')}
                </Link>
                <button type="button" className="btn ghost" onClick={() => setGuideOpen(true)}>
                  {t('compact.home.guide')}
                </button>
              </>
            )}
          </div>
        </div>
        <div className="hero-visual" aria-hidden>
          <svg viewBox="0 0 320 280" className="hero-svg">
            <defs>
              <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1f6f5b" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#c45c26" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            <path
              d="M40,110 L90,70 L150,55 L210,70 L270,95 L290,140 L270,190 L220,230 L150,245 L90,220 L50,170 Z"
              fill="url(#hg)"
              stroke="#1a1a1a"
              strokeWidth="2"
            />
            <circle cx="160" cy="130" r="18" fill="#f2e8d5" stroke="#1a1a1a" />
            <text x="160" y="135" textAnchor="middle" fontSize="11" fontFamily="var(--font-display)">
              BP
            </text>
            <g className="hero-float">
              <text x="70" y="100" fontSize="22">
                🍌
              </text>
              <text x="230" y="120" fontSize="22">
                🍎
              </text>
              <text x="120" y="200" fontSize="22">
                🍇
              </text>
            </g>
          </svg>
        </div>
      </section>
      {compact && (
        <dialog
          ref={guideDialogRef}
          className="home-guide-dialog"
          onClose={() => setGuideOpen(false)}
          onClick={(e) => {
            if (e.target === e.currentTarget) setGuideOpen(false)
          }}
        >
          <div className="home-guide-panel">
            <header className="home-guide-panel-head">
              <h2>{t('compact.home.guide')}</h2>
              <button
                type="button"
                className="btn ghost"
                onClick={() => setGuideOpen(false)}
                aria-label={t('compact.home.guideClose')}
              >
                ×
              </button>
            </header>
            <GuideList />
          </div>
        </dialog>
      )}
    </div>
  )
}
