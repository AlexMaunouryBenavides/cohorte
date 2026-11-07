import type { SearchStudiesParams } from './studies'

/**
 * Clés TanStack Query centralisées.
 * Toujours passer par cette factory : jamais de clé écrite à la main dans un composant.
 */
export const studyKeys = {
  all: ['studies'] as const,
  searches: () => [...studyKeys.all, 'search'] as const,
  search: (params: SearchStudiesParams) => [...studyKeys.searches(), params] as const,
  details: () => [...studyKeys.all, 'detail'] as const,
  detail: (nctId: string) => [...studyKeys.details(), nctId] as const,
}
