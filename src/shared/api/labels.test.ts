import { describe, expect, it } from 'vitest'
import { formatPhases, statusShortLabel } from './labels'

describe('formatPhases', () => {
  it.each([
    [[], 'Non renseignée'],
    [['PHASE3'], 'Phase 3'],
    [['PHASE1', 'PHASE2'], 'Phase 1/2'],
    [['NA'], 'Non applicable'],
    [['EARLY_PHASE1'], 'Phase précoce 1'],
  ] as const)('%j → %s', (phases, expected) => {
    expect(formatPhases([...phases])).toBe(expected)
  })
})

describe('statusShortLabel', () => {
  it('uses the short label when one exists', () => {
    expect(statusShortLabel('RECRUITING')).toBe('Recrute')
  })

  it('falls back to the full label', () => {
    expect(statusShortLabel('COMPLETED')).toBe('Terminé')
  })
})
