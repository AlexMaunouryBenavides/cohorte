import type { OverallStatus, Phase } from './types'

/** Une date partielle de l'API : `YYYY-MM` ou `YYYY-MM-DD`. */
export interface PartialDate {
  value: string
  isEstimated: boolean
}

/** Ligne de résultat de recherche. */
export interface StudySummary {
  nctId: string
  title: string
  status: OverallStatus | null
  phases: Phase[]
  startDate: PartialDate | null
  lastUpdate: string | null
  enrollment: number | null
  sponsor: string | null
  /** Pays dédoublonnés, dans l'ordre d'apparition. */
  countries: string[]
}

export interface StudyLocation {
  facility: string | null
  city: string | null
  country: string | null
  status: string | null
}

export interface StudyIntervention {
  name: string
  type: string | null
}

export interface StudyDetail extends StudySummary {
  officialTitle: string | null
  summary: string | null
  conditions: string[]
  keywords: string[]
  interventions: StudyIntervention[]
  primaryCompletionDate: PartialDate | null
  /** Texte brut de l'API. Le parsing inclusion / exclusion est à faire (COH-11). */
  eligibilityCriteria: string | null
  minimumAge: string | null
  maximumAge: string | null
  sex: 'ALL' | 'FEMALE' | 'MALE' | null
  locations: StudyLocation[]
}

export interface StudySearchResult {
  total: number
  studies: StudySummary[]
  /** `null` sur la dernière page. */
  nextPageToken: string | null
}
