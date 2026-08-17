import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CaseDietGeoMap } from '../components/CaseDietGeoMap'
import { ConfettiBurst } from '../components/ConfettiBurst'
import { HungaryMap } from '../components/HungaryMap'
import { SeatChart } from '../components/SeatChart'
import { OEVK_DISTRICTS } from '../data/oevkDistricts'
import { dietTone } from '../data/diet'
import { type SystemId } from '../engines'
import {
  generateSysPickScenario,
  relabelParties,
} from '../exercises/syspick/generate'
import { isOptimalPick, rankedSystems } from '../exercises/syspick/score'
import {
  SYSPICK_SECTIONS,
  SYSPICK_SYSTEMS,
  type SysPickPhase,
  type SysPickScenario,
} from '../exercises/syspick/types'
import { useI18n } from '../i18n'
import { useCompactLayout } from '../hooks/useCompactLayout'
import { PanelTabs } from '../components/PanelTabs'
import { nationalDietLean } from '../utils/mapColor'

function DietMark({ lean }: { lean: number }) {
  const { t } = useI18n()
  const tone = dietTone(lean)
  const label = t(`sim.diet.${tone}`)
  return (
    <span className={`syspick-diet syspick-diet-${tone}`} title={label}>
      {label}
    </span>
  )
}

function SystemChip({
  systemId,
  phase,
  pick,
  scenario,
  onPick,
}: {
  systemId: SystemId
  phase: SysPickPhase
  pick: SystemId | null
  scenario: SysPickScenario
  onPick: (id: SystemId) => void
}) {
  const { t } = useI18n()
  const seats = scenario.playerSeats[systemId]
  const isBest = scenario.bestSystems.includes(systemId)
  const isPick = pick === systemId
  return (
    <button
      type="button"
      className={[
        'syspick-chip',
        phase === 'reveal' && isBest ? 'is-best' : '',
        phase === 'reveal' && isPick ? 'is-pick' : '',
        phase === 'reveal' && isPick && !isBest ? 'is-miss' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={phase !== 'pick'}
      onClick={() => onPick(systemId)}
      title={`${t(`sys.${systemId}.name`)}, ${t(`ex.syspick.chipDesc.${systemId}`)}`}
    >
      <span className="syspick-chip-name">{t(`ex.syspick.chip.${systemId}`)}</span>
      <span className="syspick-chip-desc">{t(`ex.syspick.chipDesc.${systemId}`)}</span>
      {phase === 'reveal' && (
        <span className="syspick-chip-seats">
          {seats}
          {isBest ? ` · ${t('ex.syspick.bestTag')}` : ''}
          {isPick ? ` · ${t('ex.syspick.yourPick')}` : ''}
        </span>
      )}
    </button>
  )
}

export function SysPick() {
  const { t, locale } = useI18n()
  const compact = useCompactLayout()
  const [scenario, setScenario] = useState<SysPickScenario>(() =>
    generateSysPickScenario(locale),
  )
  const [phase, setPhase] = useState<SysPickPhase>('pick')
  const [pick, setPick] = useState<SystemId | null>(null)
  const [mapTab, setMapTab] = useState<SystemId>('closed-list')
  const [rulesOpen, setRulesOpen] = useState(false)
  const [dealTab, setDealTab] = useState<'deal' | 'pick'>('deal')
  const [revealPane, setRevealPane] = useState<'map' | 'seats'>('map')
  const rulesDialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    setScenario((s) => relabelParties(s, locale))
  }, [locale])

  useEffect(() => {
    const el = rulesDialogRef.current
    if (!el) return
    if (rulesOpen) {
      if (!el.open) el.showModal()
    } else if (el.open) {
      el.close()
    }
  }, [rulesOpen])

  const player = scenario.parties.find((p) => p.id === scenario.playerPartyId)
  const won = pick !== null && isOptimalPick(scenario, pick)
  const mapResult = useMemo(() => scenario.bySystem[mapTab], [scenario, mapTab])
  const ranking = useMemo(() => rankedSystems(scenario), [scenario])
  const nationalLeanLabel = useMemo(() => {
    const lean = nationalDietLean(scenario.regions)
    return t('ex.syspick.nationalLean').replace('{lean}', t(`sim.diet.${dietTone(lean)}`))
  }, [scenario.regions, t])

  function dealNew() {
    setScenario(generateSysPickScenario(locale))
    setPhase('pick')
    setPick(null)
  }

  function confirmPick(system: SystemId) {
    if (phase !== 'pick') return
    setPick(system)
    setMapTab(system)
    setPhase('reveal')
  }

  return (
    <div className={`page syspick-page ${compact ? 'is-compact-page' : ''}`}>
      <ConfettiBurst active={phase === 'reveal' && won} />

      <header className="page-head">
        <p className="gerry-back">
          <Link to="/games">{t('ex.back')}</Link>
        </p>
        <h1>{t('ex.syspick.title')}</h1>
        {compact && (
          <button
            type="button"
            className="gerry-rules-btn"
            onClick={() => setRulesOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={rulesOpen}
          >
            <span className="gerry-rules-info" aria-hidden>
              i
            </span>
            {t('ex.syspick.rulesLink')}
          </button>
        )}
        {compact && phase === 'pick' && (
          <PanelTabs
            ariaLabel={t('compact.syspick.tabs')}
            value={dealTab}
            onChange={setDealTab}
            tabs={[
              { id: 'deal', label: t('compact.syspick.deal') },
              { id: 'pick', label: t('compact.syspick.pick') },
            ]}
          />
        )}
        {compact && phase === 'reveal' && (
          <PanelTabs
            ariaLabel={t('compact.syspick.revealTabs')}
            value={revealPane}
            onChange={setRevealPane}
            tabs={[
              { id: 'map', label: t('compact.syspick.map') },
              { id: 'seats', label: t('compact.syspick.seats') },
            ]}
          />
        )}
        <div className={`syspick-intro ${compact ? 'is-compact-hidden' : ''}`}>
          <aside className="info-panel gerry-brief syspick-brief" role="note">
            <p>{t('ex.syspick.rulesL1')}</p>
            <p>{t('ex.syspick.rulesL2')}</p>
            <p>{t('ex.syspick.rulesL3')}</p>
            <p>{t('ex.syspick.rulesL4')}</p>
            <button
              type="button"
              className="gerry-rules-btn"
              onClick={() => setRulesOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={rulesOpen}
            >
              <span className="gerry-rules-info" aria-hidden>
                i
              </span>
              {t('ex.syspick.rulesLink')}
            </button>
          </aside>
          <div className="syspick-geo">
            <h2 className="sim-section-title">{t('ex.syspick.geoTitle')}</h2>
            <p className="muted syspick-geo-blurb">{t('ex.syspick.geoBlurb')}</p>
            <CaseDietGeoMap
              regions={scenario.regions}
              compact
              nationalLabel={nationalLeanLabel}
            />
          </div>
        </div>
      </header>

      <dialog
        ref={rulesDialogRef}
        className="gerry-rules-dialog"
        onClose={() => setRulesOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setRulesOpen(false)
        }}
      >
        <div className="gerry-rules-panel">
          <header className="gerry-rules-panel-head">
            <h2>{t('ex.syspick.rulesLink')}</h2>
            <button
              type="button"
              className="btn ghost"
              onClick={() => setRulesOpen(false)}
              aria-label={t('ex.syspick.rulesClose')}
            >
              ×
            </button>
          </header>
          <ol className="gerry-rules-list">
            <li>{t('ex.syspick.rulesP1')}</li>
            <li>{t('ex.syspick.rulesP2')}</li>
            <li>{t('ex.syspick.rulesP3')}</li>
            <li>{t('ex.syspick.rulesP4')}</li>
          </ol>
          <p className="gerry-rules-luck">{t('ex.syspick.rulesP5')}</p>
        </div>
      </dialog>

      <section
        className={`syspick-deal ${compact && phase === 'pick' ? `deal-tab-${dealTab}` : ''}`}
        aria-label={t('ex.syspick.lineup')}
      >
        <div className="syspick-you">
          <p className="syspick-you-label">{t('ex.syspick.youAre')}</p>
          {player && (
            <div
              className="syspick-you-card"
              style={{ ['--party' as string]: player.color }}
            >
              <span className="syspick-you-fruit" aria-hidden>
                {player.fruit}
              </span>
              <div>
                <strong>{player.name}</strong>
                <p>
                  {player.popularity}% · <DietMark lean={player.dietLean} />
                </p>
              </div>
            </div>
          )}
          <button type="button" className="btn primary syspick-new-deal" onClick={dealNew}>
            <svg
              className="syspick-new-deal-icon"
              viewBox="0 0 24 24"
              width="1.15em"
              height="1.15em"
              aria-hidden
            >
              <path
                fill="currentColor"
                d="M7.5 4.5h9a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2Zm0 1.5a.5.5 0 0 0-.5.5v11c0 .28.22.5.5.5h9a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5h-9Z"
              />
              <path
                fill="currentColor"
                d="M4.75 7.25h1.5v11.5a2.75 2.75 0 0 0 2.75 2.75h8.25v1.5H9a4.25 4.25 0 0 1-4.25-4.25V7.25Z"
              />
              <path
                fill="currentColor"
                d="M10.2 9.1h5.1v1.4h-5.1V9.1Zm0 3.2h5.1v1.4h-5.1v-1.4Zm0 3.2h3.4v1.4h-3.4v-1.4Z"
              />
            </svg>
            {t('ex.syspick.newDeal')}
          </button>
          <p className="muted syspick-meta">
            {t('ex.syspick.polarization')}: {Math.round(scenario.polarization * 100)}%
          </p>
        </div>

        <div className="syspick-lineup">
          <h2 className="sim-section-title">{t('ex.syspick.lineup')}</h2>
          <ul className="syspick-parties">
            {scenario.parties.map((p) => {
              const yours = p.id === scenario.playerPartyId
              return (
                <li
                  key={p.id}
                  className={yours ? 'is-you' : undefined}
                  style={{ ['--party' as string]: p.color }}
                >
                  <span className="syspick-party-fruit" aria-hidden>
                    {p.fruit}
                  </span>
                  <span className="syspick-party-name">
                    {p.name}
                    {yours ? ` · ${t('ex.syspick.you')}` : ''}
                  </span>
                  <span className="syspick-party-pop">{p.popularity}%</span>
                  <DietMark lean={p.dietLean} />
                  <div className="syspick-pop-bar" aria-hidden>
                    <span style={{ width: `${p.popularity}%`, background: p.color }} />
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section
        className={`syspick-systems ${compact && phase === 'pick' && dealTab !== 'pick' ? 'is-compact-hidden' : ''}`}
        aria-label={t('ex.syspick.choose')}
      >
        <div className="syspick-systems-head">
          <div>
            <h2 className="sim-section-title">
              {phase === 'pick' ? t('ex.syspick.choose') : t('ex.syspick.revealTitle')}
            </h2>
            <p className="muted">
              {phase === 'pick' ? t('ex.syspick.chooseHint') : t('ex.syspick.revealHint')}
            </p>
          </div>
          <Link className="btn ghost syspick-explainers-btn" to="/systems">
            {t('ex.syspick.toSystems')}
          </Link>
        </div>

        <div className="syspick-pick-panel">
          {SYSPICK_SECTIONS.map((sec) => (
            <div key={sec.titleKey} className="syspick-pick-subsection">
              <h3 className="syspick-pick-section-title">{t(sec.titleKey)}</h3>
              <div className="syspick-chip-row" role="list">
                {sec.ids.map((id) => (
                  <div key={id} role="listitem">
                    <SystemChip
                      systemId={id}
                      phase={phase}
                      pick={pick}
                      scenario={scenario}
                      onPick={confirmPick}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {phase === 'reveal' && pick && player && mapResult && (
        <section className="syspick-reveal" aria-live="polite">
          <p className={won ? 'syspick-win' : 'syspick-lose'}>
            {won
              ? t('ex.syspick.victory')
                  .replace('{seats}', String(scenario.playerSeats[pick]))
                  .replace('{best}', String(scenario.bestSeats))
              : t('ex.syspick.defeat')
                  .replace('{seats}', String(scenario.playerSeats[pick]))
                  .replace('{best}', String(scenario.bestSeats))
                  .replace(
                    '{systems}',
                    scenario.bestSystems.map((id) => t(`ex.syspick.chip.${id}`)).join(', '),
                  )}
          </p>

          <div className="syspick-map-block">
            <h3 className="sim-section-title">{t('ex.syspick.mapResults')}</h3>
            <p className="muted">{t('ex.syspick.mapResultsHint')}</p>

            <div
              className="syspick-tabs"
              role="tablist"
              aria-label={t('ex.syspick.mapResults')}
            >
              {SYSPICK_SYSTEMS.map((id) => {
                const isBest = scenario.bestSystems.includes(id)
                const isPick = pick === id
                const selected = mapTab === id
                const label = t(`ex.syspick.chip.${id}`)
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-label={[
                      label,
                      isPick ? t('ex.syspick.yourPick') : '',
                      isBest ? t('ex.syspick.bestTag') : '',
                    ]
                      .filter(Boolean)
                      .join(', ')}
                    className={[
                      'syspick-tab',
                      selected ? 'is-active' : '',
                      isBest ? 'is-best' : '',
                      isPick ? 'is-pick' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => setMapTab(id)}
                  >
                    {isBest && (
                      <svg
                        className="syspick-tab-crown-edge"
                        viewBox="0 0 24 14"
                        aria-hidden
                      >
                        <path
                          d="M1 13V7.5L5 10l3.5-7.5L12 10l3.5-7.5L19 10l4-2.5V13Z"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    <span className="syspick-tab-name">{label}</span>
                  </button>
                )
              })}
            </div>

            <div
              className={`syspick-results-layout ${compact ? `reveal-${revealPane}` : ''}`}
            >
              <div className="syspick-results-map">
                <HungaryMap
                  regions={scenario.regions}
                  districts={OEVK_DISTRICTS}
                  leaders={mapResult.regionLeaders}
                  regionShares={mapResult.regionShares}
                  districtShares={mapResult.districtShares}
                  districtWinners={mapResult.districtWinners}
                  parties={scenario.parties}
                  hideMapNote
                />
              </div>

              <div className="syspick-results-summary">
                <h3 className="sim-section-title">
                  {t('ex.syspick.fullResult').replace(
                    '{system}',
                    t(`sys.${mapTab}.name`),
                  )}
                </h3>
                <SeatChart
                  parties={scenario.parties}
                  seats={mapResult.seats}
                  highlightPartyId={scenario.playerPartyId}
                  highlightLabel={t('ex.syspick.you')}
                />

                <h3 className="sim-section-title">{t('ex.syspick.ranking')}</h3>
                <ol className="syspick-rank-list">
                  {ranking.map((id) => (
                    <li
                      key={id}
                      className={[
                        scenario.bestSystems.includes(id) ? 'is-best' : '',
                        pick === id ? 'is-pick' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      <span>{t(`ex.syspick.chip.${id}`)}</span>
                      <strong>
                        {scenario.playerSeats[id]} {t('ex.syspick.seats')}
                      </strong>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
