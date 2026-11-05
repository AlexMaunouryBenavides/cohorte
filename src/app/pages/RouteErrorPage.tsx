import { isRouteErrorResponse, useRouteError } from 'react-router'
import styles from './RouteErrorPage.module.scss'

/**
 * Affichée quand une erreur JavaScript remonte jusqu'au routeur.
 * Rendue hors du layout : elle doit rester autonome.
 */
export function RouteErrorPage() {
  const error = useRouteError()
  const detail = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : null

  return (
    <main className={styles.page}>
      <h1>Une erreur inattendue est survenue</h1>
      <p>Rechargez la page. Si le problème persiste, signalez-le à l'équipe.</p>
      {detail && <pre className={styles.detail}>{detail}</pre>}
      <a href="/">Retour à l'accueil</a>
    </main>
  )
}
