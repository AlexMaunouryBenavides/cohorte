import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle'
import { PageTitle } from '@/shared/ui'

export function ShortlistPage() {
  useDocumentTitle('Shortlist')

  return (
    <>
      <PageTitle description="Les essais que vous avez sauvegardés. Notes et statuts sont enregistrés sur cet appareil.">
        Shortlist
      </PageTitle>
      {/* COH-12 → COH-14 : shortlist, revue, export CSV. */}
    </>
  )
}
