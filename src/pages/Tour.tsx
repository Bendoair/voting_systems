import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Compass } from '../components/Compass'
import {
  TOUR_PARTIES,
  TOUR_VOTERS,
  EMMA_TACTICAL,
  EMMA_TRUE,
  HUGE_DIMS,
} from '../data/tourScenario'
import { useI18n } from '../i18n'

const STEPS = 7
const STEP_MS = 200

/**
 * Delay before entering each stage of the step 2 reel.
 * Stage 0 = the two base axes, 1…12 = one extra axis each, 13 = dimension explosion.
 */
const DIM_STAGE_MS = [0, 5000, 2600, 2600, 1400, 1000, 720, 520, 380, 280, 210, 160, 120, 900]
const DIM_EXPLODE = DIM_STAGE_MS.length - 1

const EXPLORE_LINKS = [
  { to: '/case-study', labelKey: 'tour.explore.case', blurbKey: 'tour.explore.caseBlurb' },
  { to: '/systems', labelKey: 'tour.explore.systems', blurbKey: 'tour.explore.systemsBlurb' },
  { to: '/games', labelKey: 'tour.explore.games', blurbKey: 'tour.explore.gamesBlurb' },
  { to: '/simulate', labelKey: 'tour.explore.sim', blurbKey: 'tour.explore.simBlurb' },
] as const

/** Step 2: axes pile up on their own, ending in the dimension explosion. */
function DimensionReel() {
  const { t } = useI18n()
  const [stage, setStage] = useState(0)
  const [runId, setRunId] = useState(0)

  useEffect(() => {
    setStage(0)
    let next = 1
    let timer = 0
    const tick = () => {
      setStage(next)
      next += 1
      if (next <= DIM_EXPLODE) timer = window.setTimeout(tick, DIM_STAGE_MS[next]!)
    }
    timer = window.setTimeout(tick, runId === 0 ? DIM_STAGE_MS[1]! : 0)
    return () => window.clearTimeout(timer)
  }, [runId])

  const axisLabels = useMemo(
    () => [
      { neg: t('tour.s2.ax3Neg'), pos: t('tour.s2.ax3Pos') },
      { neg: t('tour.s2.ax4Neg'), pos: t('tour.s2.ax4Pos'), ghost: true },
    ],
    [t],
  )

  const exploded = stage >= DIM_EXPLODE
  const captionKey = exploded
    ? 'capAll'
    : stage === 0
      ? 'cap2'
      : stage === 1
        ? 'cap3'
        : stage === 2
          ? 'cap4'
          : 'capMore'

  return (
    <>
      <div className="compass-controls">
        <button
          type="button"
          className="btn ghost"
          onClick={() => setRunId((r) => r + 1)}
        >
          {t('tour.s2.replay')}
        </button>
      </div>
      <Compass
        extraAxes={exploded ? 0 : stage}
        extraAxisLabels={axisLabels}
        explode={exploded}
        dimCountLabel={
          exploded ? t('tour.s2.dims').replace('{n}', HUGE_DIMS) : undefined
        }
        caption={t(`tour.s2.${captionKey}`)}
      />
    </>
  )
}

export function Tour() {
  const { t } = useI18n()
  const [step, setStep] = useState(1)
  const [exiting, setExiting] = useState(false)
  const [you, setYou] = useState<{ x: number; y: number } | null>(null)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  function goTo(next: number) {
    if (next < 1 || next > STEPS || next === step || exiting) return
    setExiting(true)
    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      setStep(next)
      setExiting(false)
    }, STEP_MS)
  }

  const emmaOverrides = { emma: EMMA_TACTICAL }
  const fruitParty = TOUR_PARTIES.find((p) => p.id === EMMA_TRUE)!
  const vegParty = TOUR_PARTIES.find((p) => p.id === EMMA_TACTICAL)!

  return (
    <div className="page tour-page">
      <header className="page-head">
        <h1>{t('tour.title')}</h1>
        <p className="step-meta">
          {t('tour.step')} {step} {t('tour.of')} {STEPS}
        </p>
      </header>

      <div className={`tour-body ${exiting ? 'is-exiting' : 'is-entering'}`}>
        <section className="tour-step" key={step}>
          {step === 1 && (
            <>
              <h2>{t('tour.s1.title')}</h2>
              <p>{t('tour.s1.body')}</p>
            </>
          )}

          {step === 2 && (
            <>
              <h2>{t('tour.s2.title')}</h2>
              <p>{t('tour.s2.body')}</p>
              <DimensionReel />
            </>
          )}

          {step === 3 && (
            <>
              <h2>{t('tour.s3.title')}</h2>
              <p>{t('tour.s3.body')}</p>
              <Compass you={you} onPlaceYou={(x, y) => setYou({ x, y })} />
            </>
          )}

          {step === 4 && (
            <>
              <h2>{t('tour.s4.title')}</h2>
              <p>{t('tour.s4.body')}</p>
              <Compass parties={TOUR_PARTIES} you={you} showVoronoi />
            </>
          )}

          {step === 5 && (
            <>
              <h2>{t('tour.s5.title')}</h2>
              <p>{t('tour.s5.body')}</p>
              <Compass
                parties={TOUR_PARTIES}
                voters={TOUR_VOTERS}
                crowd
                hoverPrefs
                showVoronoi
                you={you}
              />
            </>
          )}

          {step === 6 && (
            <>
              <h2>{t('tour.s6.title')}</h2>
              <p>{t('tour.s6.body')}</p>
              <Compass
                parties={TOUR_PARTIES}
                voters={TOUR_VOTERS}
                crowd
                hoverPrefs
                showVoronoi
                overrideLinks={emmaOverrides}
                tacticalCallout={{
                  voterId: 'emma',
                  voterName: 'Emma',
                  trueParty: fruitParty,
                  tactParty: vegParty,
                }}
              />
            </>
          )}

          {step === 7 && (
            <>
              <h2>{t('tour.s7.title')}</h2>
              <p>{t('tour.s7.body')}</p>
              <div className="tour-explore">
                {EXPLORE_LINKS.map((item) => {
                  const highlight = item.to === '/case-study'
                  return (
                    <div key={item.to} className="tour-explore-item">
                      <Link
                        className={highlight ? 'btn primary' : 'btn'}
                        to={item.to}
                      >
                        {t(item.labelKey)}
                      </Link>
                      <p>{t(item.blurbKey)}</p>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </section>
      </div>

      <div className="tour-nav">
        <button
          type="button"
          className="btn"
          disabled={step <= 1 || exiting}
          onClick={() => goTo(step - 1)}
        >
          {t('tour.prev')}
        </button>
        <div className="dots" aria-hidden>
          {Array.from({ length: STEPS }, (_, i) => (
            <span key={i} className={i + 1 === step ? 'dot on' : 'dot'} />
          ))}
        </div>
        <button
          type="button"
          className="btn primary"
          disabled={step >= STEPS || exiting}
          onClick={() => goTo(step + 1)}
        >
          {t('tour.next')}
        </button>
      </div>
    </div>
  )
}
