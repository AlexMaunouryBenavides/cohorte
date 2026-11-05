import type { ReactNode } from 'react'
import { cx } from '@/shared/lib/cx'
import styles from './Badge.module.scss'

export type BadgeTone =
  'neutral' | 'primary' | 'recruiting' | 'upcoming' | 'active' | 'completed' | 'stopped'

export interface BadgeProps {
  tone?: BadgeTone
  /** Pastille de couleur devant le texte (badges de statut). */
  dot?: boolean
  children: ReactNode
  className?: string
}

export function Badge({ tone = 'neutral', dot = false, children, className }: BadgeProps) {
  return (
    <span className={cx(styles.badge, styles[tone], className)}>
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </span>
  )
}
