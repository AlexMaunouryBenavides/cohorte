interface ImportMetaEnv {
  /** URL de base de l'API. Par défaut : https://clinicaltrials.gov/api/v2 */
  readonly VITE_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
