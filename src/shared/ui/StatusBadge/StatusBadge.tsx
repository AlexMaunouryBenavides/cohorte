import { STATUS_LABELS, STATUS_TONES, statusShortLabel, type OverallStatus } from '@/shared/api'
import { Badge } from '../Badge/Badge'

export interface StatusBadgeProps {
  status: OverallStatus | null
  /** `short` dans les tableaux et cartes, `full` dans la fiche. */
  variant?: 'short' | 'full'
}

export function StatusBadge({ status, variant = 'short' }: StatusBadgeProps) {
  if (!status) return <Badge>Statut inconnu</Badge>

  const label = variant === 'short' ? statusShortLabel(status) : STATUS_LABELS[status]

  return (
    <Badge tone={STATUS_TONES[status]} dot>
      {label}
    </Badge>
  )
}
