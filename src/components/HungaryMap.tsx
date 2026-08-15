import { useEffect, useMemo, useState } from 'react'
import { geoMercator, geoPath, type GeoPermissibleObjects } from 'd3-geo'
import type { Feature, FeatureCollection, Geometry } from 'geojson'
import type { District, DistrictWinner, Party, Region } from '../engines/types'
import { MEGYE_TO_REGION } from '../data/counties'
import { colorForLead, voteLead } from '../utils/mapColor'
import { useI18n } from '../i18n'
import { useTheme } from '../theme'

type CountyFeature = Feature<Geometry, { megye: string }>
type OevkProps = { id: string; name: string; regionId: string; center?: string }
type OevkFeature = Feature<Geometry, OevkProps>

const W = 760
const H = 480
const PAD = 12

const HU_EXTENT: [[number, number], [number, number]] = [
  [16.05, 45.7],
  [22.95, 48.65],
]

export function HungaryMap({
  regions,
  districts,
  leaders,
  regionShares,
  districtShares,
  districtWinners = [],
  parties,
  initialDistrictView = false,
  lockDistrictView = false,
  hideMapNote = false,
}: {
  regions: Region[]
  districts: District[]
  leaders: Record<string, string>
  regionShares: Record<string, Record<string, number>>
  districtShares: Record<string, Record<string, number>>
  /** When set, map colors use seat winners (not first-preference lead). */
  districtWinners?: DistrictWinner[]
  parties: Party[]
  /** Start in (or lock to) OEVK district view */
  initialDistrictView?: boolean
  /** Hide the county/district toggle */
  lockDistrictView?: boolean
  hideMapNote?: boolean
}) {
  const { t, locale } = useI18n()
  const { theme } = useTheme()
  const [countyGeo, setCountyGeo] = useState<FeatureCollection<Geometry, { megye: string }> | null>(
    null,
  )
  const [oevkGeo, setOevkGeo] = useState<FeatureCollection<Geometry, OevkProps> | null>(null)
  const [hoverKey, setHoverKey] = useState<string | null>(null)
  const [error, setError] = useState(false)
  const [districtView, setDistrictView] = useState(initialDistrictView)

  useEffect(() => {
    let cancelled = false
    Promise.all([
      fetch('/maps/hungary-counties.geojson').then((r) => {
        if (!r.ok) throw new Error(String(r.status))
        return r.json()
      }),
      fetch('/maps/hungary-oevk.geojson').then((r) => {
        if (!r.ok) throw new Error(String(r.status))
        return r.json()
      }),
    ])
      .then(([counties, oevk]) => {
        if (cancelled) return
        setCountyGeo(counties)
        setOevkGeo(oevk)
        setError(false)
      })
      .catch(() => {
        if (!cancelled) {
          setCountyGeo(null)
          setOevkGeo(null)
          setError(true)
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  const pathGen = useMemo(() => {
    if (!countyGeo && !oevkGeo) return null
    const projection = geoMercator().fitExtent(
      [
        [PAD, PAD],
        [W - PAD, H - PAD],
      ],
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [HU_EXTENT[0][0], HU_EXTENT[0][1]],
              [HU_EXTENT[0][0], HU_EXTENT[1][1]],
              [HU_EXTENT[1][0], HU_EXTENT[1][1]],
              [HU_EXTENT[1][0], HU_EXTENT[0][1]],
              [HU_EXTENT[0][0], HU_EXTENT[0][1]],
            ],
          ],
        },
      },
    )
    projection.clipExtent([
      [0, 0],
      [W, H],
    ])
    return geoPath(projection)
  }, [countyGeo, oevkGeo])

  const countyFeatures = (countyGeo?.features ?? []) as CountyFeature[]
  const oevkFeatures = (oevkGeo?.features ?? []) as OevkFeature[]

  const activeDistrictIds = useMemo(
    () => new Set(Object.keys(districtShares)),
    [districtShares],
  )

  const winnerByDistrict = useMemo(() => {
    const m: Record<string, string> = {}
    for (const w of districtWinners) m[w.districtId] = w.partyId
    return m
  }, [districtWinners])

  const colorByWinners = districtWinners.length > 0

  /** regionId → partyId → district seats won (for county wash when coloring by winners). */
  const regionWinShares = useMemo(() => {
    if (!colorByWinners) return {} as Record<string, Record<string, number>>
    const counts: Record<string, Record<string, number>> = {}
    const totals: Record<string, number> = {}
    const regionByDistrict = Object.fromEntries(districts.map((d) => [d.id, d.regionId]))
    for (const w of districtWinners) {
      const rid = regionByDistrict[w.districtId]
      if (!rid) continue
      counts[rid] ??= {}
      counts[rid]![w.partyId] = (counts[rid]![w.partyId] ?? 0) + 1
      totals[rid] = (totals[rid] ?? 0) + 1
    }
    const shares: Record<string, Record<string, number>> = {}
    for (const [rid, byParty] of Object.entries(counts)) {
      const n = totals[rid] || 1
      shares[rid] = Object.fromEntries(
        Object.entries(byParty).map(([pid, c]) => [pid, c / n]),
      )
    }
    return shares
  }, [colorByWinners, districtWinners, districts])

  const regionById = useMemo(
    () => Object.fromEntries(regions.map((r) => [r.id, r])),
    [regions],
  )

  const districtById = useMemo(
    () => Object.fromEntries(districts.map((d) => [d.id, d])),
    [districts],
  )

  const hoverDistrict = hoverKey?.startsWith('d:')
    ? districtById[hoverKey.slice(2)]
    : null
  const hoverOevk =
    hoverKey?.startsWith('d:') && !hoverDistrict
      ? oevkFeatures.find((f) => f.properties.id === hoverKey.slice(2))?.properties
      : null
  const hoverRegionId =
    hoverDistrict?.regionId ??
    hoverOevk?.regionId ??
    (hoverKey?.startsWith('r:') ? hoverKey.slice(2) : null)
  const hoveredRegion = hoverRegionId ? regionById[hoverRegionId] : null

  const hoverDistrictId = hoverKey?.startsWith('d:') ? hoverKey.slice(2) : null
  const hoverShares = hoverDistrictId
    ? districtShares[hoverDistrictId]
    : hoverRegionId
      ? colorByWinners
        ? regionWinShares[hoverRegionId]
        : regionShares[hoverRegionId]
      : undefined
  const hoverStats = voteLead(hoverShares)
  const hoverWinnerId = hoverDistrictId
    ? winnerByDistrict[hoverDistrictId]
    : hoverRegionId
      ? leaders[hoverRegionId]
      : undefined
  const hoverParty = parties.find(
    (p) => p.id === (colorByWinners && hoverWinnerId ? hoverWinnerId : hoverStats.leaderId),
  )
  const hoverTitle = hoverDistrict?.name ?? hoverOevk?.name

  const ready = Boolean(pathGen && countyGeo)

  return (
    <div className={`hungary-map ${districtView ? 'is-district-view' : ''}`}>
      <div className="map-head">
        <h3>{t('sim.map')}</h3>
        {!lockDistrictView && (
          <button
            type="button"
            className="btn ghost map-expand-btn"
            aria-pressed={districtView}
            disabled={!oevkGeo}
            onClick={() => {
              setDistrictView((v) => !v)
              setHoverKey(null)
            }}
          >
            {districtView ? t('sim.mapCountyView') : t('sim.mapDistrictView')}
          </button>
        )}
      </div>
      {!hideMapNote && (
        <p className="muted map-note">
          {districtView ? t('sim.mapNoteDistrict') : t('sim.mapNote')}
        </p>
      )}
      {error && <p className="muted">{t('sim.mapError')}</p>}
      {!error && !ready && <p className="muted">…</p>}
      {ready && pathGen && (
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="hungary-svg is-ready"
          role="img"
          aria-label={t('sim.map')}
          data-theme={theme}
        >
          <rect width={W} height={H} fill="var(--paper-2)" />

          {!districtView &&
            countyFeatures.map((f, i) => {
              const megye = f.properties.megye
              const regionId = MEGYE_TO_REGION[megye]
              const stats = regionId
                ? voteLead(
                    colorByWinners ? regionWinShares[regionId] : regionShares[regionId],
                  )
                : null
              const leaderId =
                (colorByWinners && regionId ? leaders[regionId] : undefined) ||
                stats?.leaderId ||
                (regionId ? leaders[regionId] : undefined)
              const party = leaderId
                ? parties.find((p) => p.id === leaderId)
                : undefined
              const fill = party
                ? colorForLead(party.color, stats?.lead ?? 0)
                : 'var(--map-idle)'
              const d = pathGen(f as GeoPermissibleObjects) ?? ''
              if (!d) return null
              const active = hoverKey === `r:${regionId}`
              return (
                <path
                  key={`${megye}-${i}`}
                  d={d}
                  fill={fill}
                  fillOpacity={active ? 1 : 0.95}
                  stroke="var(--ink)"
                  strokeWidth={active ? 1.8 : 0.9}
                  className="region-path"
                  onMouseEnter={() => regionId && setHoverKey(`r:${regionId}`)}
                  onMouseLeave={() => setHoverKey(null)}
                >
                  <title>
                    {megye}
                    {party ? ` — ${party.fruit} ${party.name}` : ''}
                    {stats ? ` (+${(stats.lead * 100).toFixed(0)}pp)` : ''}
                  </title>
                </path>
              )
            })}

          {districtView &&
            oevkFeatures.map((f) => {
              const { id, name } = f.properties
              const activeSeat = activeDistrictIds.has(id)
              const stats = voteLead(districtShares[id])
              const winnerId = colorByWinners
                ? winnerByDistrict[id]
                : stats.leaderId
              const party = parties.find((p) => p.id === winnerId)
              const washLead =
                colorByWinners && winnerId && winnerId !== stats.leaderId
                  ? Math.max(stats.lead, 0.18)
                  : stats.lead
              const fill = !activeSeat
                ? 'var(--map-empty)'
                : party
                  ? colorForLead(party.color, washLead)
                  : 'var(--map-idle)'
              const d = pathGen(f as GeoPermissibleObjects) ?? ''
              if (!d) return null
              const active = hoverKey === `d:${id}`
              return (
                <path
                  key={id}
                  d={d}
                  fill={fill}
                  fillOpacity={active ? 1 : activeSeat ? 0.95 : 0.55}
                  stroke="var(--ink)"
                  strokeOpacity={0.5}
                  strokeWidth={0.55}
                  className="district-path"
                  onMouseEnter={() => setHoverKey(`d:${id}`)}
                  onMouseLeave={() => setHoverKey(null)}
                >
                  <title>
                    {name}
                    {party ? ` — ${party.fruit} ${party.name}` : ''}
                    {activeSeat && !colorByWinners
                      ? ` (+${(stats.lead * 100).toFixed(0)}pp)`
                      : ''}
                  </title>
                </path>
              )
            })}

          {districtView &&
            countyFeatures.map((f, i) => {
              const d = pathGen(f as GeoPermissibleObjects) ?? ''
              if (!d) return null
              return (
                <path
                  key={`outline-${f.properties.megye}-${i}`}
                  d={d}
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth={1.15}
                  className="county-outline"
                  pointerEvents="none"
                />
              )
            })}
        </svg>
      )}
      <div className={`map-tooltip-slot ${hoveredRegion || hoverTitle ? 'is-hot' : ''}`}>
        <div className="map-tooltip" aria-hidden={!(hoveredRegion || hoverTitle)}>
          <strong>
            {hoveredRegion
              ? locale === 'hu'
                ? hoveredRegion.nameHu
                : hoveredRegion.nameEn
              : '\u00a0'}
            {hoverTitle ? `${hoveredRegion ? ' · ' : ''}${hoverTitle}` : ''}
          </strong>
          {hoverParty ? ` · ${hoverParty.fruit} ${hoverParty.name}` : ''}
          <ul className="map-tooltip-shares" aria-hidden={hoverStats.top.length === 0}>
            {Array.from({ length: 3 }, (_, i) => {
              const row = hoverStats.top[i]
              if (!row) {
                return (
                  <li key={`ph-${i}`} className="map-tooltip-ph">
                    &nbsp;
                  </li>
                )
              }
              const p = parties.find((x) => x.id === row.id)
              return (
                <li key={row.id}>
                  {p?.fruit ?? ''} {p?.name ?? row.id}: {(row.share * 100).toFixed(1)}%
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
