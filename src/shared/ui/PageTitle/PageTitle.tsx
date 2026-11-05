import type { ReactNode } from 'react'
import styles from './PageTitle.module.scss'

export interface PageTitleProps {
  children: ReactNode
  description?: ReactNode
  /** Zone à droite du titre (boutons d'action). */
  actions?: ReactNode
}

/** Le `<h1>` de chaque page. Une seule fois par page. */
export function PageTitle({ children, description, actions }: PageTitleProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        <h1 className={styles.title}>{children}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  )
}
