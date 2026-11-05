import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle'
import { PageTitle } from '@/shared/ui'

export function InsightsPage() {
  useDocumentTitle('Analyse')

  return (
    <>
      <PageTitle description="Vue d'ensemble des essais enregistrés pour une pathologie.">
        Analyse
      </PageTitle>
      {/* COH-15 : KPIs et graphiques. */}
    </>
  )
}
