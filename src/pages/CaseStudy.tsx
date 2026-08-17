import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CaseDietGeoMap } from '../components/CaseDietGeoMap'
import {
  CaseDietLegend,
  type DietCampHighlight,
} from '../components/CaseDietLegend'
import { CasePreferenceBar } from '../components/CasePreferenceBar'
import { HungaryMap } from '../components/HungaryMap'
import { SeatChart } from '../components/SeatChart'
import { OEVK_DISTRICTS } from '../data/oevkDistricts'
import {
  dietCampHighlight,
  getCaseStudyParties,
  getCaseStudyRegions,
  runCaseScenario,
  seatHighlight,
  type CaseScenarioId,
} from '../data/caseStudy'
import type { Party } from '../engines/types'
import { useCompactLayout } from '../hooks/useCompactLayout'
import { useOwnBottomNav } from '../hooks/useCompactChrome'
import { useI18n } from '../i18n'
import { PanelTabs } from '../components/PanelTabs'
import { SegmentDots } from '../components/SegmentDots'

const TOUR_SEEN_KEY = 'vs-case-tour-seen'
const TOUR_STEPS = 5
const STEP_MS = 200
/** Step 1 staged beats after enter: plant highlight, then ladder (meat starts immediately) */
const S1_PLANT_MS = 3200
const S1_LADDER_MS = 6400

type CaseMode = 'tour' | 'page'

function readTourSeen(): boolean {
  try {
    return sessionStorage.getItem(TOUR_SEEN_KEY) === '1'
  } catch {
    return false
  }
}

function markTourSeen() {
  try {
    sessionStorage.setItem(TOUR_SEEN_KEY, '1')
  } catch {
    /* ignore quota / private mode */
  }
}

function CaseBlock({
  scenarioId,
  titleKey,
  bodyKey,
  highlightKey,
  dietHighlightKey,
  districtView,
  hideBody = false,
  tourFocus = null,
  tourFocusNonce = 0,
  compactPane = 'full',
}: {
  scenarioId: CaseScenarioId
  titleKey: string
  bodyKey?: string
  highlightKey?: string
  dietHighlightKey?: string
  districtView: boolean
  hideBody?: boolean
  /** Tour attention pulse on a panel region */
  tourFocus?: 'pref' | 'seats' | 'map' | null
  /** Bumps to retrigger the focus animation on the same target */
  tourFocusNonce?: number
  /** Compact: show map only, summary only, or both */
  compactPane?: 'full' | 'map' | 'summary'
}) {
  const { t, locale } = useI18n()
  const { parties, regions, result } = useMemo(
    () => runCaseScenario(scenarioId, locale),
    [scenarioId, locale],
  )

  const apple = seatHighlight(result, 'apple')
  const camps = dietCampHighlight(result, parties)
  const highlight =
    highlightKey &&
    t(highlightKey)
      .replace('{votes}', apple.votes.toFixed(0))
      .replace('{seatPct}', apple.seatPct.toFixed(0))
      .replace('{seats}', String(apple.seats))
  const dietHighlight =
    dietHighlightKey &&
    t(dietHighlightKey)
      .replace('{meatVotes}', camps.meatVotes.toFixed(0))
      .replace('{plantVotes}', camps.plantVotes.toFixed(0))
      .replace('{meatSeats}', String(camps.meatSeats))
      .replace('{plantSeats}', String(camps.plantSeats))
      .replace('{meatSeatPct}', camps.meatSeatPct.toFixed(0))
      .replace('{plantSeatPct}', camps.plantSeatPct.toFixed(0))

  return (
    <section className={`case-block ${compactPane !== 'full' ? `pane-${compactPane}` : ''}`}>
      {compactPane !== 'summary' && (
      <div
        key={tourFocus === 'map' ? `map-${tourFocusNonce}` : 'map'}
        className={`case-map ${tourFocus === 'map' ? 'is-tour-focus' : ''}`}
      >
        <HungaryMap
          regions={regions}
          districts={OEVK_DISTRICTS}
          leaders={result.regionLeaders}
          regionShares={result.regionShares}
          districtShares={result.districtShares}
          districtWinners={result.districtWinners}
          parties={parties}
          initialDistrictView={districtView}
          lockDistrictView
          hideMapNote
        />
      </div>
      )}
      {compactPane !== 'map' && (
      <div className="case-summary">
        <h2>{t(titleKey)}</h2>
        {!hideBody && bodyKey && <p>{t(bodyKey)}</p>}
        {highlight && <p className="case-callout">{highlight}</p>}
        {dietHighlight && <p className="case-callout case-callout-diet">{dietHighlight}</p>}
        <div
          key={tourFocus === 'pref' ? `pref-${tourFocusNonce}` : 'pref'}
          className={tourFocus === 'pref' ? 'is-tour-focus is-tour-focus-pref' : undefined}
        >
          <CasePreferenceBar parties={parties} result={result} />
        </div>
        <div
          key={tourFocus === 'seats' ? `seats-${tourFocusNonce}` : 'seats'}
          className={`case-seats-block ${tourFocus === 'seats' ? 'is-tour-focus' : ''}`}
        >
          <h3>{t('case.results')}</h3>
          <SeatChart parties={parties} seats={result.seats} />
        </div>
      </div>
      )}
    </section>
  )
}

const TOUR_SYSTEMS: {
  step: number
  captionKey: string
  /** Optional second caption after a focus beat */
  captionKeyB?: string
  scenarioId: CaseScenarioId
  titleKey: string
  districtView: boolean
  highlightKey?: string
  dietHighlightKey?: string
  /** Initial / only tour focus */
  tourFocus?: 'pref' | 'seats' | 'map'
  /** Later focus beat (e.g. seats → map) */
  tourFocusB?: 'pref' | 'seats' | 'map'
}[] = [
  {
    step: 2,
    captionKey: 'case.tour.s2.body',
    scenarioId: 'list',
    titleKey: 'case.list.title',
    districtView: false,
  },
  {
    step: 3,
    captionKey: 'case.tour.s3.body',
    scenarioId: 'fptp',
    titleKey: 'case.fptp.title',
    districtView: true,
    highlightKey: 'case.fptp.highlight',
    dietHighlightKey: 'case.fptp.diet',
  },
  {
    step: 4,
    captionKey: 'case.tour.s4.a',
    captionKeyB: 'case.tour.s4.b',
    scenarioId: 'ranked',
    titleKey: 'case.ranked.title',
    districtView: true,
    dietHighlightKey: 'case.ranked.diet',
    tourFocus: 'pref',
  },
  {
    step: 5,
    captionKey: 'case.tour.s5.a',
    captionKeyB: 'case.tour.s5.b',
    scenarioId: 'two-round',
    titleKey: 'case.twoRound.title',
    districtView: true,
    dietHighlightKey: 'case.twoRound.diet',
    tourFocus: 'seats',
  },
]

/** Delay before the second caption / focus beat on steps 4–5 */
const FOCUS_B_MS = 3800

function ModeToggle({
  mode,
  onTour,
  onPage,
}: {
  mode: CaseMode
  onTour: () => void
  onPage: () => void
}) {
  const { t } = useI18n()
  return (
    <div className="case-mode-toggle" role="group" aria-label={t('case.tour.modeGroup')}>
      <button
        type="button"
        className={`btn ${mode === 'tour' ? 'primary' : 'ghost'}`}
        onClick={onTour}
        aria-pressed={mode === 'tour'}
      >
        {t('case.tour.modeTour')}
      </button>
      <button
        type="button"
        className={`btn ${mode === 'page' ? 'primary' : 'ghost'}`}
        onClick={onPage}
        aria-pressed={mode === 'page'}
      >
        {t('case.tour.modePage')}
      </button>
    </div>
  )
}

function CaseStudyTour({
  parties,
  onDone,
  onPage,
}: {
  parties: Party[]
  onDone: () => void
  onPage: () => void
}) {
  const { t } = useI18n()
  const compact = useCompactLayout()
  useOwnBottomNav(true)
  const [step, setStep] = useState(1)
  const [exiting, setExiting] = useState(false)
  const [s1Stage, setS1Stage] = useState(0)
  const [focusBeat, setFocusBeat] = useState(0)
  const timerRef = useRef<number | null>(null)
  const s1Timers = useRef<number[]>([])
  const focusTimer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
      if (focusTimer.current) window.clearTimeout(focusTimer.current)
      for (const id of s1Timers.current) window.clearTimeout(id)
    }
  }, [])

  useEffect(() => {
    for (const id of s1Timers.current) window.clearTimeout(id)
    s1Timers.current = []
    if (step !== 1) {
      setS1Stage(0)
      return
    }
    setS1Stage(0)
    s1Timers.current.push(window.setTimeout(() => setS1Stage(1), S1_PLANT_MS))
    s1Timers.current.push(window.setTimeout(() => setS1Stage(2), S1_LADDER_MS))
  }, [step])

  useEffect(() => {
    if (focusTimer.current) window.clearTimeout(focusTimer.current)
    setFocusBeat(0)
    const sys = TOUR_SYSTEMS.find((s) => s.step === step)
    if (!sys?.captionKeyB && !sys?.tourFocusB) return
    focusTimer.current = window.setTimeout(() => setFocusBeat(1), FOCUS_B_MS)
    return () => {
      if (focusTimer.current) window.clearTimeout(focusTimer.current)
    }
  }, [step])

  function goTo(next: number) {
    if (next < 1 || next > TOUR_STEPS || next === step || exiting) return
    setExiting(true)
    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      setStep(next)
      setExiting(false)
    }, STEP_MS)
  }

  const dietHighlight: DietCampHighlight =
    step !== 1
      ? 'none'
      : s1Stage === 0
        ? 'meat'
        : s1Stage === 1
          ? 'plant'
          : 'none'

  const caption =
    step === 1
      ? s1Stage === 0
        ? t('case.tour.s1.meat')
        : s1Stage === 1
          ? t('case.tour.s1.plant')
          : t('case.tour.s1.ladder')
      : (() => {
          const sys = TOUR_SYSTEMS.find((s) => s.step === step)!
          const key =
            focusBeat > 0 && sys.captionKeyB ? sys.captionKeyB : sys.captionKey
          return t(key)
        })()

  const system = TOUR_SYSTEMS.find((s) => s.step === step)
  const activeFocus =
    system == null
      ? null
      : focusBeat > 0 && system.tourFocusB
        ? system.tourFocusB
        : (system.tourFocus ?? null)

  const captionBeatCount = step === 1 ? 3 : system?.captionKeyB ? 2 : 0
  const captionBeatIndex = step === 1 ? s1Stage : focusBeat

  function selectCaptionBeat(i: number) {
    if (step === 1) {
      for (const id of s1Timers.current) window.clearTimeout(id)
      s1Timers.current = []
      setS1Stage(i)
      return
    }
    if (focusTimer.current) window.clearTimeout(focusTimer.current)
    setFocusBeat(i)
  }

  return (
    <div
      className={`page case-page case-page-tour ${compact ? 'is-compact-page owns-page-nav' : ''}`}
    >
      <header className="page-head case-tour-head">
        <div className="case-tour-head-main">
          <h1>{t('case.title')}</h1>
          <p className="step-meta">
            {t('case.tour.step')} {step} {t('case.tour.of')} {TOUR_STEPS}
          </p>
        </div>
        <ModeToggle mode="tour" onTour={() => goTo(1)} onPage={onPage} />
      </header>

      <div className="case-tour-caption" aria-live="polite">
        <p
          key={`${step}-${step === 1 ? s1Stage : focusBeat}`}
          className="case-tour-caption-text"
        >
          {caption}
        </p>
        <SegmentDots
          count={captionBeatCount}
          index={captionBeatIndex}
          onSelect={selectCaptionBeat}
          label={t('segment.dots')}
        />
      </div>

      <div className={`case-tour-body ${exiting ? 'is-exiting' : 'is-entering'}`}>
        {step === 1 && (
          <div className="case-tour-step case-tour-step-diet">
            <CaseDietLegend
              parties={parties}
              highlight={dietHighlight}
              hideBlurb
              preferenceRevealed={s1Stage >= 2}
            />
          </div>
        )}

        {system && (
          <div className="case-tour-step" key={system.scenarioId}>
            <CaseBlock
              scenarioId={system.scenarioId}
              titleKey={system.titleKey}
              districtView={system.districtView}
              highlightKey={system.highlightKey}
              dietHighlightKey={system.dietHighlightKey}
              hideBody
              tourFocus={activeFocus}
              tourFocusNonce={focusBeat}
            />
          </div>
        )}
      </div>

      <div className="case-tour-nav">
        <button
          type="button"
          className="btn"
          disabled={step <= 1 || exiting}
          onClick={() => goTo(step - 1)}
        >
          {t('case.tour.prev')}
        </button>
        <div className="dots" aria-hidden>
          {Array.from({ length: TOUR_STEPS }, (_, i) => (
            <span key={i} className={i + 1 === step ? 'dot on' : 'dot'} />
          ))}
        </div>
        {step >= TOUR_STEPS ? (
          <button type="button" className="btn primary" disabled={exiting} onClick={onDone}>
            {t('case.tour.done')}
          </button>
        ) : (
          <button
            type="button"
            className="btn primary"
            disabled={exiting}
            onClick={() => goTo(step + 1)}
          >
            {t('case.tour.next')}
          </button>
        )}
      </div>
    </div>
  )
}

type CasePageTab = 'diet' | 'list' | 'fptp' | 'ranked' | 'two-round' | 'geo' | 'explore'

function CaseStudyPage({
  parties,
  regions,
  onTour,
}: {
  parties: Party[]
  regions: ReturnType<typeof getCaseStudyRegions>
  onTour: () => void
}) {
  const { t } = useI18n()
  const compact = useCompactLayout()
  const [tab, setTab] = useState<CasePageTab>('diet')
  const [pane, setPane] = useState<'map' | 'summary'>('summary')

  if (compact) {
    return (
      <div className="page case-page is-compact-page">
        <header className="page-head case-page-head">
          <div className="case-tour-head-main">
            <h1>{t('case.title')}</h1>
          </div>
          <ModeToggle mode="page" onTour={onTour} onPage={() => undefined} />
        </header>
        <PanelTabs
          ariaLabel={t('compact.case.tabs')}
          value={tab}
          onChange={setTab}
          tabs={[
            { id: 'diet', label: t('compact.case.diet') },
            { id: 'list', label: t('compact.case.list') },
            { id: 'fptp', label: t('compact.case.fptp') },
            { id: 'ranked', label: t('compact.case.ranked') },
            { id: 'two-round', label: t('compact.case.twoRound') },
            { id: 'geo', label: t('compact.case.geo') },
            { id: 'explore', label: t('compact.case.explore') },
          ]}
        />
        <div className="compact-panel">
          {tab === 'diet' && <CaseDietLegend parties={parties} />}
          {(tab === 'list' ||
            tab === 'fptp' ||
            tab === 'ranked' ||
            tab === 'two-round') && (
            <>
              <PanelTabs
                ariaLabel={t('compact.case.paneTabs')}
                value={pane}
                onChange={setPane}
                tabs={[
                  { id: 'summary', label: t('compact.case.summary') },
                  { id: 'map', label: t('compact.case.map') },
                ]}
              />
              {tab === 'list' && (
                <CaseBlock
                  scenarioId="list"
                  titleKey="case.list.title"
                  bodyKey="case.list.body"
                  districtView={false}
                  compactPane={pane}
                />
              )}
              {tab === 'fptp' && (
                <CaseBlock
                  scenarioId="fptp"
                  titleKey="case.fptp.title"
                  bodyKey="case.fptp.body"
                  highlightKey="case.fptp.highlight"
                  dietHighlightKey="case.fptp.diet"
                  districtView
                  compactPane={pane}
                />
              )}
              {tab === 'ranked' && (
                <CaseBlock
                  scenarioId="ranked"
                  titleKey="case.ranked.title"
                  bodyKey="case.ranked.body"
                  dietHighlightKey="case.ranked.diet"
                  districtView
                  compactPane={pane}
                />
              )}
              {tab === 'two-round' && (
                <CaseBlock
                  scenarioId="two-round"
                  titleKey="case.twoRound.title"
                  bodyKey="case.twoRound.body"
                  dietHighlightKey="case.twoRound.diet"
                  districtView
                  compactPane={pane}
                />
              )}
            </>
          )}
          {tab === 'geo' && (
            <aside className="case-geo-aside">
              <div className="case-geo-copy">
                <h2>{t('case.geo.title')}</h2>
                <p>{t('case.geo.body')}</p>
              </div>
              <CaseDietGeoMap regions={regions} />
            </aside>
          )}
          {tab === 'explore' && (
            <div className="case-footer-cta cta-row">
              <Link className="btn primary" to="/games">
                {t('case.cta.games')}
              </Link>
              <Link className="btn" to="/systems">
                {t('case.cta.systems')}
              </Link>
              <Link className="btn" to="/simulate">
                {t('case.cta.simulate')}
              </Link>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="page case-page">
      <header className="page-head case-page-head">
        <div className="case-tour-head-main">
          <h1>{t('case.title')}</h1>
          <p>{t('case.intro')}</p>
        </div>
        <ModeToggle mode="page" onTour={onTour} onPage={() => undefined} />
      </header>

      <CaseDietLegend parties={parties} />

      <CaseBlock
        scenarioId="list"
        titleKey="case.list.title"
        bodyKey="case.list.body"
        districtView={false}
      />

      <aside className="case-bridge">
        <h2>{t('case.bridge.title')}</h2>
        <p>{t('case.bridge.body')}</p>
      </aside>

      <CaseBlock
        scenarioId="fptp"
        titleKey="case.fptp.title"
        bodyKey="case.fptp.body"
        highlightKey="case.fptp.highlight"
        dietHighlightKey="case.fptp.diet"
        districtView
      />

      <CaseBlock
        scenarioId="ranked"
        titleKey="case.ranked.title"
        bodyKey="case.ranked.body"
        dietHighlightKey="case.ranked.diet"
        districtView
      />

      <CaseBlock
        scenarioId="two-round"
        titleKey="case.twoRound.title"
        bodyKey="case.twoRound.body"
        dietHighlightKey="case.twoRound.diet"
        districtView
      />

      <aside className="case-geo-aside">
        <div className="case-geo-copy">
          <h2>{t('case.geo.title')}</h2>
          <p>{t('case.geo.body')}</p>
        </div>
        <CaseDietGeoMap regions={regions} />
      </aside>

      <div className="case-footer-cta cta-row">
        <Link className="btn primary" to="/games">
          {t('case.cta.games')}
        </Link>
        <Link className="btn" to="/systems">
          {t('case.cta.systems')}
        </Link>
        <Link className="btn" to="/simulate">
          {t('case.cta.simulate')}
        </Link>
      </div>
    </div>
  )
}

export function CaseStudy() {
  const { locale } = useI18n()
  const parties = useMemo(() => getCaseStudyParties(locale), [locale])
  const regions = useMemo(() => getCaseStudyRegions(), [])
  const [mode, setMode] = useState<CaseMode>(() => (readTourSeen() ? 'page' : 'tour'))

  function goPage() {
    markTourSeen()
    setMode('page')
  }

  function goTour() {
    setMode('tour')
  }

  if (mode === 'tour') {
    return <CaseStudyTour parties={parties} onDone={goPage} onPage={goPage} />
  }

  return <CaseStudyPage parties={parties} regions={regions} onTour={goTour} />
}
