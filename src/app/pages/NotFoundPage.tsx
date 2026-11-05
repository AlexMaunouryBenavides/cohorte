import { Link } from 'react-router'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle'
import { PageTitle } from '@/shared/ui'
import { paths } from '../paths'

export function NotFoundPage() {
  useDocumentTitle('Page introuvable')

  return (
    <>
      <PageTitle description="Cette adresse ne correspond à aucune page de Cohorte.">
        Page introuvable
      </PageTitle>
      <p>
        <Link to={paths.search()}>Retour à la recherche</Link>
      </p>
    </>
  )
}
