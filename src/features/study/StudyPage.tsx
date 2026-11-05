import { useParams } from 'react-router'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle'
import { PageTitle } from '@/shared/ui'

export function StudyPage() {
  const { nctId = '' } = useParams<{ nctId: string }>()
  useDocumentTitle(nctId)

  return (
    <>
      <PageTitle>Essai {nctId}</PageTitle>
      {/* COH-11 : fiche essai. */}
    </>
  )
}
