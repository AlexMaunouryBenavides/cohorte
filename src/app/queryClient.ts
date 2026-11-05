import { QueryClient } from '@tanstack/react-query'
import { ApiError } from '@/shared/api'

const MAX_RETRIES = 2

/** Pas de retry sur les erreurs client (404, 400…) : réessayer ne changera rien. */
function shouldRetry(failureCount: number, error: Error): boolean {
  if (error instanceof ApiError && error.status >= 400 && error.status < 500) return false
  return failureCount < MAX_RETRIES
}

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // TODO(COH-17) : ajuster et justifier. Les données de l'API changent au mieux une fois par jour.
        staleTime: 60_000,
        retry: shouldRetry,
        refetchOnWindowFocus: false,
      },
    },
  })
}

export const queryClient = createQueryClient()
