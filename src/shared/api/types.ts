/**
 * Types de la réponse brute de l'API ClinicalTrials.gov v2.
 * Seul le sous-ensemble utilisé par l'app est typé. Tout est optionnel :
 * l'API omet les champs vides.
 *
 * ⚠️ Les composants ne doivent JAMAIS importer ces types.
 * Ils utilisent les modèles de `models.ts`, produits par `mappers.ts`.
 */

export const OVERALL_STATUSES = [
  'RECRUITING',
  'NOT_YET_RECRUITING',
  'ACTIVE_NOT_RECRUITING',
  'ENROLLING_BY_INVITATION',
  'COMPLETED',
  'TERMINATED',
  'SUSPENDED',
  'WITHDRAWN',
  'UNKNOWN',
  'AVAILABLE',
  'NO_LONGER_AVAILABLE',
  'TEMPORARILY_NOT_AVAILABLE',
  'APPROVED_FOR_MARKETING',
  'WITHHELD',
] as const

export type OverallStatus = (typeof OVERALL_STATUSES)[number]

export const PHASES = ['EARLY_PHASE1', 'PHASE1', 'PHASE2', 'PHASE3', 'PHASE4', 'NA'] as const

export type Phase = (typeof PHASES)[number]

export interface RawDateStruct {
  date?: string
  type?: 'ACTUAL' | 'ESTIMATED'
}

export interface RawLocation {
  facility?: string
  city?: string
  state?: string
  country?: string
  status?: string
}

export interface RawIntervention {
  type?: string
  name?: string
  description?: string
}

export interface RawProtocolSection {
  identificationModule?: {
    nctId?: string
    briefTitle?: string
    officialTitle?: string
  }
  statusModule?: {
    overallStatus?: OverallStatus
    startDateStruct?: RawDateStruct
    primaryCompletionDateStruct?: RawDateStruct
    lastUpdatePostDateStruct?: RawDateStruct
  }
  sponsorCollaboratorsModule?: {
    leadSponsor?: { name?: string; class?: string }
  }
  descriptionModule?: {
    briefSummary?: string
  }
  conditionsModule?: {
    conditions?: string[]
    keywords?: string[]
  }
  designModule?: {
    phases?: Phase[]
    enrollmentInfo?: { count?: number; type?: 'ACTUAL' | 'ESTIMATED' }
  }
  armsInterventionsModule?: {
    interventions?: RawIntervention[]
  }
  eligibilityModule?: {
    eligibilityCriteria?: string
    minimumAge?: string
    maximumAge?: string
    sex?: 'ALL' | 'FEMALE' | 'MALE'
    healthyVolunteers?: boolean
  }
  contactsLocationsModule?: {
    locations?: RawLocation[]
  }
}

export interface RawStudy {
  protocolSection?: RawProtocolSection
  hasResults?: boolean
}

export interface RawSearchResponse {
  totalCount?: number
  studies?: RawStudy[]
  nextPageToken?: string
}
