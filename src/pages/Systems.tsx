import { Link } from 'react-router-dom'
import { SYSTEMS, type SystemMeta } from '../data/systems'
import { useI18n } from '../i18n'
import type { ReactNode } from 'react'

const LOCAL_IDS = new Set(['local', 'ranked', 'two-round'])
const LIST_IDS = new Set(['closed-list', 'open-list'])
const MIXED_IDS = new Set(['mixed'])

function sectionSystems(ids: Set<string>): SystemMeta[] {
  return SYSTEMS.filter((s) => ids.has(s.id))
}

function SystemSection({
  titleKey,
  introKey,
  systems,
  titleExtra,
}: {
  titleKey: string
  introKey: string
  systems: SystemMeta[]
  titleExtra?: ReactNode
}) {
  const { t } = useI18n()
  if (systems.length === 0) return null
  return (
    <section className="system-section">
      <header className="system-section-head">
        <div className="system-section-title-row">
          <h2>{t(titleKey)}</h2>
          {titleExtra}
        </div>
        <p>{t(introKey)}</p>
      </header>
      <div className="system-grid">
        {systems.map((s) => (
          <Link key={s.id} to={`/systems/${s.id}`} className="system-card">
            <h3>{t(`sys.${s.id}.name`)}</h3>
            <p>{t(`sys.${s.id}.summary`)}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

function GerryLink() {
  const { t } = useI18n()
  return (
    <Link className="btn ghost system-gerry-btn" to="/games/gerrymander">
      {t('systems.gerry.cta')}
    </Link>
  )
}

export function Systems() {
  const { t } = useI18n()

  return (
    <div className="page systems-page">
      <header className="page-head">
        <h1>{t('systems.title')}</h1>
        <p>{t('systems.intro')}</p>
      </header>

      <SystemSection
        titleKey="systems.section.list"
        introKey="systems.section.listIntro"
        systems={sectionSystems(LIST_IDS)}
      />
      <SystemSection
        titleKey="systems.section.local"
        introKey="systems.section.localIntro"
        systems={sectionSystems(LOCAL_IDS)}
        titleExtra={<GerryLink />}
      />
      <SystemSection
        titleKey="systems.section.mixed"
        introKey="systems.section.mixedIntro"
        systems={sectionSystems(MIXED_IDS)}
      />
    </div>
  )
}
