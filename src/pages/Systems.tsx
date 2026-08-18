import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { SYSTEMS, SYSTEM_GROUPS, type SystemMeta } from '../data/systems'
import { PanelTabs } from '../components/PanelTabs'
import { useCompactLayout } from '../hooks/useCompactLayout'
import { useI18n } from '../i18n'

const LOCAL_IDS = new Set<string>(SYSTEM_GROUPS.local)
const LIST_IDS = new Set<string>(SYSTEM_GROUPS.list)
const MIXED_IDS = new Set<string>(SYSTEM_GROUPS.mixed)

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
    <Link className="btn ghost system-game-btn" to="/games/gerrymander">
      {t('systems.gerry.cta')}
    </Link>
  )
}

function SysPickLink() {
  const { t } = useI18n()
  return (
    <Link className="btn ghost system-game-btn" to="/games/syspick">
      {t('systems.syspick.cta')}
    </Link>
  )
}

type SysSectionTab = 'list' | 'local' | 'mixed'

export function Systems() {
  const { t } = useI18n()
  const compact = useCompactLayout()
  const [tab, setTab] = useState<SysSectionTab>('list')

  if (compact) {
    return (
      <div className="page systems-page is-compact-page">
        <header className="page-head">
          <h1>{t('systems.title')}</h1>
          <SysPickLink />
        </header>
        <PanelTabs
          ariaLabel={t('compact.systems.tabs')}
          value={tab}
          onChange={setTab}
          tabs={[
            { id: 'list', label: t('compact.systems.list') },
            { id: 'local', label: t('compact.systems.local') },
            { id: 'mixed', label: t('compact.systems.mixed') },
          ]}
        />
        <div className="compact-panel">
          {tab === 'list' && (
            <SystemSection
              titleKey="systems.section.list"
              introKey="systems.section.listIntro"
              systems={sectionSystems(LIST_IDS)}
            />
          )}
          {tab === 'local' && (
            <SystemSection
              titleKey="systems.section.local"
              introKey="systems.section.localIntro"
              systems={sectionSystems(LOCAL_IDS)}
              titleExtra={<GerryLink />}
            />
          )}
          {tab === 'mixed' && (
            <SystemSection
              titleKey="systems.section.mixed"
              introKey="systems.section.mixedIntro"
              systems={sectionSystems(MIXED_IDS)}
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="page systems-page">
      <header className="page-head">
        <h1>{t('systems.title')}</h1>
        <p>{t('systems.intro')}</p>
        <SysPickLink />
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
