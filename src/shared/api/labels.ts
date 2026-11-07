import type { OverallStatus, Phase } from './types'

/** Libellés FR complets (filtres, fiche). */
export const STATUS_LABELS: Record<OverallStatus, string> = {
  RECRUITING: 'Recrutement en cours',
  NOT_YET_RECRUITING: 'Pas encore ouvert',
  ACTIVE_NOT_RECRUITING: 'Actif, ne recrute plus',
  ENROLLING_BY_INVITATION: 'Sur invitation',
  COMPLETED: 'Terminé',
  TERMINATED: 'Arrêté prématurément',
  SUSPENDED: 'Suspendu',
  WITHDRAWN: 'Retiré',
  UNKNOWN: 'Statut inconnu',
  AVAILABLE: 'Accès compassionnel disponible',
  NO_LONGER_AVAILABLE: 'Accès compassionnel clos',
  TEMPORARILY_NOT_AVAILABLE: 'Temporairement indisponible',
  APPROVED_FOR_MARKETING: 'Autorisé à la commercialisation',
  WITHHELD: 'Non communiqué',
}

/** Libellés FR courts (badges dans les tableaux et cartes). */
export const STATUS_SHORT_LABELS: Partial<Record<OverallStatus, string>> = {
  RECRUITING: 'Recrute',
  NOT_YET_RECRUITING: 'Pas encore ouvert',
  ACTIVE_NOT_RECRUITING: 'Ne recrute plus',
  TERMINATED: 'Arrêté',
}

export function statusShortLabel(status: OverallStatus): string {
  return STATUS_SHORT_LABELS[status] ?? STATUS_LABELS[status]
}

export type StatusTone = 'recruiting' | 'upcoming' | 'active' | 'completed' | 'stopped'

/** Couleur de badge associée à chaque statut (cf. tokens `--status-*`). */
export const STATUS_TONES: Record<OverallStatus, StatusTone> = {
  RECRUITING: 'recruiting',
  ENROLLING_BY_INVITATION: 'recruiting',
  AVAILABLE: 'recruiting',
  NOT_YET_RECRUITING: 'upcoming',
  ACTIVE_NOT_RECRUITING: 'active',
  SUSPENDED: 'active',
  TEMPORARILY_NOT_AVAILABLE: 'active',
  COMPLETED: 'completed',
  UNKNOWN: 'completed',
  NO_LONGER_AVAILABLE: 'completed',
  APPROVED_FOR_MARKETING: 'completed',
  WITHHELD: 'completed',
  TERMINATED: 'stopped',
  WITHDRAWN: 'stopped',
}

export const PHASE_LABELS: Record<Phase, string> = {
  EARLY_PHASE1: 'Phase précoce 1',
  PHASE1: 'Phase 1',
  PHASE2: 'Phase 2',
  PHASE3: 'Phase 3',
  PHASE4: 'Phase 4',
  NA: 'Non applicable',
}

export const PHASE_MISSING_LABEL = 'Non renseignée'

/**
 * Affichage compact d'une liste de phases.
 * `['PHASE1', 'PHASE2']` → `'Phase 1/2'`, `[]` → `'Non renseignée'`.
 */
export function formatPhases(phases: Phase[]): string {
  if (phases.length === 0) return PHASE_MISSING_LABEL
  if (phases.length === 1) return PHASE_LABELS[phases[0] as Phase]

  const numbers = phases.map((phase) => phase.replace('PHASE', ''))
  if (numbers.every((n) => /^\d$/.test(n))) return `Phase ${numbers.join('/')}`

  return phases.map((phase) => PHASE_LABELS[phase]).join(', ')
}
