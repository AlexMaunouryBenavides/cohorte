import { describe, expect, it } from 'vitest'
import { formatApiDate, formatApiMonth, formatInteger, pluralize } from './format'

describe('formatApiDate', () => {
  it('formats a month', () => {
    expect(formatApiDate('2024-09')).toBe('sept. 2024')
  })

  it('formats a full date', () => {
    expect(formatApiDate('2024-09-09')).toBe('9 sept. 2024')
  })

  it.each([null, undefined, '', '2024', 'not-a-date'])('returns null for %j', (value) => {
    expect(formatApiDate(value)).toBeNull()
  })
})

describe('formatApiMonth', () => {
  it('drops the day', () => {
    expect(formatApiMonth('2019-12-10')).toBe('déc. 2019')
  })
})

describe('formatInteger / pluralize', () => {
  it('uses French thousands separators', () => {
    expect(formatInteger(1747)).toMatch(/^1\s747$/)
  })

  it('pluralizes', () => {
    expect(pluralize(1, 'essai')).toBe('1 essai')
    expect(pluralize(0, 'essai')).toBe('0 essai')
    expect(pluralize(2, 'essai')).toBe('2 essais')
  })
})
