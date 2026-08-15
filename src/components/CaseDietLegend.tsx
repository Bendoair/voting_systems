import { useMemo } from 'react'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { GridRows } from '@visx/grid'
import { Group } from '@visx/group'
import { scaleLinear } from '@visx/scale'
import { Bar } from '@visx/shape'
import type { Party } from '../engines/types'
import { dietTone } from '../data/diet'
import { useI18n } from '../i18n'

const W = 640
const H = 320
const MARGIN = { top: 36, right: 28, bottom: 56, left: 52 }
const X_PAD = 0.45
const BAR_HALF = 0.16

type StackSeg = {
  party: Party
  lean: number
  y0: number
  y1: number
}

function buildStacks(parties: Party[]): StackSeg[] {
  const byLean = new Map<number, Party[]>()
  for (const p of parties) {
    const lean = p.dietLean ?? 0
    const list = byLean.get(lean) ?? []
    list.push(p)
    byLean.set(lean, list)
  }
  const segs: StackSeg[] = []
  for (const [lean, group] of byLean) {
    const ordered = [...group].sort((a, b) => b.popularity - a.popularity)
    let y0 = 0
    for (const party of ordered) {
      const y1 = y0 + party.popularity
      segs.push({ party, lean, y0, y1 })
      y0 = y1
    }
  }
  return segs
}

/** Parties as a visx bar chart: X = diet lean, Y = vote % (stacked if same lean). */
export function CaseDietLegend({ parties }: { parties: Party[] }) {
  const { t } = useI18n()
  const meatVotes = parties
    .filter((p) => (p.dietLean ?? 0) < 0)
    .reduce((a, p) => a + p.popularity, 0)
  const plantVotes = parties
    .filter((p) => (p.dietLean ?? 0) > 0)
    .reduce((a, p) => a + p.popularity, 0)

  const innerW = W - MARGIN.left - MARGIN.right
  const innerH = H - MARGIN.top - MARGIN.bottom

  const segs = useMemo(() => buildStacks(parties), [parties])
  const yMax = useMemo(() => {
    const tops = new Map<number, number>()
    for (const s of segs) tops.set(s.lean, Math.max(tops.get(s.lean) ?? 0, s.y1))
    const peak = tops.size ? Math.max(...tops.values()) : 0
    return Math.max(45, peak) + 4
  }, [segs])

  const xScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: [-1 - X_PAD, 1 + X_PAD],
        range: [0, innerW],
      }),
    [innerW],
  )
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: [0, yMax],
        range: [innerH, 0],
        nice: true,
      }),
    [innerH, yMax],
  )

  const midX = xScale(0) ?? 0
  const barW = Math.abs((xScale(BAR_HALF) ?? 0) - (xScale(-BAR_HALF) ?? 0))

  return (
    <aside className="case-diet-legend" aria-label={t('case.diet.title')}>
      <div className="case-diet-legend-head">
        <h2>{t('case.diet.title')}</h2>
        <p>{t('case.diet.blurb')}</p>
      </div>

      <div className="case-diet-plot-wrap">
        <svg
          className="case-diet-plot"
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          height="auto"
          role="img"
          aria-label={t('case.diet.plotAria')}
        >
          <Group left={MARGIN.left} top={MARGIN.top}>
            <rect x={0} y={0} width={midX} height={innerH} className="case-diet-half is-meat" />
            <rect
              x={midX}
              y={0}
              width={Math.max(0, innerW - midX)}
              height={innerH}
              className="case-diet-half is-plant"
            />

            <GridRows
              scale={yScale}
              width={innerW}
              stroke="var(--line)"
              numTicks={5}
            />

            <line x1={midX} x2={midX} y1={0} y2={innerH} className="case-diet-grid-mid" />
            <text x={midX} y={-10} textAnchor="middle" className="case-diet-mid-label">
              {t('sim.diet.mid')}
            </text>

            {segs.map((s) => {
              const cx = xScale(s.lean) ?? 0
              const x = cx - barW / 2
              const y = yScale(s.y1) ?? 0
              const yBase = yScale(s.y0) ?? innerH
              const h = Math.max(0, yBase - y)
              return (
                <g key={`${s.party.id}-${s.lean}`}>
                  <title>
                    {`${s.party.name}: ${t(`sim.diet.${dietTone(s.lean)}`)} · ${s.party.popularity}%`}
                  </title>
                  <Bar
                    x={x}
                    y={y}
                    width={barW}
                    height={h}
                    fill={s.party.color}
                    rx={4}
                    className="case-diet-bar"
                  />
                  {h > 16 && (
                    <text
                      x={cx}
                      y={y + h / 2 + 4}
                      textAnchor="middle"
                      className="case-diet-seg-label"
                    >
                      {s.party.fruit} {s.party.popularity}%
                    </text>
                  )}
                </g>
              )
            })}

            <AxisLeft
              scale={yScale}
              numTicks={5}
              tickFormat={(v) => `${v}%`}
              stroke="var(--ink)"
              tickStroke="var(--ink)"
              tickLabelProps={() => ({
                fill: 'var(--ink-soft)',
                fontSize: 11,
                textAnchor: 'end' as const,
                dx: -4,
                dy: 3,
              })}
              label={t('case.diet.yAxis')}
              labelProps={{
                fill: 'var(--ink)',
                fontSize: 12,
                fontWeight: 700,
                textAnchor: 'middle',
              }}
              labelOffset={36}
            />
            <AxisBottom
              top={innerH}
              scale={xScale}
              tickValues={[-1, -0.5, 0, 0.5, 1]}
              tickFormat={(v) => {
                const n = Number(v)
                if (n === -1) return t('sim.diet.meat')
                if (n === 1) return t('sim.diet.plant')
                if (n === 0) return t('sim.diet.mid')
                return ''
              }}
              stroke="var(--ink)"
              tickStroke="var(--ink)"
              tickLabelProps={(v) => ({
                fill: 'var(--ink-soft)',
                fontSize: 11,
                fontWeight: 700,
                textAnchor:
                  Number(v) === 0
                    ? ('middle' as const)
                    : Number(v) < 0
                      ? ('start' as const)
                      : ('end' as const),
                dy: 4,
              })}
              label={t('case.diet.xAxis')}
              labelProps={{
                fill: 'var(--ink)',
                fontSize: 12,
                fontWeight: 700,
                textAnchor: 'middle',
              }}
              labelOffset={32}
            />
          </Group>
        </svg>
      </div>

      <ul className="case-diet-legend-list">
        {parties
          .slice()
          .sort((a, b) => (a.dietLean ?? 0) - (b.dietLean ?? 0))
          .map((p) => (
            <li key={p.id}>
              <span className="case-diet-swatch" style={{ background: p.color }} />
              {p.fruit} {p.name}{' '}
              <em>
                {p.popularity}% · {t(`sim.diet.${dietTone(p.dietLean ?? 0)}`)}
              </em>
            </li>
          ))}
      </ul>

      <p className="case-diet-camps muted">
        {t('case.diet.camps')
          .replace('{meat}', String(meatVotes))
          .replace('{plant}', String(plantVotes))}
      </p>
    </aside>
  )
}
