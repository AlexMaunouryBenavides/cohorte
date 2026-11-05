import { Outlet, ScrollRestoration } from 'react-router'
import { Header } from './Header'
import styles from './AppLayout.module.scss'

export const MAIN_CONTENT_ID = 'main-content'

export function AppLayout() {
  return (
    <>
      <a href={`#${MAIN_CONTENT_ID}`} className={styles.skipLink}>
        Aller au contenu
      </a>
      <Header />
      <main id={MAIN_CONTENT_ID} tabIndex={-1} className={styles.main}>
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  )
}
