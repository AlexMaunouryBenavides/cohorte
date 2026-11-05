import { useEffect } from 'react'

const APP_NAME = 'Cohorte'

/**
 * Met à jour le titre de l'onglet : `useDocumentTitle('Shortlist')` → « Shortlist · Cohorte ».
 * Chaque page doit l'appeler (accessibilité : le lecteur d'écran annonce le titre).
 */
export function useDocumentTitle(title: string | null | undefined) {
  useEffect(() => {
    document.title = title ? `${title} · ${APP_NAME}` : APP_NAME
  }, [title])
}
