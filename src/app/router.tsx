import { createBrowserRouter, type RouteObject } from 'react-router'
import { InsightsPage } from '@/features/insights/InsightsPage'
import { SearchPage } from '@/features/search/SearchPage'
import { ShortlistPage } from '@/features/shortlist/ShortlistPage'
import { StudyPage } from '@/features/study/StudyPage'
import { AppLayout } from './layout/AppLayout'
import { NotFoundPage } from './pages/NotFoundPage'
import { RouteErrorPage } from './pages/RouteErrorPage'

/** Exporté séparément pour pouvoir monter le routeur en mémoire dans les tests. */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <SearchPage /> },
      { path: 'studies/:nctId', element: <StudyPage /> },
      { path: 'shortlist', element: <ShortlistPage /> },
      { path: 'insights', element: <InsightsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]

export const router = createBrowserRouter(routes)
