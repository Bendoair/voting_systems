import { useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { getDefaultParties } from '../data/defaultParties'
import { REGIONS, getDefaultDietBaselines } from '../data/counties'
import { OEVK_COUNT, OEVK_DISTRICTS } from '../data/oevkDistricts'
import { SYSTEMS } from '../data/systems'
import { runElection, DISTRICT_METHODS, type Party, type SystemId, type DistrictMethod } from '../engines'
import { HungaryMap } from '../components/HungaryMap'
import { PartyEditor } from '../components/PartyEditor'
import { GeographyEditor } from '../components/GeographyEditor'
import { PanelTabs } from '../components/PanelTabs'
import { SeatChart } from '../components/SeatChart'
import { useCompactLayout } from '../hooks/useCompactLayout'
import { useI18n } from '../i18n'

function isSystemId(v: string | null): v is SystemId {
  return SYSTEMS.some((s) => s.id === v)
}

type SimTab = 'parties' | 'map' | 'results' | 'geo'

export function Simulate() {
  const { t, locale } = useI18n()
  const compact = useCompactLayout()
  const [params] = useSearchParams()
  const initial = params.get('system')
  const [system, setSystem] = useState<SystemId>(isSystemId(initial) ? initial : 'mixed')
  const [parties, setParties] = useState<Party[]>(() => getDefaultParties(locale))
  const [totalSeats, setTotalSeats] = useState(199)
  const [districtSeats, setDistrictSeats] = useState(106)
  const [districtMethod, setDistrictMethod] = useState<DistrictMethod>('plurality')
  const [polarization, setPolarization] = useState(0.7)
  const [baselines, setBaselines] = useState<Record<string, number>>(getDefaultDietBaselines)
  const [geoOpen, setGeoOpen] = useState(false)
  const [tab, setTab] = useState<SimTab>('parties')

  const meta = SYSTEMS.find((s) => s.id === system)
  const showDistrictSeats = system === 'mixed'

  const districtBudget = useMemo(() => {
    if (system === 'mixed') return Math.min(districtSeats, totalSeats, OEVK_COUNT)
    if (system === 'closed-list' || system === 'open-list') return Math.min(OEVK_COUNT, totalSeats)
    return Math.min(totalSeats, OEVK_COUNT)
  }, [system, districtSeats, totalSeats])

  const districts = OEVK_DISTRICTS

  const regions = useMemo(
    () =>
      REGIONS.map((r) => ({
        ...r,
        dietBaseline: baselines[r.id] ?? r.dietBaseline,
      })),
    [baselines],
  )

  const result = useMemo(
    () =>
      runElection(system, {
        parties,
        regions,
        districts,
        totalSeats:
          system === 'local' || system === 'ranked' || system === 'two-round'
            ? districtBudget
            : totalSeats,
        districtSeats: showDistrictSeats ? districtBudget : undefined,
        districtMethod: showDistrictSeats ? districtMethod : undefined,
        polarization,
      }),
    [
      system,
      parties,
      regions,
      districts,
      totalSeats,
      districtBudget,
      showDistrictSeats,
      districtMethod,
      polarization,
    ],
  )

  const disprop = useMemo(() => {
    return result.seats.reduce((a, s) => a + Math.abs(s.voteShare - s.seatShare), 0) / 2
  }, [result])

  const readout = useMemo(() => {
    const sorted = [...result.seats].sort((a, b) => b.seats - a.seats)
    const top = sorted[0]
    if (!top) return ''
    const p = parties.find((x) => x.id === top.partyId)
    if (!p) return ''
    const bonus = top.seatShare - top.voteShare
    const pp = (bonus * 100).toFixed(1)
    const fill = (key: string) => t(key).replace('{name}', p.name).replace('{pp}', pp)
    if (system === 'closed-list' || system === 'open-list') {
      return fill('sim.listFair')
    }
    if (bonus > 0.04) return fill('sim.gain')
    if (bonus < -0.04) return fill('sim.loss')
    return fill('sim.fair')
  }, [result, parties, system, t])

  const topSeat = [...result.seats].sort((a, b) => b.seats - a.seats)[0]
  const topParty = topSeat ? parties.find((p) => p.id === topSeat.partyId) : null

  const setupBlock = (
    <section className="sim-section">
      <h3 className="sim-section-title">{t('sim.setup')}</h3>
      <label className="field">
        {t('sim.system')}
        <select value={system} onChange={(e) => setSystem(e.target.value as SystemId)}>
          {SYSTEMS.map((s) => (
            <option key={s.id} value={s.id}>
              {t(`sys.${s.id}.name`)}
            </option>
          ))}
        </select>
      </label>
      <details className="sim-seats-fold">
        <summary>{t('sim.seatsFold')}</summary>
        <div className="sim-seats-fold-body">
          <label className="field">
            {t('sim.seats')}: {totalSeats}
            <input
              type="range"
              min={50}
              max={300}
              value={totalSeats}
              onChange={(e) => setTotalSeats(Number(e.target.value))}
            />
          </label>
          {showDistrictSeats && (
            <label className="field">
              {t('sim.districtSeats')}: {Math.min(districtSeats, totalSeats, OEVK_COUNT)}
              <input
                type="range"
                min={20}
                max={Math.min(OEVK_COUNT, totalSeats)}
                value={Math.min(districtSeats, totalSeats, OEVK_COUNT)}
                onChange={(e) => setDistrictSeats(Number(e.target.value))}
              />
            </label>
          )}
        </div>
      </details>
      {showDistrictSeats && (
        <>
          <label className="field">
            {t('sim.districtMethod')}
            <select
              value={districtMethod}
              onChange={(e) => setDistrictMethod(e.target.value as DistrictMethod)}
            >
              {DISTRICT_METHODS.map((m) => (
                <option key={m} value={m}>
                  {t(`sim.districtMethod.${m}`)}
                </option>
              ))}
            </select>
          </label>
          <p className="muted sim-method-note">{t(`sim.districtMethod.${districtMethod}.note`)}</p>
        </>
      )}
      {meta && (
        <p className="muted sim-system-link">
          <Link to={`/systems/${system}`}>{t(`sys.${system}.name`)}</Link>
        </p>
      )}
    </section>
  )

  const partiesBlock = (
    <section className="sim-section">
      <PartyEditor
        parties={parties}
        onChange={setParties}
        onReset={() => setParties(getDefaultParties(locale))}
      />
    </section>
  )

  const mapBlock = (
    <HungaryMap
      regions={regions}
      districts={districts}
      leaders={result.regionLeaders}
      regionShares={result.regionShares}
      districtShares={result.districtShares}
      districtWinners={result.districtWinners}
      parties={parties}
    />
  )

  const resultsBlock = (
    <div className="results-panel">
      <h3>{t('sim.results')}</h3>
      <SeatChart parties={parties} seats={result.seats} />
      <p>
        <strong>{t('sim.disprop')}:</strong> {(disprop * 100).toFixed(1)}%
      </p>
      <p>
        <strong>{t('sim.readout')}:</strong> {readout}
      </p>
      {result.districtWinners.length > 0 && (
        <details>
          <summary>
            {t('sim.districts')} ({result.districtWinners.length})
          </summary>
          <ul className="district-list">
            {result.districtWinners.slice(0, 40).map((w) => {
              const p = parties.find((x) => x.id === w.partyId)
              return (
                <li key={w.districtId}>
                  {w.districtId}: {p?.fruit} {p?.name ?? w.partyId}
                </li>
              )
            })}
          </ul>
        </details>
      )}
      {result.openListOrder && (
        <details>
          <summary>{t('sim.openList')}</summary>
          <ul>
            {parties.map((p) => (
              <li key={p.id}>
                {p.fruit} {p.name}: {(result.openListOrder?.[p.id] ?? []).slice(0, 5).join(', ')}
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  )

  const geoBlock = (
    <div className="sim-section sim-geo-body">
      <GeographyEditor
        baselines={baselines}
        polarization={polarization}
        onBaselinesChange={setBaselines}
        onPolarizationChange={setPolarization}
        onReset={() => {
          setBaselines(getDefaultDietBaselines())
          setPolarization(0.7)
        }}
      />
    </div>
  )

  if (compact) {
    return (
      <div className="page simulate-page is-compact-page">
        <header className="page-head">
          <h1>{t('sim.title')}</h1>
        </header>
        <div className="compact-live-chip" aria-live="polite">
          <span>{t(`sys.${system}.name`)}</span>
          <span>
            {topParty
              ? `${topParty.fruit} ${topSeat?.seats ?? 0} ${t('sim.seatPct')}`
              : t('sim.results')}
          </span>
        </div>
        <PanelTabs
          ariaLabel={t('compact.sim.tabs')}
          value={tab}
          onChange={setTab}
          tabs={[
            { id: 'parties', label: t('compact.sim.parties') },
            { id: 'map', label: t('compact.sim.map') },
            { id: 'results', label: t('compact.sim.results') },
            { id: 'geo', label: t('compact.sim.geo'), narrow: true },
          ]}
        />
        <div className="compact-panel">
          {tab === 'parties' && (
            <>
              {setupBlock}
              {partiesBlock}
            </>
          )}
          {tab === 'map' && mapBlock}
          {tab === 'results' && resultsBlock}
          {tab === 'geo' && geoBlock}
        </div>
      </div>
    )
  }

  return (
    <div className="page simulate-page">
      <header className="page-head">
        <h1>{t('sim.title')}</h1>
        <aside className="info-panel" role="note">
          <p>{t('sim.intro')}</p>
        </aside>
      </header>

      <div className={`sim-layout ${geoOpen ? 'geo-open' : 'geo-collapsed'}`}>
        <aside className="sim-controls">
          {setupBlock}
          {partiesBlock}
        </aside>

        <section className="sim-main">
          {mapBlock}
          {resultsBlock}
        </section>

        <aside className={`sim-geo ${geoOpen ? 'is-open' : 'is-collapsed'}`}>
          <button
            type="button"
            className="sim-geo-toggle"
            aria-expanded={geoOpen}
            onClick={() => setGeoOpen((o) => !o)}
          >
            <span>{geoOpen ? t('sim.geographyOpen') : t('sim.geographyClosed')}</span>
            <span className="sim-geo-chevron" aria-hidden>
              {geoOpen ? '▾' : '▸'}
            </span>
          </button>
          {geoOpen && geoBlock}
        </aside>
      </div>
    </div>
  )
}
