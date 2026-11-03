import { http, HttpResponse } from 'msw'
import { API_BASE_URL } from '@/shared/api'
import searchMelanoma from './fixtures/search-melanoma.json'
import studyNCT06246916 from './fixtures/study-NCT06246916.json'

/** Fixtures = vraies réponses de l'API (nov. 2026), voir src/test/fixtures/README.md */
export const fixtures = {
  searchMelanoma,
  studyNCT06246916,
}

export const handlers = [
  http.get(`${API_BASE_URL}/studies`, () => HttpResponse.json(searchMelanoma)),

  http.get(`${API_BASE_URL}/studies/:nctId`, ({ params }) => {
    if (params.nctId === 'NCT06246916') return HttpResponse.json(studyNCT06246916)
    return new HttpResponse(null, { status: 404 })
  }),
]
