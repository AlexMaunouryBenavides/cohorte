export const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL ?? 'https://clinicaltrials.gov/api/v2'

export class ApiError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }

  get isNotFound(): boolean {
    return this.status === 404
  }
}

export type QueryParams = Record<string, string | number | boolean | undefined | null>

/** Construit une query string en ignorant les valeurs vides. */
export function buildQueryString(params: QueryParams = {}): string {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue
    search.set(key, String(value))
  }
  const qs = search.toString()
  return qs ? `?${qs}` : ''
}

/**
 * GET JSON sur l'API ClinicalTrials.gov.
 * Lève une `ApiError` si le statut HTTP n'est pas 2xx ou si le réseau échoue.
 */
export async function apiGet<T>(
  path: string,
  params?: QueryParams,
  signal?: AbortSignal,
): Promise<T> {
  const url = `${API_BASE_URL}${path}${buildQueryString(params)}`

  let response: Response
  try {
    response = await fetch(url, { signal, headers: { Accept: 'application/json' } })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error
    throw new ApiError(0, 'Impossible de joindre ClinicalTrials.gov. Vérifiez votre connexion.')
  }

  if (!response.ok) {
    // TODO: message dédié pour 429 (limite de débit) — voir docs/handover.md
    throw new ApiError(response.status, `Erreur ${response.status} de l'API ClinicalTrials.gov.`)
  }

  return (await response.json()) as T
}
