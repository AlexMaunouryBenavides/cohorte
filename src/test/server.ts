import { setupServer } from 'msw/node'
import { handlers } from './handlers'

/**
 * Serveur MSW partagé par tous les tests.
 * Pour surcharger une réponse dans un test : `server.use(http.get(...))`.
 */
export const server = setupServer(...handlers)
