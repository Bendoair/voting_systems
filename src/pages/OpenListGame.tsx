import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CompactFlavorChrome } from '../components/CompactFlavorChrome'
import { FullscreenEffect, type EffectKind } from '../components/ConfettiBurst'
import { PanelTabs } from '../components/PanelTabs'
import { PoliticianPortrait } from '../components/PoliticianPortrait'
import {
  applyWeek,
  dealRng,
  generateOpenListDeal,
  jitterElection,
  relabelOpenListDeal,
  relabelParties,
} from '../exercises/openlist/generate'
import { closedListWouldWin, isElected, seatAlloc, snapshot } from '../exercises/openlist/score'
import type {
  CampaignAction,
  ListCandidate,
  OpenListDeal,
  OpenListParty,
  OpenListPhase,
  WeekEvent,
} from '../exercises/openlist/types'
import { useCompactLayout } from '../hooks/useCompactLayout'
import { useEntryHint } from '../hooks/useEntryHint'
import { useI18n } from '../i18n'

type CampaignTab = 'you' | 'campaign'

const ACTIONS: CampaignAction[] = ['party', 'balanced', 'own']
const ROW_H = '2.7rem'
const CLIP_ROWS = 3

function CaptionMark({ kind }: { kind: 'surge' | 'fizzle' }) {
  if (kind === 'surge') {
    return (
      <svg className="olist-caption-mark is-surge" viewBox="0 0 16 16" aria-hidden>
        <path
          fill="currentColor"
          d="M9.3 1 3.4 9.15h4.2L6.1 15l6.7-8.7H8.7L9.3 1Z"
        />
      </svg>
    )
  }
  return (
    <svg className="olist-caption-mark is-fizzle" viewBox="0 0 16 16" aria-hidden>
      <path
        fill="currentColor"
        d="M8 1.4S3.4 7.2 3.4 10.3a4.6 4.6 0 0 0 9.2 0C12.6 7.2 8 1.4 8 1.4Z"
      />
    </svg>
  )
}

function fill(template: string, vars: Record<string, string | number>): string {
  return Object.entries(vars).reduce(
    (acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)),
    template,
  )
}

function NewDealIcon() {
  return (
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
  )
}

function PartyBars({
  parties,
  playerPartyId,
  seats,
  scramble,
  compact,
  scaleMax,
}: {
  parties: OpenListParty[]
  playerPartyId: string
  seats: Record<string, number>
  scramble?: boolean
  compact?: boolean
  scaleMax?: number
}) {
  const maxShare = scaleMax ?? Math.max(28, ...parties.map((p) => p.share))
  return (
    <div className={`olist-bars ${compact ? 'is-short' : ''} ${scramble ? 'is-scramble' : ''}`}>
      {parties.map((p) => {
        const yours = p.id === playerPartyId
        const h = Math.max(4, (p.share / maxShare) * 100)
        return (
          <div
            key={p.id}
            className={`olist-bar-col ${yours ? 'is-you' : ''}`}
            style={{ ['--party' as string]: p.color }}
          >
            <div className="olist-bar-nums">
              <strong>{p.share.toFixed(1)}%</strong>
              <span>{seats[p.id] ?? 0}</span>
            </div>
            <div className="olist-bar-track">
              <div
                className="olist-bar-fill"
                style={{ height: `${h}%`, background: p.color }}
              />
            </div>
            <span className="olist-bar-fruit" aria-hidden>
              {p.fruit}
            </span>
            <span className="olist-bar-name">{p.name}</span>
          </div>
        )
      })}
    </div>
  )
}

function ListRow({
  candidate,
  rank,
  playerId,
  playerSeats,
  partyColor,
  youLabel,
  inLabel,
  outLabel,
  placed,
}: {
  candidate: ListCandidate
  rank: number
  playerId: string
  playerSeats: number
  partyColor: string
  youLabel: string
  inLabel: string
  outLabel: string
  placed?: boolean
}) {
  const inn = playerSeats > 0 && rank <= playerSeats
  const cutoff = inn && rank === playerSeats
  const you = candidate.id === playerId
  return (
    <li
      className={[
        'olist-row',
        inn ? 'is-in' : 'is-out',
        you ? 'is-you' : '',
        cutoff ? 'is-cutoff' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        ...(placed ? { top: `calc(${rank - 1} * var(--row-h))` } : {}),
        ['--party' as string]: partyColor,
      }}
    >
      <span className="olist-row-rank">{rank}</span>
      <span className="olist-row-name">
        {candidate.name}
        {you ? ` · ${youLabel}` : ''}
      </span>
      <span className="olist-row-tag">{inn ? inLabel : outLabel}</span>
    </li>
  )
}

function ListBoard({
  list,
  playerId,
  playerSeats,
  partyColor,
  youLabel,
  inLabel,
  outLabel,
  clipAround,
  clipHeight,
}: {
  list: ListCandidate[]
  playerId: string
  playerSeats: number
  partyColor: string
  youLabel: string
  inLabel: string
  outLabel: string
  clipAround?: boolean
  clipHeight?: number | null
}) {
  const rankById = useMemo(() => {
    const ordered = [...list].sort((a, b) => b.personal - a.personal || a.id.localeCompare(b.id))
    return Object.fromEntries(ordered.map((c, i) => [c.id, i])) as Record<string, number>
  }, [list])
  const playerIndex = rankById[playerId] ?? 0
  const clipRef = useRef<HTMLDivElement>(null)
  const [clipEdge, setClipEdge] = useState<{ top: boolean; bottom: boolean }>({
    top: false,
    bottom: false,
  })

  useLayoutEffect(() => {
    if (!clipAround) return
    const el = clipRef.current
    if (!el) return
    const apply = () => {
      const clipH = el.getBoundingClientRect().height
      const listH = el.querySelector('.olist-rows')?.getBoundingClientRect().height ?? 0
      if (clipH <= 0 || listH <= 0) return
      const rowPx = listH / Math.max(1, list.length)
      const center = (clipH - rowPx) / 2 - playerIndex * rowPx
      const min = clipH - listH
      setClipEdge({
        top: center >= -0.5,
        bottom: center <= min + 0.5,
      })
    }
    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(el)
    return () => ro.disconnect()
  }, [clipAround, clipHeight, playerIndex, list.length])

  const rows = (
    <ol
      className={`olist-rows${clipAround ? ' is-clip-shift' : ''}`}
      style={{
        ['--rows' as string]: list.length,
        ['--row-h' as string]: ROW_H,
        ['--player-index' as string]: playerIndex,
      }}
    >
      {list.map((c) => (
        <ListRow
          key={c.id}
          candidate={c}
          rank={(rankById[c.id] ?? 0) + 1}
          playerId={playerId}
          playerSeats={playerSeats}
          partyColor={partyColor}
          youLabel={youLabel}
          inLabel={inLabel}
          outLabel={outLabel}
          placed
        />
      ))}
    </ol>
  )

  if (!clipAround) return rows
  return (
    <div
      ref={clipRef}
      className={[
        'olist-clip',
        clipEdge.top ? 'is-edge-top' : '',
        clipEdge.bottom ? 'is-edge-bottom' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        ['--row-h' as string]: ROW_H,
        ['--clip-rows' as string]: CLIP_ROWS,
        ['--player-index' as string]: playerIndex,
        ...(clipHeight && clipHeight > 0 ? { ['--clip-h' as string]: `${clipHeight}px` } : {}),
      }}
    >
      {rows}
    </div>
  )
}

const NIGHT_COUNT_MS = 380

/** Count-in shapes: climb, dip, overshoot, settle. Last step is always 1. */
const NIGHT_ENVELOPES = [
  [0.06, 0.3, 0.22, 0.52, 0.58, 0.44, 0.82, 0.7, 1.12, 0.9, 0.85, 1],
  [0.1, 0.18, 0.4, 0.32, 0.64, 0.72, 0.54, 0.9, 0.78, 1.1, 0.93, 1],
  [0.04, 0.38, 0.44, 0.26, 0.5, 0.74, 0.62, 0.96, 1.14, 0.84, 0.94, 1],
  [0.08, 0.22, 0.36, 0.56, 0.4, 0.68, 0.88, 1.08, 0.8, 0.97, 0.88, 1],
  [0.12, 0.28, 0.2, 0.46, 0.7, 0.58, 0.76, 0.68, 1.06, 1.16, 0.91, 1],
]

function approachNightFrames(parties: OpenListParty[]): OpenListParty[][] {
  const steps = NIGHT_ENVELOPES[0]!.length
  const tracks = parties.map((p) => {
    const env = NIGHT_ENVELOPES[Math.floor(Math.random() * NIGHT_ENVELOPES.length)]!
    const lag = Math.floor(Math.random() * 3)
    const amp = 0.9 + Math.random() * 0.22
    return { env, lag, amp, final: p.share }
  })
  return Array.from({ length: steps }, (_, i) => {
    const last = i === steps - 1
    return parties.map((p, j) => {
      if (last) return p
      const tr = tracks[j]!
      const ei = Math.max(0, i - tr.lag)
      const e = tr.env[ei] ?? 1
      return {
        ...p,
        share: Math.max(0.3, Math.round(tr.final * e * tr.amp * 10) / 10),
      }
    })
  })
}

export function OpenListGame() {
  const { t, locale } = useI18n()
  const compact = useCompactLayout()
  const rulesHint = useEntryHint()
  const [deal, setDeal] = useState<OpenListDeal>(() => generateOpenListDeal(locale))
  const [parties, setParties] = useState<OpenListParty[]>(() => deal.parties)
  const [list, setList] = useState<ListCandidate[]>(() => deal.list)
  const [week, setWeek] = useState(1)
  const [phase, setPhase] = useState<OpenListPhase>('campaign')
  const [lastEvent, setLastEvent] = useState<WeekEvent | null>(null)
  const [resolving, setResolving] = useState(false)
  const [rulesOpen, setRulesOpen] = useState(false)
  const [flavorOpen, setFlavorOpen] = useState(false)
  const [campaignTab, setCampaignTab] = useState<CampaignTab>('you')
  const [fx, setFx] = useState<{ kind: EffectKind; token: number; on: boolean }>({
    kind: 'confetti',
    token: 0,
    on: false,
  })
  const [nightParties, setNightParties] = useState<OpenListParty[] | null>(null)
  const [nightLocked, setNightLocked] = useState(false)
  const rulesDialogRef = useRef<HTMLDialogElement>(null)
  const weekRowRef = useRef<HTMLDivElement>(null)
  const [playSlotH, setPlaySlotH] = useState<number | null>(null)
  const timers = useRef<number[]>([])

  function clearTimers() {
    for (const id of timers.current) window.clearTimeout(id)
    timers.current = []
  }

  function later(ms: number, fn: () => void) {
    const id = window.setTimeout(fn, ms)
    timers.current.push(id)
  }

  useEffect(() => () => clearTimers(), [])

  useEffect(() => {
    setDeal((d) => relabelOpenListDeal(d, locale))
    setParties((ps) => relabelParties(ps, locale))
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

  useEffect(() => {
    if (!compact || phase !== 'campaign' || campaignTab !== 'campaign') return
    const el = weekRowRef.current
    if (!el) return
    const apply = () => {
      const h = el.getBoundingClientRect().height
      if (h > 0) setPlaySlotH(h)
    }
    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(el)
    return () => ro.disconnect()
  }, [compact, phase, campaignTab, locale, week, lastEvent])

  const snap = useMemo(() => snapshot(deal, parties, list), [deal, parties, list])
  const playerParty = parties.find((p) => p.id === deal.playerPartyId)
  const you = list.find((c) => c.id === deal.playerId)
  const nightSnap = useMemo(
    () => snapshot(deal, nightParties ?? parties, list),
    [deal, nightParties, parties, list],
  )
  const displayParties = phase === 'night' ? (nightParties ?? parties) : parties
  const displaySnap = phase === 'night' ? nightSnap : snap
  const elected = isElected(snap)
  const closedIn = closedListWouldWin(deal, snap.playerSeats)

  function dealNew() {
    clearTimers()
    const next = generateOpenListDeal(locale)
    setDeal(next)
    setParties(next.parties)
    setList(next.list)
    setWeek(1)
    setPhase('campaign')
    setLastEvent(null)
    setResolving(false)
    setCampaignTab('you')
    setFx({ kind: 'confetti', token: 0, on: false })
    setNightParties(null)
    setNightLocked(false)
  }

  function pickAction(action: CampaignAction) {
    if (phase !== 'campaign' || resolving || week > deal.weeksTotal) return
    setResolving(true)
    const { parties: nextParties, list: nextList, event } = applyWeek(
      deal,
      parties,
      list,
      action,
      week,
      dealRng(deal.seed, week),
    )
    setParties(nextParties)
    setList(nextList)
    setLastEvent(event)
    if (event.quality === 'overperform') {
      setFx((f) => ({ kind: 'surge', token: f.token + 1, on: true }))
    } else if (event.quality === 'fizzle') {
      setFx((f) => ({ kind: 'rain', token: f.token + 1, on: true }))
    } else {
      setFx((f) => ({ ...f, on: false }))
    }
    const last = week >= deal.weeksTotal
    const settleMs =
      event.quality === 'fizzle' ? 1100 : event.quality === 'overperform' ? 900 : 650
    if (!last) {
      setWeek(week + 1)
      later(settleMs, () => setResolving(false))
      return
    }
    later(settleMs, () => {
      const final = jitterElection(nextParties, nextList, dealRng(deal.seed, week + 10_007))
      setPhase('night')
      setNightLocked(false)
      setList(final.list)
      const frames = approachNightFrames(final.parties)
      setNightParties(frames[0] ?? final.parties)
      let n = 0
      const tick = () => {
        n += 1
        const frame = frames[n]
        if (frame) {
          setNightParties(frame)
          later(NIGHT_COUNT_MS, tick)
          return
        }
        setNightParties(final.parties)
        setParties(final.parties)
        setNightLocked(true)
        const won = snapshot(deal, final.parties, final.list).inProjected
        setFx((f) => ({
          kind: won ? 'confetti' : 'miss',
          token: f.token + 1,
          on: true,
        }))
        setResolving(false)
      }
      later(NIGHT_COUNT_MS, tick)
    })
  }

  const youTone =
    lastEvent?.quality === 'overperform'
      ? 'good'
      : lastEvent?.quality === 'fizzle'
        ? 'bad'
        : 'neutral'
  const beatYou = lastEvent
    ? t(`ex.openlist.you.${lastEvent.action}.${lastEvent.quality}`)
    : ''
  const fieldBeats = lastEvent
    ? lastEvent.field.length === 0
      ? [{ tone: 'neutral' as const, text: t('ex.openlist.field.quiet') }]
      : lastEvent.field.map((f) => ({
          tone: (f.kind === 'infight' ? 'good' : 'bad') as 'good' | 'bad',
          text: fill(t(`ex.openlist.field.${f.kind}`), {
            party: parties.find((p) => p.id === f.partyId)?.name ?? f.partyId,
          }),
        }))
    : []
  const mateBeat =
    lastEvent?.listMateSelf &&
    fill(t('ex.openlist.mate.self'), { name: lastEvent.listMateSelf.name })

  const closedLine = nightLocked
    ? elected && closedIn
      ? t('ex.openlist.closed.bothIn')
      : elected && !closedIn
        ? t('ex.openlist.closed.openSaved')
        : !elected && closedIn
          ? t('ex.openlist.closed.openCost')
          : t('ex.openlist.closed.bothOut')
    : ''

  const idCard =
    you && playerParty ? (
      <div className="olist-id-panel">
        <p className="syspick-you-label">{t('ex.openlist.youAre')}</p>
        <div className="olist-id-card" style={{ ['--party' as string]: playerParty.color }}>
          <div className="olist-id-portrait">
            <PoliticianPortrait
              look={you.look}
              suitColor={you.suitColor}
              hairColor={you.hairColor}
            />
          </div>
          <div className="olist-id-meta">
            <strong className="olist-id-name">{you.name}</strong>
            <hr className="olist-id-rule" />
            <p className="olist-id-party">
              {playerParty.fruit} {playerParty.name}
            </p>
            <p className="olist-id-stats">
              {displaySnap.parties.find((p) => p.id === deal.playerPartyId)?.share.toFixed(1)}%
              {' · '}
              {fill(t('ex.openlist.projected'), { n: displaySnap.playerSeats })}
            </p>
          </div>
        </div>
        <button type="button" className="btn primary syspick-new-deal" onClick={dealNew}>
          <NewDealIcon />
          {t('ex.openlist.newDeal')}
        </button>
      </div>
    ) : null

  const listPanel = playerParty ? (
    <div className="olist-list-panel">
      <header className="olist-list-head">
        <h2>
          {playerParty.fruit} {playerParty.name}
          <span>
            {' '}
            · {displaySnap.parties.find((p) => p.id === deal.playerPartyId)?.share.toFixed(1)}%
          </span>
        </h2>
        <p className="muted">
          {fill(t('ex.openlist.projected'), { n: displaySnap.playerSeats })}
        </p>
      </header>
      <ListBoard
        list={list}
        playerId={deal.playerId}
        playerSeats={displaySnap.playerSeats}
        partyColor={playerParty.color}
        youLabel={t('ex.openlist.you')}
        inLabel={t('ex.openlist.in')}
        outLabel={t('ex.openlist.out')}
        clipAround={compact && phase === 'night'}
        clipHeight={compact && phase === 'night' ? playSlotH : null}
      />
    </div>
  ) : null

  const weekRow = (
    <div className="olist-week-row" ref={weekRowRef}>
      {compact && you && playerParty && (
        <ol
          className="olist-rows olist-you-peek"
          style={{ ['--rows' as string]: 1, ['--row-h' as string]: ROW_H }}
        >
          <ListRow
            candidate={you}
            rank={displaySnap.playerRank}
            playerId={deal.playerId}
            playerSeats={displaySnap.playerSeats}
            partyColor={playerParty.color}
            youLabel={t('ex.openlist.you')}
            inLabel={t('ex.openlist.in')}
            outLabel={t('ex.openlist.out')}
          />
        </ol>
      )}
      <p className="olist-week-count">
        {fill(t('ex.openlist.week'), { n: week, total: deal.weeksTotal })}
      </p>
      <div className="olist-week-play">
        <div className="olist-actions">
          {ACTIONS.map((id) => (
            <button
              key={id}
              type="button"
              className="olist-action"
              disabled={resolving}
              onClick={() => pickAction(id)}
            >
              <strong>{t(`ex.openlist.act.${id}`)}</strong>
              <span>{t(`ex.openlist.actHint.${id}`)}</span>
            </button>
          ))}
        </div>
        {(lastEvent || compact) && (
          <div className="olist-captions" aria-live="polite">
            {lastEvent ? (
              <>
                <div className={`olist-caption is-${youTone}`}>
                  <span className="olist-caption-kicker">
                    {youTone === 'good' ? <CaptionMark kind="surge" /> : null}
                    {youTone === 'bad' ? <CaptionMark kind="fizzle" /> : null}
                    {t('ex.openlist.news.you')}
                  </span>
                  <p>{beatYou}</p>
                </div>
                {mateBeat && (
                  <div className="olist-caption is-bad">
                    <span className="olist-caption-kicker">{t('ex.openlist.news.you')}</span>
                    <p>{mateBeat}</p>
                  </div>
                )}
                {fieldBeats.map((b, i) => (
                  <div key={`${b.tone}-${i}`} className={`olist-caption is-${b.tone}`}>
                    <span className="olist-caption-kicker">{t('ex.openlist.news.field')}</span>
                    <p>{b.text}</p>
                  </div>
                ))}
              </>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )

  const fieldChart = playerParty ? (
    <div className="olist-field-panel">
      <h2 className="sim-section-title">{t('ex.openlist.standings')}</h2>
      <PartyBars
        parties={displayParties}
        playerPartyId={deal.playerPartyId}
        seats={displaySnap.seats}
        scramble={phase === 'night' && !nightLocked}
        compact={compact}
      />
    </div>
  ) : null

  return (
    <div className={`page olist-page ${compact ? 'is-compact-page' : ''}`}>
      <FullscreenEffect active={fx.on} kind={fx.kind} token={fx.token} />

      <header className="page-head">
        <p className="gerry-back">
          <Link to="/games">{t('ex.back')}</Link>
        </p>
        <h1>{t('ex.openlist.title')}</h1>
        {compact && (
          <CompactFlavorChrome
            flavorOpen={flavorOpen}
            rulesOpen={rulesOpen}
            onOpenFlavor={() => {
              setRulesOpen(false)
              setFlavorOpen(true)
            }}
            onOpenRules={() => {
              setFlavorOpen(false)
              setRulesOpen(true)
            }}
            onCloseFlavor={() => setFlavorOpen(false)}
            rulesLabel={t('ex.openlist.rulesLink')}
            closeLabel={t('ex.openlist.rulesClose')}
          >
            <p>{t('ex.openlist.rulesL1')}</p>
            <p>{t('ex.openlist.rulesL2')}</p>
            <p>{t('ex.openlist.rulesL3')}</p>
            <p>{t('ex.openlist.rulesL4')}</p>
          </CompactFlavorChrome>
        )}
        {compact && phase === 'campaign' && (
          <PanelTabs
            ariaLabel={t('compact.openlist.tabs')}
            value={campaignTab}
            onChange={setCampaignTab}
            tabs={[
              { id: 'you', label: t('compact.openlist.you') },
              { id: 'campaign', label: t('compact.openlist.campaign') },
            ]}
          />
        )}
        {compact && phase === 'night' && (
          <p
            className={`olist-night-status ${
              nightLocked ? (elected ? 'is-win' : 'is-lose') : 'is-count'
            }`}
            role="status"
          >
            {!nightLocked
              ? t('ex.openlist.counting')
              : elected
                ? fill(t('ex.openlist.victory'), { rank: snap.playerRank, seats: snap.playerSeats })
                : fill(t('ex.openlist.defeat'), { rank: snap.playerRank, seats: snap.playerSeats })}
          </p>
        )}
        <div className={`olist-intro ${compact ? 'is-compact-hidden' : ''}`}>
          <aside className="info-panel gerry-brief" role="note">
            <p>{t('ex.openlist.rulesL1')}</p>
            <p>{t('ex.openlist.rulesL2')}</p>
            <p>{t('ex.openlist.rulesL3')}</p>
            <p>{t('ex.openlist.rulesL4')}</p>
            <button
              type="button"
              className={`gerry-rules-btn ${rulesHint}`}
              onClick={() => setRulesOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={rulesOpen}
            >
              <span className="gerry-rules-info" aria-hidden>
                i
              </span>
              {t('ex.openlist.rulesLink')}
            </button>
          </aside>
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
            <h2>{t('ex.openlist.rulesLink')}</h2>
            <button
              type="button"
              className="btn ghost"
              onClick={() => setRulesOpen(false)}
              aria-label={t('ex.openlist.rulesClose')}
            >
              ×
            </button>
          </header>
          <ol className="gerry-rules-list">
            <li>{t(compact ? 'compact.openlist.rulesP1' : 'ex.openlist.rulesP1')}</li>
            <li>{t(compact ? 'compact.openlist.rulesP2' : 'ex.openlist.rulesP2')}</li>
            <li>{t(compact ? 'compact.openlist.rulesP3' : 'ex.openlist.rulesP3')}</li>
            <li>{t(compact ? 'compact.openlist.rulesP4' : 'ex.openlist.rulesP4')}</li>
          </ol>
          <p className="gerry-rules-luck">{t('ex.openlist.rulesP5')}</p>
        </div>
      </dialog>

      {phase === 'campaign' && (
        <section className={`olist-campaign tab-${campaignTab}`}>
          <div className="olist-campaign-top">
            {idCard}
            {listPanel}
          </div>
          <div className="olist-campaign-bottom">
            {weekRow}
            {fieldChart}
          </div>
        </section>
      )}

      {phase === 'night' && playerParty && (
        <section className="olist-night" aria-live="polite">
          {!compact && (
            <p className={nightLocked ? (elected ? 'syspick-win' : 'syspick-lose') : 'olist-counting'}>
              {!nightLocked
                ? t('ex.openlist.counting')
                : elected
                  ? fill(t('ex.openlist.victory'), { rank: snap.playerRank, seats: snap.playerSeats })
                  : fill(t('ex.openlist.defeat'), { rank: snap.playerRank, seats: snap.playerSeats })}
            </p>
          )}
          <div className="olist-night-grid">
            <div className="olist-night-list">{listPanel}</div>
            <div className="olist-night-result">
              <h2 className="sim-section-title">
                {nightLocked ? t('ex.openlist.final') : t('ex.openlist.counting')}
              </h2>
              <PartyBars
                parties={displayParties}
                playerPartyId={deal.playerPartyId}
                seats={seatAlloc(displayParties)}
                scramble={!nightLocked}
                compact={compact}
                scaleMax={Math.max(36, ...parties.map((p) => p.share * 1.15))}
              />
              {nightLocked && closedLine && <p className="olist-closed">{closedLine}</p>}
              {nightLocked && (
                <button type="button" className="btn primary syspick-new-deal" onClick={dealNew}>
                  <NewDealIcon />
                  {t('ex.openlist.newDeal')}
                </button>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
