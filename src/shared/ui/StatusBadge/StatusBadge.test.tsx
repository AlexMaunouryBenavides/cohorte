import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { StatusBadge } from './StatusBadge'

describe('StatusBadge', () => {
  it('shows the short label by default', () => {
    render(<StatusBadge status="RECRUITING" />)
    expect(screen.getByText('Recrute')).toBeInTheDocument()
  })

  it('shows the full label in full variant', () => {
    render(<StatusBadge status="RECRUITING" variant="full" />)
    expect(screen.getByText('Recrutement en cours')).toBeInTheDocument()
  })

  it('handles a missing status', () => {
    render(<StatusBadge status={null} />)
    expect(screen.getByText('Statut inconnu')).toBeInTheDocument()
  })
})
