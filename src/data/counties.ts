import type { Region, District } from '../engines/types'

/** County metadata keyed to GeoJSON `megye` property */
export const REGIONS: Region[] = [
  { id: 'budapest', nameHu: 'Budapest', nameEn: 'Budapest', megye: 'Budapest', population: 17.0, dietBaseline: 1 },
  { id: 'pest', nameHu: 'Pest', nameEn: 'Pest', megye: 'Pest', population: 13.0, dietBaseline: 0.5 },
  { id: 'gyor', nameHu: 'Győr-Moson-Sopron', nameEn: 'Győr-Moson-Sopron', megye: 'Győr-Moson-Sopron', population: 4.7, dietBaseline: 0 },
  { id: 'komarom', nameHu: 'Komárom-Esztergom', nameEn: 'Komárom-Esztergom', megye: 'Komárom-Esztergom', population: 3.0, dietBaseline: 0 },
  { id: 'fejer', nameHu: 'Fejér', nameEn: 'Fejér', megye: 'Fejér', population: 4.2, dietBaseline: 0 },
  { id: 'veszprem', nameHu: 'Veszprém', nameEn: 'Veszprém', megye: 'Veszprém', population: 3.4, dietBaseline: 0 },
  { id: 'vas', nameHu: 'Vas', nameEn: 'Vas', megye: 'Vas', population: 2.5, dietBaseline: 0 },
  { id: 'zala', nameHu: 'Zala', nameEn: 'Zala', megye: 'Zala', population: 2.7, dietBaseline: -0.5 },
  { id: 'somogy', nameHu: 'Somogy', nameEn: 'Somogy', megye: 'Somogy', population: 3.0, dietBaseline: -0.5 },
  { id: 'tolna', nameHu: 'Tolna', nameEn: 'Tolna', megye: 'Tolna', population: 2.1, dietBaseline: -0.5 },
  { id: 'baranya', nameHu: 'Baranya', nameEn: 'Baranya', megye: 'Baranya', population: 3.6, dietBaseline: 0 },
  { id: 'bacs', nameHu: 'Bács-Kiskun', nameEn: 'Bács-Kiskun', megye: 'Bács-Kiskun', population: 5.0, dietBaseline: -0.5 },
  { id: 'csongrad', nameHu: 'Csongrád-Csanád', nameEn: 'Csongrád-Csanád', megye: 'Csongrád-Csanád', population: 4.0, dietBaseline: -0.5 },
  { id: 'bekes', nameHu: 'Békés', nameEn: 'Békés', megye: 'Békés', population: 3.4, dietBaseline: -0.5 },
  { id: 'jasz', nameHu: 'Jász-Nagykun-Szolnok', nameEn: 'Jász-Nagykun-Szolnok', megye: 'Jász-Nagykun-Szolnok', population: 3.7, dietBaseline: -0.5 },
  { id: 'hajdu', nameHu: 'Hajdú-Bihar', nameEn: 'Hajdú-Bihar', megye: 'Hajdú-Bihar', population: 5.3, dietBaseline: -0.5 },
  { id: 'szabolcs', nameHu: 'Szabolcs-Szatmár-Bereg', nameEn: 'Szabolcs-Szatmár-Bereg', megye: 'Szabolcs-Szatmár-Bereg', population: 5.5, dietBaseline: -1 },
  { id: 'borsod', nameHu: 'Borsod-Abaúj-Zemplén', nameEn: 'Borsod-Abaúj-Zemplén', megye: 'Borsod-Abaúj-Zemplén', population: 6.4, dietBaseline: -1 },
  { id: 'heves', nameHu: 'Heves', nameEn: 'Heves', megye: 'Heves', population: 2.9, dietBaseline: -0.5 },
  { id: 'nograd', nameHu: 'Nógrád', nameEn: 'Nógrád', megye: 'Nógrád', population: 1.9, dietBaseline: -0.5 },
]

export function getDefaultDietBaselines(): Record<string, number> {
  return Object.fromEntries(REGIONS.map((r) => [r.id, r.dietBaseline]))
}

export const MEGYE_TO_REGION: Record<string, string> = Object.fromEntries(
  REGIONS.map((r) => [r.megye, r.id]),
)

/** Build districts proportional to population / seat budget */
export function buildDistricts(totalDistrictSeats: number): District[] {
  const totalPop = REGIONS.reduce((a, r) => a + r.population, 0)
  const districts: District[] = []
  let assigned = 0

  const quotas = REGIONS.map((r) => ({
    region: r,
    exact: (r.population / totalPop) * totalDistrictSeats,
  }))

  const floors = quotas.map((q) => ({
    region: q.region,
    n: Math.max(1, Math.floor(q.exact)),
    frac: q.exact - Math.floor(q.exact),
  }))
  assigned = floors.reduce((a, f) => a + f.n, 0)
  while (assigned > totalDistrictSeats) {
    const richest = [...floors].sort((a, b) => b.n - a.n)[0]!
    if (richest.n > 1) {
      richest.n--
      assigned--
    } else break
  }
  const byFrac = [...floors].sort((a, b) => b.frac - a.frac)
  let i = 0
  while (assigned < totalDistrictSeats && i < byFrac.length * 3) {
    byFrac[i % byFrac.length]!.n++
    assigned++
    i++
  }

  for (const f of floors) {
    for (let d = 0; d < f.n; d++) {
      districts.push({
        id: `${f.region.id}-d${d + 1}`,
        regionId: f.region.id,
        name: `${f.region.nameHu} ${d + 1}.`,
        weight: 1 / f.n,
      })
    }
  }
  return districts
}
