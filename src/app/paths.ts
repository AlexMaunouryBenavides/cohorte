/** Chemins de l'app. Utiliser ces helpers plutôt que des chaînes en dur. */
export const paths = {
  search: () => '/',
  study: (nctId: string) => `/studies/${encodeURIComponent(nctId)}`,
  shortlist: () => '/shortlist',
  insights: () => '/insights',
}
