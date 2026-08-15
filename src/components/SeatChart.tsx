import type { Party } from '../engines/types'
import type { SeatResult } from '../engines/types'
import { useI18n } from '../i18n'

export function SeatChart({
  parties,
  seats,
  highlightPartyId,
  highlightLabel,
}: {
  parties: Party[]
  seats: SeatResult[]
  highlightPartyId?: string
  highlightLabel?: string
}) {
  const { t } = useI18n()
  const total = seats.reduce((a, s) => a + s.seats, 0) || 1

  return (
    <div className="seat-chart">
      <div className="seat-bar" role="img" aria-label={t('sim.results')}>
        {seats.map((s) => {
          const p = parties.find((x) => x.id === s.partyId)
          if (!p || s.seats <= 0) return null
          return (
            <div
              key={s.partyId}
              className="seat-seg"
              style={{
                width: `${(s.seats / total) * 100}%`,
                background: p.color,
              }}
              title={`${p.name}: ${s.seats}`}
            />
          )
        })}
      </div>
      <ul className="seat-legend">
        {seats.map((s) => {
          const p = parties.find((x) => x.id === s.partyId)
          if (!p) return null
          const isYou = highlightPartyId != null && p.id === highlightPartyId
          return (
            <li key={s.partyId} className={isYou ? 'is-you' : undefined}>
              <span className="dot" style={{ background: p.color }} />
              <span>
                {p.fruit} {p.name}
                {isYou && highlightLabel ? (
                  <>
                    {' '}
                    <strong className="seat-you-tag">{highlightLabel}</strong>
                  </>
                ) : null}
              </span>
              <span className="nums">
                {s.seats} · {(s.voteShare * 100).toFixed(1)}% {t('sim.votes')} ·{' '}
                {(s.seatShare * 100).toFixed(1)}% {t('sim.seatPct')}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
