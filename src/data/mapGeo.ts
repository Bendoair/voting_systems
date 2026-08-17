import type { FeatureCollection, Geometry } from 'geojson'

type CountyProps = { megye: string }
type OevkProps = { id: string; name: string; regionId: string; center?: string }

let countiesPromise: Promise<FeatureCollection<Geometry, CountyProps>> | null = null
let oevkPromise: Promise<FeatureCollection<Geometry, OevkProps>> | null = null

async function fetchJson<T>(url: string): Promise<T> {
  const r = await fetch(url)
  if (!r.ok) throw new Error(String(r.status))
  return r.json() as Promise<T>
}

export function loadCountyGeo() {
  countiesPromise ??= fetchJson('/maps/hungary-counties.geojson')
  return countiesPromise
}

export function loadOevkGeo() {
  oevkPromise ??= fetchJson('/maps/hungary-oevk.geojson')
  return oevkPromise
}

export function loadHungaryMaps() {
  return Promise.all([loadCountyGeo(), loadOevkGeo()])
}
