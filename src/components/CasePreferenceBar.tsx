import type { ElectionResult, Party } from '../engines/types'
import { useI18n } from '../i18n'

function campTotals(parties: Party[], result: ElectionResult) {
  const meatIds = new Set(parties.filter((p) => (p.dietLean ?? 0) < 0).map((p) => p.id))
  const plantIds = new Set(parties.filter((p) => (p.dietLean ?? 0) > 0).map((p) => p.id))
  let meatVotes = 0
  let plantVotes = 0
  let meatSeats = 0
  let plantSeats = 0
  let totalSeats = 0
  for (const s of result.seats) {
    totalSeats += s.seats
    if (meatIds.has(s.partyId)) {
      meatVotes += s.voteShare
      meatSeats += s.seats
    } else if (plantIds.has(s.partyId)) {
      plantVotes += s.voteShare
      plantSeats += s.seats
    }
  }
  return { meatVotes, plantVotes, meatSeats, plantSeats, totalSeats }
}

/** Meat-camp vs plant-camp vote preference vs seat outcome. */
export function CasePreferenceBar({
  parties,
  result,
}: {
  parties: Party[]
  result: ElectionResult
}) {
  const { t } = useI18n()
  const { meatVotes, plantVotes, meatSeats, plantSeats, totalSeats } = campTotals(
    parties,
    result,
  )
  const meatSeatPct = totalSeats > 0 ? (meatSeats / totalSeats) * 100 : 0
  const plantSeatPct = totalSeats > 0 ? (plantSeats / totalSeats) * 100 : 0
  const meatVotePct = meatVotes * 100
  const plantVotePct = plantVotes * 100

  return (
    <div className="case-pref">
      <h3>{t('case.pref.title')}</h3>
      <p className="case-pref-note muted">{t('case.pref.note')}</p>
      <div className="case-pref-row">
        <span className="case-pref-label">{t('case.pref.votes')}</span>
        <div className="case-pref-bar" aria-hidden>
          <span className="is-meat" style={{ width: `${meatVotePct}%` }} />
          <span className="is-plant" style={{ width: `${plantVotePct}%` }} />
        </div>
        <span className="case-pref-nums">
          {meatVotePct.toFixed(0)}% · {plantVotePct.toFixed(0)}%
        </span>
      </div>
      <div className="case-pref-row">
        <span className="case-pref-label">{t('case.pref.seats')}</span>
        <div className="case-pref-bar" aria-hidden>
          <span className="is-meat" style={{ width: `${meatSeatPct}%` }} />
          <span className="is-plant" style={{ width: `${plantSeatPct}%` }} />
        </div>
        <span className="case-pref-nums">
          {meatSeatPct.toFixed(0)}% · {plantSeatPct.toFixed(0)}%
        </span>
      </div>
      <p className="case-pref-legend muted">
        <span className="case-pref-swatch is-meat" /> {t('sim.diet.meat')}
        {' · '}
        <span className="case-pref-swatch is-plant" /> {t('sim.diet.plant')}
      </p>
    </div>
  )
}
