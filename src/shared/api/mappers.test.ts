import { describe, expect, it } from 'vitest'
import { fixtures } from '@/test/handlers'
import { toStudyDetail, toStudySearchResult, toStudySummary } from './mappers'
import type { RawSearchResponse, RawStudy } from './types'

describe('toStudySearchResult', () => {
  it('maps a real search response', () => {
    const result = toStudySearchResult(fixtures.searchMelanoma as RawSearchResponse)

    expect(result.total).toBe(483)
    expect(result.studies).toHaveLength(3)
    expect(result.nextPageToken).toEqual(expect.any(String))
    expect(result.studies[0]).toMatchObject({
      nctId: 'NCT04198766',
      status: 'RECRUITING',
      phases: ['PHASE1', 'PHASE2'],
      enrollment: 340,
    })
  })

  it('handles an empty response', () => {
    expect(toStudySearchResult({})).toEqual({ total: 0, studies: [], nextPageToken: null })
  })
})

describe('toStudySummary', () => {
  it('deduplicates countries and keeps their order', () => {
    const raw: RawStudy = {
      protocolSection: {
        contactsLocationsModule: {
          locations: [
            { country: 'France' },
            { country: 'Spain' },
            { country: 'France' },
            { city: 'No country' },
          ],
        },
      },
    }

    expect(toStudySummary(raw).countries).toEqual(['France', 'Spain'])
  })

  it('falls back to safe defaults when fields are missing', () => {
    expect(toStudySummary({})).toEqual({
      nctId: '',
      title: 'Titre non renseigné',
      status: null,
      phases: [],
      startDate: null,
      lastUpdate: null,
      enrollment: null,
      sponsor: null,
      countries: [],
    })
  })

  it('flags estimated dates', () => {
    const raw: RawStudy = {
      protocolSection: {
        statusModule: { startDateStruct: { date: '2027-01', type: 'ESTIMATED' } },
      },
    }

    expect(toStudySummary(raw).startDate).toEqual({ value: '2027-01', isEstimated: true })
  })
})

describe('toStudyDetail', () => {
  it('maps a real study', () => {
    const detail = toStudyDetail(fixtures.studyNCT06246916 as RawStudy)

    expect(detail.nctId).toBe('NCT06246916')
    expect(detail.sponsor).toBe('Regeneron Pharmaceuticals')
    expect(detail.interventions.map((i) => i.name)).toEqual([
      'fianlimab',
      'cemiplimab',
      'relatlimab+nivolumab',
    ])
    expect(detail.eligibilityCriteria).toContain('Key Inclusion Criteria')
    expect(detail.minimumAge).toBe('18 Years')
    expect(detail.locations).toHaveLength(10)
    expect(detail.countries).toEqual(['United States', 'Canada'])
    expect(detail.primaryCompletionDate?.isEstimated).toBe(true)
  })
})
