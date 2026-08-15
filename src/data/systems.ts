import type { SystemId } from '../engines/types'

export interface SystemMeta {
  id: SystemId
  usesDistricts: boolean
  usesList: boolean
  proportional: boolean
}

export const SYSTEMS: SystemMeta[] = [
  { id: 'local', usesDistricts: true, usesList: false, proportional: false },
  { id: 'closed-list', usesDistricts: false, usesList: true, proportional: true },
  { id: 'mixed', usesDistricts: true, usesList: true, proportional: false },
  { id: 'open-list', usesDistricts: false, usesList: true, proportional: true },
  { id: 'ranked', usesDistricts: true, usesList: false, proportional: false },
  { id: 'two-round', usesDistricts: true, usesList: false, proportional: false },
]

export const SYSTEM_IDS = SYSTEMS.map((s) => s.id)
