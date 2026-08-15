import { useEffect, useMemo, useState } from 'react'
import { geoMercator, geoPath, type GeoPermissibleObjects } from 'd3-geo'
import type { Feature, FeatureCollection, Geometry } from 'geojson'
import type { Region } from '../engines/types'
import { MEGYE_TO_REGION } from '../data/counties'
import { dietTone } from '../data/diet'
import { colorForDiet } from '../utils/mapColor'
import { useI18n } from '../i18n'

type CountyFeature = Feature<Geometry, { megye: string }>

const W = 420
const H = 280
const PAD = 10

/** Compact county map colored by meat↔plant baseline (not election winners). */
export function CaseDietGeoMap({ regions }: { regions: Region[] }) {
  const { t, locale } = useI18n()
  const [countyGeo, setCountyGeo] = useState<FeatureCollection<Geometry, { megye: string }> | null>(
    null,
  )
  const [hoverId, setHoverId] = useState<string | null>(null)

  const baselineById = useMemo(
    () => Object.fromEntries(regions.map((r) => [r.id, r.dietBaseline ?? 0])),
    [regions],
  )
  const regionById = useMemo(
    () => Object.fromEntries(regions.map((r) => [r.id, r])),
    [regions],
  )

  useEffect(() => {
    let cancelled = false
    fetch('/maps/hungary-counties.geojson')
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status))
        return r.json()
      })
      .then((geo) => {
        if (!cancelled) setCountyGeo(geo)
      })
      .catch(() => {
        if (!cancelled) setCountyGeo(null)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const pathGen = useMemo(() => {
    if (!countyGeo) return null
    const projection = geoMercator().fitExtent(
      [
        [PAD, PAD],
        [W - PAD, H - PAD],
      ],
      countyGeo,
    )
    projection.clipExtent([
      [0, 0],
      [W, H],
    ])
    return geoPath(projection)
  }, [countyGeo])

  const features = (countyGeo?.features ?? []) as CountyFeature[]
  const hoverRegion = hoverId ? regionById[hoverId] : null
  const hoverLean = hoverId != null ? (baselineById[hoverId] ?? 0) : null

  return (
    <div className="case-diet-geo-map">
      {pathGen && (
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="case-diet-geo-svg"
          role="img"
          aria-label={t('case.geo.mapAria')}
        >
          <rect width={W} height={H} fill="var(--paper-2)" rx={8} />
          {features.map((f, i) => {
            const megye = f.properties.megye
            const regionId = MEGYE_TO_REGION[megye]
            const lean = regionId != null ? (baselineById[regionId] ?? 0) : 0
            const d = pathGen(f as GeoPermissibleObjects) ?? ''
            if (!d) return null
            const active = hoverId === regionId
            return (
              <path
                key={`${megye}-${i}`}
                d={d}
                fill={colorForDiet(lean)}
                fillOpacity={active ? 1 : 0.92}
                stroke="var(--ink)"
                strokeWidth={active ? 1.4 : 0.7}
                onMouseEnter={() => regionId && setHoverId(regionId)}
                onMouseLeave={() => setHoverId(null)}
              >
                <title>
                  {megye}
                  {regionId
                    ? ` — ${t(`sim.diet.${dietTone(lean)}`)}`
                    : ''}
                </title>
              </path>
            )
          })}
        </svg>
      )}
      <div className="case-diet-geo-legend" aria-hidden>
        <span className="case-diet-geo-swatch is-meat" />
        {t('sim.diet.meat')}
        <span className="case-diet-geo-swatch is-mid" />
        {t('sim.diet.mid')}
        <span className="case-diet-geo-swatch is-plant" />
        {t('sim.diet.plant')}
      </div>
      <p
        className={`case-diet-geo-hover muted ${hoverRegion && hoverLean != null ? 'is-hot' : ''}`}
        aria-hidden={!(hoverRegion && hoverLean != null)}
      >
        {hoverRegion && hoverLean != null
          ? `${locale === 'hu' ? hoverRegion.nameHu : hoverRegion.nameEn} · ${t(`sim.diet.${dietTone(hoverLean)}`)}`
          : '\u00a0'}
      </p>
    </div>
  )
}
