import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle'
import { PageTitle } from '@/shared/ui'

export function SearchPage() {
  useDocumentTitle('Recherche')

  return (
    <>
      <PageTitle>Rechercher un essai clinique</PageTitle>
      {/* COH-06 → COH-10 : formulaire, résultats, pagination, filtres, tri. */}
    </>
  )
}
