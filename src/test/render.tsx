import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactElement } from 'react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { routes } from '@/app/router'

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: Infinity },
    },
  })
}

/**
 * Monte l'application complète (layout + routes) à une URL donnée.
 * À utiliser pour tester une page : `renderRoute('/?cond=melanoma')`.
 */
export function renderRoute(url = '/') {
  const queryClient = createTestQueryClient()
  const router = createMemoryRouter(routes, { initialEntries: [url] })
  const user = userEvent.setup()

  const result = render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  )

  return { ...result, user, router, queryClient }
}

/** Monte un composant isolé avec un QueryClient (sans routeur). */
export function renderWithQueryClient(ui: ReactElement) {
  const queryClient = createTestQueryClient()
  const user = userEvent.setup()
  const result = render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>)
  return { ...result, user, queryClient }
}
