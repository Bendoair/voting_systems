import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BottomSheet } from '../components/BottomSheet'
import { CompactFlavorChrome } from '../components/CompactFlavorChrome'
import { ConfettiBurst } from '../components/ConfettiBurst'
import { GerryBoard, type GerryViewMode } from '../exercises/gerrymander/Board'
import { generateGerryMap } from '../exercises/gerrymander/generate'
import {
  downsampleStroke,
  pathLength,
  pointInPolygon,
  polygonArea,
  type Pt,
} from '../exercises/gerrymander/polygon'
import { emptyAssignment, fixBorderGaps, scoreMap, targetDistrictSize } from '../exercises/gerrymander/score'
import {
  DISTRICT_COLORS,
  DISTRICT_COUNT,
  DIFFICULTY_BANDS,
  DIFFICULTY_ORDER,
  OPPONENT_COLOR,
  PLAYER_COLOR,
  type DistrictId,
  type GerryDifficulty,
  type GerryMap,
} from '../exercises/gerrymander/types'
import { useI18n } from '../i18n'
import { useCompactLayout } from '../hooks/useCompactLayout'

const HISTORY_LIMIT = 5

function newRound(difficulty: GerryDifficulty): { map: GerryMap; assignment: DistrictId[] } {
  const map = generateGerryMap(undefined, difficulty)
  return { map, assignment: emptyAssignment(map) }
}

export function Gerrymander() {
  const { t } = useI18n()
  const compact = useCompactLayout()
  const [sheetOpen, setSheetOpen] = useState(false)
  const [difficulty, setDifficulty] = useState<GerryDifficulty>('medium')
  const [{ map, assignment }, setRound] = useState(() => newRound('medium'))
  const [past, setPast] = useState<DistrictId[][]>([])
  const [future, setFuture] = useState<DistrictId[][]>([])
  const [activeDistrict, setActiveDistrict] = useState(1)
  const [viewMode, setViewMode] = useState<GerryViewMode>('voters')
  const [rulesOpen, setRulesOpen] = useState(false)
  const [flavorOpen, setFlavorOpen] = useState(false)
  const activeDistrictRef = useRef(activeDistrict)
  activeDistrictRef.current = activeDistrict
  const rulesDialogRef = useRef<HTMLDialogElement>(null)
  const difficultyRef = useRef(difficulty)
  difficultyRef.current = difficulty

  useEffect(() => {
    const el = rulesDialogRef.current
    if (!el) return
    if (rulesOpen) {
      if (!el.open) el.showModal()
    } else if (el.open) {
      el.close()
    }
  }, [rulesOpen])

  const score = useMemo(
    () => scoreMap(map, assignment, DISTRICT_COUNT),
    [map, assignment],
  )
  const target = targetDistrictSize(map, DISTRICT_COUNT)
  const playerPct = ((map.playerCount / map.landCount) * 100).toFixed(1)

  function commitAssignment(next: DistrictId[]) {
    setPast((p) => [...p, assignment].slice(-HISTORY_LIMIT))
    setFuture([])
    setRound((r) => ({ map: r.map, assignment: next }))
  }

  function undo() {
    setPast((p) => {
      if (p.length === 0) return p
      const prev = p[p.length - 1]!
      setFuture((f) => [assignment, ...f].slice(0, HISTORY_LIMIT))
      setRound((r) => ({ map: r.map, assignment: prev }))
      return p.slice(0, -1)
    })
  }

  function redo() {
    setFuture((f) => {
      if (f.length === 0) return f
      const next = f[0]!
      setPast((p) => [...p, assignment].slice(-HISTORY_LIMIT))
      setRound((r) => ({ map: r.map, assignment: next }))
      return f.slice(1)
    })
  }

  function assignFromStroke(raw: Pt[]) {
    const district = activeDistrictRef.current
    const cellSize = Math.max(8, Math.floor(560 / Math.max(map.width, map.height)))
    const poly = downsampleStroke(raw, Math.max(4, cellSize * 0.35))
    if (poly.length < 3) return

    const len = pathLength(poly)
    const area = polygonArea(poly)
    const minLen = cellSize * 8
    const minArea = cellSize * cellSize * 12
    if (len < minLen || area < minArea) return

    const next = assignment.slice()
    let changed = false
    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        const i = y * map.width + x
        if (!map.land[i]) continue
        const cx = (x + 0.5) * cellSize
        const cy = (y + 0.5) * cellSize
        if (!pointInPolygon(cx, cy, poly)) continue
        if (next[i] === district) continue
        next[i] = district
        changed = true
      }
    }
    if (changed) commitAssignment(next)
  }

  function clearDistricts() {
    commitAssignment(emptyAssignment(map))
  }

  function clearDistrict(id: number) {
    commitAssignment(assignment.map((d) => (d === id ? 0 : d)))
  }

  function fixBorders() {
    const next = fixBorderGaps(map, assignment, DISTRICT_COUNT)
    if (next.some((d, i) => d !== assignment[i])) commitAssignment(next)
  }

  function newMap() {
    setRound(newRound(difficultyRef.current))
    setPast([])
    setFuture([])
    setActiveDistrict(1)
  }

  function onDifficultyChange(next: GerryDifficulty) {
    setDifficulty(next)
    difficultyRef.current = next
  }

  const difficultyIdx = DIFFICULTY_ORDER.indexOf(difficulty)
  const band = DIFFICULTY_BANDS[difficulty]
  const shareLabel = `${Math.round(band.min * 100)}–${Math.round(band.max * 100)}%`

  return (
    <div className={`page gerry-page ${compact ? 'is-compact-page' : ''}`}>
      <ConfettiBurst active={score.won} />
      <header className="page-head">
        <p className="gerry-back">
          <Link to="/games">{t('ex.back')}</Link>
        </p>
        <h1>{t('ex.gerry.title')}</h1>
        {!compact && (
        <aside className="info-panel gerry-brief" role="note">
          <p>{t('ex.gerry.rules')}</p>
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
            {t('ex.gerry.rulesLink')}
          </button>
        </aside>
        )}
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
            rulesLabel={t('ex.gerry.rulesLink')}
            closeLabel={t('ex.gerry.rulesClose')}
          >
            <p>{t('ex.gerry.rules')}</p>
          </CompactFlavorChrome>
        )}
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
            <h2>{t('ex.gerry.rulesLink')}</h2>
            <button
              type="button"
              className="btn ghost"
              onClick={() => setRulesOpen(false)}
              aria-label={t('ex.gerry.rulesClose')}
            >
              ×
            </button>
          </header>
          <ol className="gerry-rules-list">
            <li>{t('ex.gerry.rulesP1')}</li>
            <li>{t('ex.gerry.rulesP2')}</li>
            <li>
              {t('ex.gerry.rulesP3a')} <strong>{t('ex.gerry.districts')}</strong>{' '}
              {t('ex.gerry.rulesP3b')}
            </li>
            <li>
              {t('ex.gerry.rulesP4a')} <strong>{t('ex.gerry.rulesP4em')}</strong>{' '}
              {t('ex.gerry.rulesP4b')}
            </li>
            <li>
              {t('ex.gerry.rulesP5a')} <strong>{t('ex.gerry.undo')}</strong>
              {t('ex.gerry.rulesP5b')}
            </li>
            <li>{t('ex.gerry.rulesP6')}</li>
            <li>
              {t('ex.gerry.rulesP7a')} <strong>{t('ex.gerry.rulesP7em')}</strong>
              {t('ex.gerry.rulesP7b')}
            </li>
            <li>
              {t('ex.gerry.rulesP8a')} <strong>{t('ex.gerry.fixBorders')}</strong>{' '}
              {t('ex.gerry.rulesP8b')}
            </li>
          </ol>
          <p className="gerry-rules-luck">{t('ex.gerry.rulesP9')}</p>
        </div>
      </dialog>

      <div className="gerry-layout">
        <div className="gerry-board-wrap">
          <h2 className="gerry-county-title">{t('ex.gerry.county')}</h2>
          <div className="gerry-toolbar">
            <div className="gerry-legend">
              <span>
                <i className="gerry-swatch" style={{ background: PLAYER_COLOR }} />
                {t('ex.gerry.you')} ({playerPct}%)
              </span>
              <span>
                <i className="gerry-swatch" style={{ background: OPPONENT_COLOR }} />
                {t('ex.gerry.them')} ({(100 - Number(playerPct)).toFixed(1)}%)
              </span>
            </div>
            <div className="gerry-view-toggle" role="group" aria-label={t('ex.gerry.view')}>
              <button
                type="button"
                className={`btn ${viewMode === 'voters' ? 'primary' : ''}`}
                onClick={() => setViewMode('voters')}
              >
                {t('ex.gerry.viewVoters')}
              </button>
              <button
                type="button"
                className={`btn ${viewMode === 'districts' ? 'primary' : ''}`}
                onClick={() => setViewMode('districts')}
              >
                {t('ex.gerry.viewDistricts')}
              </button>
            </div>
          </div>
          <GerryBoard
            map={map}
            assignment={assignment}
            tallies={score.tallies}
            viewMode={viewMode}
            activeDistrict={activeDistrict}
            labelYou={t('ex.gerry.winSeat')}
            labelThem={t('ex.gerry.loseSeat')}
            labelTie={t('ex.gerry.tie')}
            onStrokeComplete={assignFromStroke}
          />
        </div>

        <aside className={`gerry-hud ${compact ? 'is-desktop-only' : ''}`}>
          <section className="sim-section">
            <div className="gerry-districts-head">
              <h3 className="sim-section-title">{t('ex.gerry.districts')}</h3>
              <div className="gerry-history">
                <button
                  type="button"
                  className="btn"
                  onClick={undo}
                  disabled={past.length === 0}
                  title={t('ex.gerry.undo')}
                  aria-label={t('ex.gerry.undo')}
                >
                  {t('ex.gerry.undo')}
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={redo}
                  disabled={future.length === 0}
                  title={t('ex.gerry.redo')}
                  aria-label={t('ex.gerry.redo')}
                >
                  {t('ex.gerry.redo')}
                </button>
              </div>
            </div>
            <p className="muted gerry-draw-hint">{t('ex.gerry.drawHint')}</p>
            <div className="gerry-palette">
              {Array.from({ length: DISTRICT_COUNT }, (_, i) => {
                const id = i + 1
                const tally = score.tallies[i]!
                const chipClass =
                  tally.winner === 'player'
                    ? 'is-you'
                    : tally.winner === 'opponent'
                      ? 'is-them'
                      : tally.winner === 'tie'
                        ? 'is-tie'
                        : 'is-empty'
                return (
                  <div key={id} className="gerry-district-row">
                    <button
                      type="button"
                      className={`gerry-district-btn ${activeDistrict === id ? 'is-active' : ''} ${
                        tally.winner === 'player' ? 'is-yours' : ''
                      }`}
                      style={{ borderColor: DISTRICT_COLORS[i] }}
                      onClick={() => setActiveDistrict(id)}
                    >
                      <span
                        className="gerry-district-dot"
                        style={{ background: DISTRICT_COLORS[i] }}
                      />
                      <span className="gerry-district-meta">
                        <span className="gerry-district-name">
                          {t('ex.gerry.district')} {id}
                          <small>
                            {tally.total}/{target}
                            <span
                              className={`gerry-size-warn ${
                                !tally.sizeOk && tally.total > 0 ? 'is-hot' : ''
                              }`}
                            >
                              {' · '}
                              {t('ex.gerry.sizeWarn')}
                            </span>
                          </small>
                        </span>
                        <span
                          className={`gerry-win-chip ${chipClass} ${tally.total > 0 ? 'is-hot' : ''}`}
                          aria-hidden={tally.total === 0}
                        >
                          <span className="gerry-win-chip-label">
                            {tally.winner === 'player'
                              ? t('ex.gerry.winSeat')
                              : tally.winner === 'opponent'
                                ? t('ex.gerry.loseSeat')
                                : tally.winner === 'tie'
                                  ? t('ex.gerry.tie')
                                  : t('ex.gerry.winSeat')}
                          </span>
                          <strong>
                            {tally.player}–{tally.opponent}
                          </strong>
                        </span>
                      </span>
                    </button>
                    <button
                      type="button"
                      className="btn danger gerry-district-clear"
                      disabled={tally.total === 0}
                      onClick={() => clearDistrict(id)}
                      title={t('ex.gerry.clearDistrict')}
                      aria-label={t('ex.gerry.clearDistrict')}
                    >
                      {t('ex.gerry.clear')}
                    </button>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="sim-section">
            <h3 className="sim-section-title">{t('ex.gerry.status')}</h3>
            <p>
              <strong>
                {score.playerSeats}/{DISTRICT_COUNT}
              </strong>{' '}
              {t('ex.gerry.seatsWon')} · {t('ex.gerry.need')} {score.seatsNeeded}
            </p>
            <p className="muted">
              {t('ex.gerry.unfilled')}: {score.unfilled}
              {!score.sizesOk ? ` · ${t('ex.gerry.sizeHint')}` : ''}
            </p>
            {score.won ? (
              <p className="gerry-win">{t('ex.gerry.victory')}</p>
            ) : score.playerSeats >= score.seatsNeeded && !score.allFilled ? (
              <p className="muted gerry-almost">{t('ex.gerry.almostFill')}</p>
            ) : score.allFilled && score.playerSeats < score.seatsNeeded ? (
              <p className="gerry-lose">{t('ex.gerry.defeat')}</p>
            ) : null}
            <div className="cta-row gerry-map-actions">
              <button
                type="button"
                className="btn"
                onClick={fixBorders}
                disabled={score.unfilled === 0 || score.tallies.every((t) => t.total === 0)}
              >
                {t('ex.gerry.fillBorders')}
              </button>
              <button type="button" className="btn" onClick={clearDistricts}>
                {t('ex.gerry.clearAll')}
              </button>
              <div className="gerry-difficulty">
                <label className="gerry-difficulty-label" htmlFor="gerry-difficulty">
                  {t('ex.gerry.difficulty')}
                  <span className="gerry-difficulty-value">
                    {t(`ex.gerry.diff.${difficulty}`)} · {shareLabel}
                  </span>
                </label>
                <input
                  id="gerry-difficulty"
                  type="range"
                  min={0}
                  max={DIFFICULTY_ORDER.length - 1}
                  step={1}
                  value={difficultyIdx}
                  onChange={(e) => {
                    const next = DIFFICULTY_ORDER[Number(e.target.value)]
                    if (next) onDifficultyChange(next)
                  }}
                  list="gerry-difficulty-marks"
                  aria-valuetext={t(`ex.gerry.diff.${difficulty}`)}
                />
                <datalist id="gerry-difficulty-marks">
                  {DIFFICULTY_ORDER.map((_, i) => (
                    <option key={i} value={i} />
                  ))}
                </datalist>
                <div className="gerry-difficulty-ticks" aria-hidden>
                  {DIFFICULTY_ORDER.map((d) => (
                    <span key={d}>{t(`ex.gerry.diff.${d}`)}</span>
                  ))}
                </div>
              </div>
              <button type="button" className="btn primary" onClick={newMap}>
                {t('ex.gerry.newMap')}
              </button>
            </div>

          </section>
        </aside>
      </div>
      {compact && (
        <BottomSheet
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          title={t('ex.gerry.districts')}
          bottomOffset="var(--compact-bottom-nav-h)"
          peek={
            <span>
              {t('ex.gerry.district')} {activeDistrict} · {score.playerSeats}/{DISTRICT_COUNT}{' '}
              {t('ex.gerry.seatsWon')}
            </span>
          }
        >
          <div className="gerry-hud gerry-hud-sheet">
            <section className="sim-section">
              <div className="gerry-history" style={{ marginBottom: '0.5rem' }}>
                <button type="button" className="btn" onClick={undo} disabled={past.length === 0}>
                  {t('ex.gerry.undo')}
                </button>
                <button type="button" className="btn" onClick={redo} disabled={future.length === 0}>
                  {t('ex.gerry.redo')}
                </button>
              </div>
              <div className="gerry-palette">
                {Array.from({ length: DISTRICT_COUNT }, (_, i) => {
                  const id = i + 1
                  const tally = score.tallies[i]!
                  const chipClass =
                    tally.winner === 'player'
                      ? 'is-you'
                      : tally.winner === 'opponent'
                        ? 'is-them'
                        : tally.winner === 'tie'
                          ? 'is-tie'
                          : 'is-empty'
                  const color = DISTRICT_COLORS[i]!
                  return (
                    <div key={id} className="gerry-district-row">
                      <button
                        type="button"
                        className={`gerry-district-btn ${activeDistrict === id ? 'is-active' : ''} ${
                          tally.winner === 'player' ? 'is-yours' : ''
                        }`}
                        style={{
                          borderColor: color,
                          ['--district' as string]: color,
                        }}
                        onClick={() => {
                          setActiveDistrict(id)
                          setSheetOpen(false)
                        }}
                      >
                        <span
                          className="gerry-district-dot"
                          style={{ background: color }}
                        />
                        <span className="gerry-district-meta">
                          <span className="gerry-district-name">
                            {t('ex.gerry.district')} {id}
                            <small>
                              {tally.total}/{target}
                              <span
                                className={`gerry-size-warn ${
                                  !tally.sizeOk && tally.total > 0 ? 'is-hot' : ''
                                }`}
                              >
                                {' · '}
                                {t('ex.gerry.sizeWarn')}
                              </span>
                            </small>
                          </span>
                          <span
                            className={`gerry-win-chip ${chipClass} ${tally.total > 0 ? 'is-hot' : ''}`}
                            aria-hidden={tally.total === 0}
                          >
                            <span className="gerry-win-chip-label">
                              {tally.winner === 'player'
                                ? t('ex.gerry.winSeat')
                                : tally.winner === 'opponent'
                                  ? t('ex.gerry.loseSeat')
                                  : tally.winner === 'tie'
                                    ? t('ex.gerry.tie')
                                    : t('ex.gerry.winSeat')}
                            </span>
                            <strong>
                              {tally.player}–{tally.opponent}
                            </strong>
                          </span>
                        </span>
                      </button>
                      <button
                        type="button"
                        className="btn danger gerry-district-clear"
                        disabled={tally.total === 0}
                        onClick={() => clearDistrict(id)}
                        title={t('ex.gerry.clearDistrict')}
                        aria-label={t('ex.gerry.clearDistrict')}
                      >
                        {t('ex.gerry.clear')}
                      </button>
                    </div>
                  )
                })}
              </div>
            </section>
            <section className="sim-section">
              <p>
                <strong>
                  {score.playerSeats}/{DISTRICT_COUNT}
                </strong>{' '}
                {t('ex.gerry.seatsWon')}
              </p>
              {score.won ? <p className="gerry-win">{t('ex.gerry.victory')}</p> : null}
              <div className="cta-row gerry-map-actions">
                <button type="button" className="btn" onClick={fixBorders}>
                  {t('ex.gerry.fillBorders')}
                </button>
                <button type="button" className="btn primary" onClick={newMap}>
                  {t('ex.gerry.newMap')}
                </button>
              </div>
              <div className="gerry-difficulty">
                <label className="gerry-difficulty-label" htmlFor="gerry-difficulty-compact">
                  {t('ex.gerry.difficulty')}
                  <span className="gerry-difficulty-value">
                    {t(`ex.gerry.diff.${difficulty}`)} · {shareLabel}
                  </span>
                </label>
                <input
                  id="gerry-difficulty-compact"
                  type="range"
                  min={0}
                  max={DIFFICULTY_ORDER.length - 1}
                  step={1}
                  value={difficultyIdx}
                  onChange={(e) => {
                    const next = DIFFICULTY_ORDER[Number(e.target.value)]
                    if (next) onDifficultyChange(next)
                  }}
                  list="gerry-difficulty-marks-compact"
                  aria-valuetext={t(`ex.gerry.diff.${difficulty}`)}
                />
                <datalist id="gerry-difficulty-marks-compact">
                  {DIFFICULTY_ORDER.map((_, i) => (
                    <option key={i} value={i} />
                  ))}
                </datalist>
                <div className="gerry-difficulty-ticks" aria-hidden>
                  {DIFFICULTY_ORDER.map((d) => (
                    <span key={d}>{t(`ex.gerry.diff.${d}`)}</span>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </BottomSheet>
      )}
    </div>
  )
}
