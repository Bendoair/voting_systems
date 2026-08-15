import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { CaseDietGeoMap } from '../components/CaseDietGeoMap'
import { CaseDietLegend } from '../components/CaseDietLegend'
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
import { useI18n } from '../i18n'

function CaseBlock({
  scenarioId,
  titleKey,
  bodyKey,
  highlightKey,
  dietHighlightKey,
  districtView,
}: {
  scenarioId: CaseScenarioId
  titleKey: string
  bodyKey: string
  highlightKey?: string
  dietHighlightKey?: string
  districtView: boolean
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
    <section className="case-block">
      <div className="case-map">
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
      <div className="case-summary">
        <h2>{t(titleKey)}</h2>
        <p>{t(bodyKey)}</p>
        {highlight && <p className="case-callout">{highlight}</p>}
        {dietHighlight && <p className="case-callout case-callout-diet">{dietHighlight}</p>}
        <CasePreferenceBar parties={parties} result={result} />
        <h3>{t('case.results')}</h3>
        <SeatChart parties={parties} seats={result.seats} />
      </div>
    </section>
  )
}

export function CaseStudy() {
  const { t, locale } = useI18n()
  const parties = useMemo(() => getCaseStudyParties(locale), [locale])
  const regions = useMemo(() => getCaseStudyRegions(), [])

  return (
    <div className="page case-page">
      <header className="page-head">
        <h1>{t('case.title')}</h1>
        <p>{t('case.intro')}</p>
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
        <Link className="btn primary" to="/simulate">
          {t('case.cta.simulate')}
        </Link>
        <Link className="btn" to="/systems">
          {t('case.cta.systems')}
        </Link>
      </div>
    </div>
  )
}
