import type {
  PartialDate,
  StudyDetail,
  StudyIntervention,
  StudyLocation,
  StudySearchResult,
  StudySummary,
} from './models'
import type { RawDateStruct, RawSearchResponse, RawStudy } from './types'

function toPartialDate(struct: RawDateStruct | undefined): PartialDate | null {
  if (!struct?.date) return null
  return { value: struct.date, isEstimated: struct.type === 'ESTIMATED' }
}

function unique<T>(values: T[]): T[] {
  return [...new Set(values)]
}

export function toStudySummary(raw: RawStudy): StudySummary {
  const p = raw.protocolSection ?? {}

  const countries = unique(
    (p.contactsLocationsModule?.locations ?? [])
      .map((location) => location.country)
      .filter((country): country is string => Boolean(country)),
  )

  return {
    nctId: p.identificationModule?.nctId ?? '',
    title: p.identificationModule?.briefTitle ?? 'Titre non renseigné',
    status: p.statusModule?.overallStatus ?? null,
    phases: p.designModule?.phases ?? [],
    startDate: toPartialDate(p.statusModule?.startDateStruct),
    lastUpdate: p.statusModule?.lastUpdatePostDateStruct?.date ?? null,
    enrollment: p.designModule?.enrollmentInfo?.count ?? null,
    sponsor: p.sponsorCollaboratorsModule?.leadSponsor?.name ?? null,
    countries,
  }
}

export function toStudyDetail(raw: RawStudy): StudyDetail {
  const p = raw.protocolSection ?? {}
  const eligibility = p.eligibilityModule

  const interventions: StudyIntervention[] = (p.armsInterventionsModule?.interventions ?? [])
    .filter((i) => Boolean(i.name))
    .map((i) => ({ name: i.name as string, type: i.type ?? null }))

  const locations: StudyLocation[] = (p.contactsLocationsModule?.locations ?? []).map((l) => ({
    facility: l.facility ?? null,
    city: l.city ?? null,
    country: l.country ?? null,
    status: l.status ?? null,
  }))

  return {
    ...toStudySummary(raw),
    officialTitle: p.identificationModule?.officialTitle ?? null,
    summary: p.descriptionModule?.briefSummary ?? null,
    conditions: p.conditionsModule?.conditions ?? [],
    keywords: p.conditionsModule?.keywords ?? [],
    interventions,
    primaryCompletionDate: toPartialDate(p.statusModule?.primaryCompletionDateStruct),
    eligibilityCriteria: eligibility?.eligibilityCriteria ?? null,
    minimumAge: eligibility?.minimumAge ?? null,
    maximumAge: eligibility?.maximumAge ?? null,
    sex: eligibility?.sex ?? null,
    locations,
  }
}

export function toStudySearchResult(raw: RawSearchResponse): StudySearchResult {
  return {
    total: raw.totalCount ?? 0,
    studies: (raw.studies ?? []).map(toStudySummary),
    nextPageToken: raw.nextPageToken ?? null,
  }
}
