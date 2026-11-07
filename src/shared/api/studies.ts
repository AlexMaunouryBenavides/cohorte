import { apiGet } from './client'
import { toStudyDetail, toStudySearchResult } from './mappers'
import type { StudyDetail, StudySearchResult } from './models'
import type { OverallStatus, Phase, RawSearchResponse, RawStudy } from './types'

export type StudySort = 'lastUpdate' | 'startDate' | 'enrollment'

export interface SearchStudiesParams {
  condition: string
  statuses?: OverallStatus[]
  phases?: Phase[]
  location?: string
  sort?: StudySort
  pageSize?: number
  pageToken?: string
}

/** Champs demandés pour une ligne de résultat (réponse beaucoup plus légère). */
const SUMMARY_FIELDS = [
  'NCTId',
  'BriefTitle',
  'OverallStatus',
  'Phase',
  'StartDate',
  'LastUpdatePostDate',
  'EnrollmentCount',
  'LeadSponsorName',
  'LocationCountry',
].join(',')

const SORT_PARAM: Record<StudySort, string> = {
  lastUpdate: 'LastUpdatePostDate:desc',
  startDate: 'StartDate:desc',
  enrollment: 'EnrollmentCount:desc',
}

/** Codes attendus par `aggFilters=phase:...` (vérifiés sur l'API). */
const PHASE_AGG_CODE: Record<Phase, string> = {
  EARLY_PHASE1: '0',
  PHASE1: '1',
  PHASE2: '2',
  PHASE3: '3',
  PHASE4: '4',
  NA: 'NA',
}

export const DEFAULT_PAGE_SIZE = 20

export function buildSearchParams(params: SearchStudiesParams) {
  const { condition, statuses = [], phases = [], location, sort = 'lastUpdate' } = params

  return {
    'query.cond': condition.trim(),
    'query.locn': location?.trim(),
    'filter.overallStatus': statuses.length ? statuses.join(',') : undefined,
    aggFilters: phases.length
      ? `phase:${phases.map((phase) => PHASE_AGG_CODE[phase]).join(' ')}`
      : undefined,
    sort: SORT_PARAM[sort],
    pageSize: params.pageSize ?? DEFAULT_PAGE_SIZE,
    pageToken: params.pageToken,
    countTotal: true,
    fields: SUMMARY_FIELDS,
  }
}

export async function searchStudies(
  params: SearchStudiesParams,
  signal?: AbortSignal,
): Promise<StudySearchResult> {
  const raw = await apiGet<RawSearchResponse>('/studies', buildSearchParams(params), signal)
  return toStudySearchResult(raw)
}

export async function getStudy(nctId: string, signal?: AbortSignal): Promise<StudyDetail> {
  const raw = await apiGet<RawStudy>(`/studies/${encodeURIComponent(nctId)}`, undefined, signal)
  return toStudyDetail(raw)
}
