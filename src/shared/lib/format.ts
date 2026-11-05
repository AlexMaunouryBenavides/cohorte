import type { PartialDate } from '@/shared/api'

const LOCALE = 'fr-FR'

const monthYear = new Intl.DateTimeFormat(LOCALE, {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})
const dayMonthYear = new Intl.DateTimeFormat(LOCALE, {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})
const integer = new Intl.NumberFormat(LOCALE)

/**
 * Formate une date de l'API (`YYYY-MM` ou `YYYY-MM-DD`).
 * `'2024-09'` → `'sept. 2024'`, `'2024-09-09'` → `'9 sept. 2024'`.
 * Retourne `null` si la date est absente ou invalide.
 */
export function formatApiDate(value: string | null | undefined): string | null {
  if (!value) return null

  const match = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(value)
  if (!match) return null

  const [, year, month, day] = match
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, day ? Number(day) : 1))
  if (Number.isNaN(date.getTime())) return null

  return day ? dayMonthYear.format(date) : monthYear.format(date)
}

/** Comme `formatApiDate`, mais ignore le jour : utile dans les tableaux. */
export function formatApiMonth(value: string | null | undefined): string | null {
  return formatApiDate(value?.slice(0, 7))
}

export function formatPartialDate(date: PartialDate | null): string | null {
  return date ? formatApiDate(date.value) : null
}

/** `1747` → `'1 747'` (espace insécable fine, norme FR). */
export function formatInteger(value: number): string {
  return integer.format(value)
}

/** `pluralize(1, 'essai')` → `'1 essai'`, `pluralize(1747, 'essai')` → `'1 747 essais'`. */
export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return `${formatInteger(count)} ${count > 1 ? plural : singular}`
}
