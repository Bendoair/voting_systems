import { REGIONS } from './counties'
import { OEVK_DISTRICTS } from './oevkDistricts'
import { runElection, type ElectionResult, type Party, type Region, type SystemId } from '../engines'

/** Same frozen lineup for every case-study scene */
const PARTY_BASE = [
  {
    id: 'apple',
    color: '#C62828',
    fruit: '🍎',
    popularity: 44,
    dietLean: 1,
    nameHu: 'Alma',
    nameEn: 'Apple',
  },
  {
    id: 'grape',
    color: '#6A1B9A',
    fruit: '🍇',
    popularity: 15,
    dietLean: -0.5,
    nameHu: 'Szőlő',
    nameEn: 'Grape',
  },
  {
    id: 'orange',
    color: '#EF6C00',
    fruit: '🍊',
    popularity: 14,
    dietLean: -1,
    nameHu: 'Narancs',
    nameEn: 'Orange',
  },
  {
    id: 'banana',
    color: '#E6B800',
    fruit: '🍌',
    popularity: 14,
    dietLean: -0.5,
    nameHu: 'Banán',
    nameEn: 'Banana',
  },
  {
    id: 'lime',
    color: '#2E7D32',
    fruit: '🍋‍🟩',
    popularity: 13,
    dietLean: -1,
    nameHu: 'Lime',
    nameEn: 'Lime',
  },
] as const

/** East/meat vs capital/plant — strong enough for map contrast, not total lock-in */
const BASELINE_BY_REGION: Record<string, number> = {
  budapest: 1,
  pest: 0.5,
  gyor: 0.5,
  komarom: 0,
  fejer: 0,
  veszprem: 0,
  vas: -0.5,
  zala: -0.5,
  somogy: -0.5,
  tolna: -0.5,
  baranya: -0.5,
  bacs: -0.5,
  csongrad: -0.5,
  bekes: -1,
  jasz: -0.5,
  hajdu: -1,
  szabolcs: -1,
  borsod: -1,
  heves: -0.5,
  nograd: -0.5,
}

export const CASE_POLARIZATION = 0.7
export const CASE_TOTAL_SEATS = 199
export const CASE_DISTRICT_SEATS = 106

export function getCaseStudyParties(locale: 'hu' | 'en'): Party[] {
  return PARTY_BASE.map((p) => ({
    id: p.id,
    color: p.color,
    fruit: p.fruit,
    popularity: p.popularity,
    dietLean: p.dietLean,
    name: locale === 'en' ? p.nameEn : p.nameHu,
  }))
}

export function getCaseStudyRegions(): Region[] {
  return REGIONS.map((r) => ({
    ...r,
    dietBaseline: BASELINE_BY_REGION[r.id] ?? r.dietBaseline,
  }))
}

export type CaseScenarioId = 'list' | 'fptp' | 'ranked' | 'two-round'

export function runCaseScenario(id: CaseScenarioId, locale: 'hu' | 'en'): {
  parties: Party[]
  regions: Region[]
  result: ElectionResult
  system: SystemId
} {
  const parties = getCaseStudyParties(locale)
  const regions = getCaseStudyRegions()
  const districts = OEVK_DISTRICTS

  if (id === 'list') {
    return {
      parties,
      regions,
      system: 'closed-list',
      result: runElection('closed-list', {
        parties,
        regions,
        districts,
        totalSeats: CASE_TOTAL_SEATS,
        polarization: CASE_POLARIZATION,
      }),
    }
  }

  const system: SystemId =
    id === 'fptp' ? 'local' : id === 'ranked' ? 'ranked' : 'two-round'

  return {
    parties,
    regions,
    system,
    result: runElection(system, {
      parties,
      regions,
      districts,
      totalSeats: CASE_DISTRICT_SEATS,
      polarization: CASE_POLARIZATION,
    }),
  }
}

export function seatHighlight(result: ElectionResult, partyId: string) {
  const row = result.seats.find((s) => s.partyId === partyId)
  if (!row) return { votes: 0, seats: 0, seatPct: 0 }
  return {
    votes: row.voteShare * 100,
    seats: row.seats,
    seatPct: row.seatShare * 100,
  }
}

/** Meat (−) vs plant (+) camp seats for preference-alignment callouts. */
export function dietCampHighlight(result: ElectionResult, parties: Party[]) {
  const meatIds = new Set(parties.filter((p) => (p.dietLean ?? 0) < 0).map((p) => p.id))
  const plantIds = new Set(parties.filter((p) => (p.dietLean ?? 0) > 0).map((p) => p.id))
  let meatSeats = 0
  let plantSeats = 0
  let meatVotes = 0
  let plantVotes = 0
  let total = 0
  for (const s of result.seats) {
    total += s.seats
    if (meatIds.has(s.partyId)) {
      meatSeats += s.seats
      meatVotes += s.voteShare
    } else if (plantIds.has(s.partyId)) {
      plantSeats += s.seats
      plantVotes += s.voteShare
    }
  }
  return {
    meatVotes: meatVotes * 100,
    plantVotes: plantVotes * 100,
    meatSeats,
    plantSeats,
    meatSeatPct: total > 0 ? (meatSeats / total) * 100 : 0,
    plantSeatPct: total > 0 ? (plantSeats / total) * 100 : 0,
  }
}
