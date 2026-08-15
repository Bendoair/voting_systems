import { useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react'
import { localPoint } from '@visx/event'
import { Group } from '@visx/group'
import { scaleLinear } from '@visx/scale'
import { voronoi as voronoiLayout, VoronoiPolygon } from '@visx/voronoi'
import type { CompassPoint } from '../data/tourScenario'
import { TOUR_CROWD, nearestParty } from '../data/tourScenario'
import { useI18n } from '../i18n'

const MARGIN = { top: 20, right: 14, bottom: 20, left: 14 }
const DOT_R = 3.25
const MIN_CHART = 280
const DEFAULT_CHART = 360

interface HoverDot {
  id: string
  x: number
  y: number
  name: string
  color?: string
}

export type TacticalCallout = {
  voterId: string
  voterName: string
  trueParty: CompassPoint
  tactParty: CompassPoint
}

function CompassChart({
  width,
  height,
  parties,
  dots,
  you,
  onPlaceYou,
  showVoronoi,
  hoverPrefs,
  overrideLinks,
  tacticalCallout,
  explode,
  dimCountLabel,
  onToggleExplode,
}: {
  width: number
  height: number
  parties: CompassPoint[]
  dots: HoverDot[]
  you?: { x: number; y: number } | null
  onPlaceYou?: (x: number, y: number) => void
  showVoronoi: boolean
  hoverPrefs: boolean
  overrideLinks?: Record<string, string>
  tacticalCallout?: TacticalCallout
  explode: boolean
  dimCountLabel?: string
  onToggleExplode?: () => void
}) {
  const { t } = useI18n()
  const [fade, setFade] = useState<'in' | 'out' | 'idle'>('idle')
  const [displayExplode, setDisplayExplode] = useState(explode)
  const [hoverId, setHoverId] = useState<string | null>(
    tacticalCallout?.voterId ?? null,
  )
  const [railPinned, setRailPinned] = useState(false)

  const clearHover = () => setHoverId(tacticalCallout?.voterId ?? null)

  useEffect(() => {
    if (explode === displayExplode) return
    setFade('out')
    const outTimer = window.setTimeout(() => {
      setDisplayExplode(explode)
      setFade('in')
    }, 220)
    return () => clearTimeout(outTimer)
  }, [explode, displayExplode])

  useEffect(() => {
    if (fade !== 'in') return
    const inTimer = window.setTimeout(() => setFade('idle'), 280)
    return () => clearTimeout(inTimer)
  }, [fade])

  const innerW = Math.max(10, width - MARGIN.left - MARGIN.right)
  const innerH = Math.max(10, height - MARGIN.top - MARGIN.bottom)

  const xScale = useMemo(
    () => scaleLinear({ domain: [-1.05, 1.05], range: [0, innerW] }),
    [innerW],
  )
  const yScale = useMemo(
    () => scaleLinear({ domain: [-1.05, 1.05], range: [innerH, 0] }),
    [innerH],
  )

  const voronoiPolygons = useMemo(() => {
    if (!showVoronoi || parties.length === 0 || displayExplode) return []
    const layout = voronoiLayout({
      x: (d: CompassPoint) => xScale(d.x) ?? 0,
      y: (d: CompassPoint) => yScale(d.y) ?? 0,
      width: innerW,
      height: innerH,
    })
    return layout.polygons(parties).map((polygon) => ({
      id: polygon.data.id,
      color: polygon.data.color,
      polygon,
    }))
  }, [parties, showVoronoi, displayExplode, xScale, yScale, innerW, innerH])

  const fakeAxes = useMemo(() => {
    if (!displayExplode) return []
    const cx = innerW / 2
    const cy = innerH / 2
    return Array.from({ length: 64 }, (_, i) => {
      const a = (i / 64) * Math.PI * 2 + 0.15
      const len = Math.min(innerW, innerH) * (0.35 + (i % 5) * 0.04)
      return { x2: cx + Math.cos(a) * len, y2: cy + Math.sin(a) * len }
    })
  }, [displayExplode, innerW, innerH])

  const hovered = hoverId ? dots.find((d) => d.id === hoverId) : null
  const hoverTrue =
    hovered && parties.length > 0 ? nearestParty(hovered, parties) : null
  const hoverTarget =
    hovered && parties.length > 0
      ? parties.find((p) => p.id === overrideLinks?.[hovered.id]) ?? hoverTrue
      : null
  const hoverTactical = Boolean(
    hovered && hoverTarget && hoverTrue && hoverTarget.id !== hoverTrue.id,
  )
  const emmaFocus =
    Boolean(tacticalCallout) &&
    (hoverId === tacticalCallout?.voterId || railPinned)
  const railOpen = emmaFocus

  function handleBgClick(e: ReactMouseEvent<SVGElement>) {
    if (onToggleExplode) {
      onToggleExplode()
      return
    }
    if (!onPlaceYou) return
    const pt = localPoint(e)
    if (!pt) return
    const x = xScale.invert(pt.x - MARGIN.left)
    const y = yScale.invert(pt.y - MARGIN.top)
    onPlaceYou(Math.max(-1, Math.min(1, x)), Math.max(-1, Math.min(1, y)))
  }

  const fadeClass =
    fade === 'out' ? 'compass-fading-out' : fade === 'in' ? 'compass-fading-in' : ''

  const tipName = hovered?.name ?? ''
  const tipPref = hoverTarget
      ? `${hoverTarget.emoji} ${t(`tour.party.${hoverTarget.labelKey}`)}`
      : ''

  const showHintSlot = Boolean(onToggleExplode || (hoverPrefs && dots.length > 0))
  const hintText = onToggleExplode
    ? t('tour.s2.clickHint')
    : hoverPrefs
      ? t('tour.hoverHint')
      : ''

  return (
    <div className={`compass-wrap ${displayExplode ? 'explode' : ''} ${fadeClass}`}>
      <div className="compass-hint-slot" aria-hidden={!showHintSlot}>
        {showHintSlot && !displayExplode ? (
          <p className="dim-hint muted">{hintText}</p>
        ) : (
          <p className="dim-hint muted">&nbsp;</p>
        )}
      </div>

      <div className="compass-badge-slot">
        {displayExplode && dimCountLabel ? (
          <p className="dim-badge">{dimCountLabel}</p>
        ) : (
          <p className="dim-badge dim-badge-placeholder">&nbsp;</p>
        )}
      </div>

      <div className="compass-plot">
        <svg
          width={width}
          height={height}
          className={`compass-svg ${onToggleExplode ? 'interactive' : ''} ${onPlaceYou ? 'placeable' : ''}`}
          onClick={handleBgClick}
          role="img"
          aria-label={t('tour.compassAria')}
        >
          <rect width={width} height={height} fill="var(--paper-2)" rx="8" />

          <Group left={MARGIN.left} top={MARGIN.top}>
            {!displayExplode &&
              showVoronoi &&
              voronoiPolygons.map((cell) => (
                <VoronoiPolygon
                  key={cell.id}
                  polygon={cell.polygon}
                  fill={cell.color}
                  fillOpacity={0.18}
                  stroke={cell.color}
                  strokeOpacity={0.7}
                  strokeWidth={1.1}
                  className="voronoi-cell"
                  style={{ pointerEvents: 'none' }}
                />
              ))}

            {!displayExplode && (
              <g className="axis-crosshair" style={{ pointerEvents: 'none' }}>
                <line
                  x1={0}
                  y1={innerH / 2}
                  x2={innerW}
                  y2={innerH / 2}
                  stroke="var(--ink)"
                  strokeWidth={1.75}
                  strokeOpacity={0.85}
                />
                <line
                  x1={innerW / 2}
                  y1={0}
                  x2={innerW / 2}
                  y2={innerH}
                  stroke="var(--ink)"
                  strokeWidth={1.75}
                  strokeOpacity={0.85}
                />
              </g>
            )}

            {displayExplode && (
              <g className="compass-nd">
                {fakeAxes.map((a, i) => (
                  <line
                    key={i}
                    x1={innerW / 2}
                    y1={innerH / 2}
                    x2={a.x2}
                    y2={a.y2}
                    stroke="var(--accent)"
                    strokeOpacity={0.28 + (i % 4) * 0.04}
                    strokeWidth={1}
                  />
                ))}
                <circle
                  cx={innerW / 2}
                  cy={innerH / 2}
                  r={6}
                  fill="var(--accent-2)"
                  opacity={0.7}
                />
              </g>
            )}

            {!displayExplode && hovered && hoverTactical && hoverTrue && (
              <line
                className="hover-link"
                x1={xScale(hovered.x)}
                y1={yScale(hovered.y)}
                x2={xScale(hoverTrue.x)}
                y2={yScale(hoverTrue.y)}
                stroke="var(--ink)"
                strokeWidth={1.4}
                opacity={0.45}
              />
            )}

            {!displayExplode && hovered && hoverTarget && (
              <line
                className="hover-link"
                x1={xScale(hovered.x)}
                y1={yScale(hovered.y)}
                x2={xScale(hoverTarget.x)}
                y2={yScale(hoverTarget.y)}
                stroke={hoverTactical ? 'var(--warn)' : 'var(--ink)'}
                strokeWidth={hoverTactical ? 2 : 1.4}
                strokeDasharray={hoverTactical ? '5 3' : undefined}
                opacity={0.85}
              />
            )}

            {!displayExplode &&
              parties.map((p) => {
                const cx = xScale(p.x) ?? 0
                const cy = yScale(p.y) ?? 0
                const active =
                  hoverTarget?.id === p.id ||
                  (hoverTactical && hoverTrue?.id === p.id)
                return (
                  <g
                    key={p.id}
                    transform={`translate(${cx},${cy})`}
                    style={{ pointerEvents: 'none' }}
                  >
                    <circle
                      r={active ? 12 : 10}
                      fill={p.color}
                      opacity={0.95}
                      stroke="var(--ink)"
                      strokeWidth={active ? 1.4 : 0.8}
                    />
                    <text textAnchor="middle" dy="3.5" fontSize="10">
                      {p.emoji}
                    </text>
                  </g>
                )
              })}

            {!displayExplode &&
              hoverPrefs &&
              dots.map((d) => {
                const cx = xScale(d.x) ?? 0
                const cy = yScale(d.y) ?? 0
                const active = hoverId === d.id
                return (
                  <g
                    key={d.id}
                    transform={`translate(${cx},${cy})`}
                    className="voter-dot"
                    onMouseEnter={(e) => {
                      e.stopPropagation()
                      setHoverId(d.id)
                    }}
                    onMouseLeave={clearHover}
                    onFocus={() => setHoverId(d.id)}
                    onBlur={clearHover}
                    onClick={(e) => e.stopPropagation()}
                    tabIndex={0}
                    role="img"
                    aria-label={d.name}
                  >
                    <circle r={10} fill="transparent" />
                    <circle
                      r={active ? DOT_R + 1.25 : DOT_R}
                      fill={d.color ?? 'var(--ink)'}
                      opacity={active ? 0.95 : 0.55}
                      stroke={active ? 'var(--ink)' : 'none'}
                      strokeWidth={active ? 0.8 : 0}
                    />
                  </g>
                )
              })}

            {!displayExplode && you && (
              <g
                transform={`translate(${xScale(you.x)},${yScale(you.y)})`}
                style={{ pointerEvents: 'none' }}
              >
                <circle r={5.5} fill="var(--accent)" stroke="var(--ink)" strokeWidth={1.5} />
              </g>
            )}
          </Group>

          {!displayExplode && (
            <g className="axis-labels" style={{ pointerEvents: 'none' }}>
              <text x={6} y={height / 2 + 3} className="axis-label axis-label-edge">
                {t('tour.s3.xNeg')}
              </text>
              <text
                x={width - 6}
                y={height / 2 + 3}
                textAnchor="end"
                className="axis-label axis-label-edge"
              >
                {t('tour.s3.xPos')}
              </text>
              <text x={width / 2} y={12} textAnchor="middle" className="axis-label axis-label-edge">
                {t('tour.s3.yPos')}
              </text>
              <text
                x={width / 2}
                y={height - 6}
                textAnchor="middle"
                className="axis-label axis-label-edge"
              >
                {t('tour.s3.yNeg')}
              </text>
              {you && (
                <text
                  x={(xScale(you.x) ?? 0) + MARGIN.left}
                  y={(yScale(you.y) ?? 0) + MARGIN.top + 12}
                  textAnchor="middle"
                  className="point-label voter-label"
                >
                  {t('tour.s3.you')}
                </text>
              )}
            </g>
          )}
        </svg>

        <div
          className={`compass-tooltip-overlay ${hovered && hoverTarget && !emmaFocus ? 'visible' : ''}`}
          role="status"
          aria-live="polite"
          aria-hidden={!(hovered && hoverTarget && !emmaFocus)}
        >
          <strong>{tipName || '\u00a0'}</strong>
          <span>
            {hoverTarget && tipPref ? `${t('tour.prefers')}: ${tipPref}` : '\u00a0'}
          </span>
        </div>

        {tacticalCallout && !displayExplode && (
          <aside
            className={`emma-rail ${railOpen ? 'open' : ''}`}
            onMouseEnter={() => setRailPinned(true)}
            onMouseLeave={() => setRailPinned(false)}
          >
            <button
              type="button"
              className="emma-rail-tab"
              aria-expanded={railOpen}
              aria-controls="emma-rail-panel"
              onClick={() => setRailPinned((v) => !v)}
            >
              {tacticalCallout.voterName}
            </button>
            <div
              id="emma-rail-panel"
              className="emma-rail-panel"
              aria-hidden={!railOpen}
            >
              <p className="emma-rail-row">
                <span className="emma-rail-label">{t('tour.s6.true')}</span>
                <span>
                  {tacticalCallout.trueParty.emoji}{' '}
                  {t(`tour.party.${tacticalCallout.trueParty.labelKey}`)}
                </span>
              </p>
              <p className="emma-rail-row emma-rail-tact">
                <span className="emma-rail-label">{t('tour.s6.tact')}</span>
                <span>
                  {tacticalCallout.tactParty.emoji}{' '}
                  {t(`tour.party.${tacticalCallout.tactParty.labelKey}`)}
                </span>
              </p>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}

export function Compass({
  parties = [],
  voters = [],
  crowd = false,
  you,
  onPlaceYou,
  showVoronoi = false,
  hoverPrefs = false,
  overrideLinks,
  tacticalCallout,
  explode = false,
  dimCountLabel,
  onToggleExplode,
}: {
  parties?: CompassPoint[]
  voters?: CompassPoint[]
  crowd?: boolean
  you?: { x: number; y: number } | null
  onPlaceYou?: (x: number, y: number) => void
  showVoronoi?: boolean
  hoverPrefs?: boolean
  overrideLinks?: Record<string, string>
  tacticalCallout?: TacticalCallout
  explode?: boolean
  dimCountLabel?: string
  onToggleExplode?: () => void
}) {
  const dots: HoverDot[] = useMemo(() => {
    const named: HoverDot[] = voters.map((v) => ({
      id: v.id,
      x: v.x,
      y: v.y,
      name: v.name ?? v.labelKey,
      color: v.id === 'emma' ? v.color : undefined,
    }))
    if (!crowd) return named
    return [
      ...named,
      ...TOUR_CROWD.map((c) => ({
        id: c.id,
        x: c.x,
        y: c.y,
        name: c.name,
      })),
    ]
  }, [voters, crowd])

  const frameRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState(DEFAULT_CHART)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = frameRef.current
    if (!el) return

    const measure = () => {
      const w = el.clientWidth
      if (w >= MIN_CHART) setSize(Math.floor(w))
      else if (w > 0) setSize(MIN_CHART)
      setReady(true)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div className={`compass-frame ${ready ? 'is-ready' : ''}`} ref={frameRef}>
      <CompassChart
        width={size}
        height={size}
        parties={parties}
        dots={dots}
        you={you}
        onPlaceYou={onPlaceYou}
        showVoronoi={showVoronoi}
        hoverPrefs={hoverPrefs}
        overrideLinks={overrideLinks}
        tacticalCallout={tacticalCallout}
        explode={explode}
        dimCountLabel={dimCountLabel}
        onToggleExplode={onToggleExplode}
      />
    </div>
  )
}
