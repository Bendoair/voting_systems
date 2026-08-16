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

function campVotePctFromParties(parties: Party[]) {
  const meat = parties
    .filter((p) => (p.dietLean ?? 0) < 0)
    .reduce((a, p) => a + p.popularity, 0)
  const plant = parties
    .filter((p) => (p.dietLean ?? 0) > 0)
    .reduce((a, p) => a + p.popularity, 0)
  return { meatVotePct: meat, plantVotePct: plant }
}

/** Meat-camp vs plant-camp vote preference vs seat outcome. */
export function CasePreferenceBar({
  parties,
  result,
  className,
  revealed = true,
  votesOnly = false,
  compact = false,
}: {
  parties: Party[]
  result?: ElectionResult
  className?: string
  /** When false, mounts hidden until tour reveals the ladder */
  revealed?: boolean
  /** Tour beat: camp vote share only (no seats row) */
  votesOnly?: boolean
  /** Slim embed: no title / note */
  compact?: boolean
}) {
  const { t } = useI18n()
  const fromResult = result ? campTotals(parties, result) : null
  const fromParties = campVotePctFromParties(parties)
  const meatVotePct = fromResult ? fromResult.meatVotes * 100 : fromParties.meatVotePct
  const plantVotePct = fromResult ? fromResult.plantVotes * 100 : fromParties.plantVotePct
  const meatSeatPct =
    fromResult && fromResult.totalSeats > 0
      ? (fromResult.meatSeats / fromResult.totalSeats) * 100
      : 0
  const plantSeatPct =
    fromResult && fromResult.totalSeats > 0
      ? (fromResult.plantSeats / fromResult.totalSeats) * 100
      : 0

  return (
    <div
      className={`case-pref ${revealed ? 'is-revealed' : 'is-hidden'} ${compact ? 'is-compact' : ''} ${className ?? ''}`}
      aria-hidden={!revealed}
    >
      {!compact && (
        <>
          <h3>{t('case.pref.title')}</h3>
          {!votesOnly && <p className="case-pref-note muted">{t('case.pref.note')}</p>}
        </>
      )}
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
      {!votesOnly && (
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
      )}
      <p className="case-pref-legend muted">
        <span className="case-pref-swatch is-meat" /> {t('sim.diet.meat')}
        {' · '}
        <span className="case-pref-swatch is-plant" /> {t('sim.diet.plant')}
      </p>
    </div>
  )
}
