import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'
import { server } from '@/test/server'
import { API_BASE_URL, ApiError } from './client'
import { buildSearchParams, getStudy, searchStudies } from './studies'

describe('buildSearchParams', () => {
  it('builds the minimal query', () => {
    expect(buildSearchParams({ condition: '  melanoma ' })).toMatchObject({
      'query.cond': 'melanoma',
      'filter.overallStatus': undefined,
      aggFilters: undefined,
      sort: 'LastUpdatePostDate:desc',
      pageSize: 20,
      countTotal: true,
    })
  })

  it('maps statuses, phases, location and sort', () => {
    const params = buildSearchParams({
      condition: 'melanoma',
      statuses: ['RECRUITING', 'NOT_YET_RECRUITING'],
      phases: ['EARLY_PHASE1', 'PHASE2', 'NA'],
      location: 'France',
      sort: 'enrollment',
      pageToken: 'abc',
    })

    expect(params).toMatchObject({
      'filter.overallStatus': 'RECRUITING,NOT_YET_RECRUITING',
      aggFilters: 'phase:0 2 NA',
      'query.locn': 'France',
      sort: 'EnrollmentCount:desc',
      pageToken: 'abc',
    })
  })
})

describe('searchStudies', () => {
  it('sends the expected query string and maps the response', async () => {
    let requestedUrl: URL | undefined
    server.use(
      http.get(`${API_BASE_URL}/studies`, ({ request }) => {
        requestedUrl = new URL(request.url)
        return HttpResponse.json({ totalCount: 1, studies: [] })
      }),
    )

    const result = await searchStudies({ condition: 'melanoma', phases: ['PHASE3'] })

    expect(requestedUrl?.searchParams.get('query.cond')).toBe('melanoma')
    expect(requestedUrl?.searchParams.get('aggFilters')).toBe('phase:3')
    expect(requestedUrl?.searchParams.has('pageToken')).toBe(false)
    expect(result).toEqual({ total: 1, studies: [], nextPageToken: null })
  })

  it('throws an ApiError on HTTP errors', async () => {
    server.use(http.get(`${API_BASE_URL}/studies`, () => new HttpResponse(null, { status: 500 })))

    await expect(searchStudies({ condition: 'melanoma' })).rejects.toMatchObject({
      name: 'ApiError',
      status: 500,
    })
  })

  it('throws an ApiError with status 0 on network failure', async () => {
    server.use(http.get(`${API_BASE_URL}/studies`, () => HttpResponse.error()))

    await expect(searchStudies({ condition: 'melanoma' })).rejects.toBeInstanceOf(ApiError)
    await expect(searchStudies({ condition: 'melanoma' })).rejects.toMatchObject({ status: 0 })
  })
})

describe('getStudy', () => {
  it('returns the mapped study', async () => {
    const study = await getStudy('NCT06246916')
    expect(study.title).toMatch(/Harmony Head-to-Head/)
  })

  it('throws a 404 ApiError for an unknown study', async () => {
    const error = await getStudy('NCT00000000').catch((e: unknown) => e)
    expect(error).toBeInstanceOf(ApiError)
    expect((error as ApiError).isNotFound).toBe(true)
  })
})
