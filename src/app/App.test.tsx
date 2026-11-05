import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderRoute } from '@/test/render'

describe('App shell', () => {
  it('renders the search page on /', async () => {
    renderRoute('/')

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Rechercher un essai clinique' }),
    ).toBeInTheDocument()
    expect(document.title).toBe('Recherche · Cohorte')
  })

  it('marks the current page in the main navigation', async () => {
    renderRoute('/shortlist')

    const nav = await screen.findByRole('navigation', { name: 'Navigation principale' })
    const current = nav.querySelector('[aria-current="page"]')
    expect(current).toHaveTextContent('Shortlist')
  })

  it('navigates with the header links', async () => {
    const { user } = renderRoute('/')

    await user.click(await screen.findByRole('link', { name: 'Analyse' }))

    expect(await screen.findByRole('heading', { level: 1, name: 'Analyse' })).toBeInTheDocument()
  })

  it('shows a 404 page for unknown routes', async () => {
    renderRoute('/nope')

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Page introuvable' }),
    ).toBeInTheDocument()
  })

  it('provides a skip link to the main content', async () => {
    renderRoute('/')

    const skipLink = await screen.findByRole('link', { name: 'Aller au contenu' })
    expect(skipLink).toHaveAttribute('href', '#main-content')
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content')
  })
})
