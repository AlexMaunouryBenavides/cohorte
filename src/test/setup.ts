import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll, beforeEach, vi } from 'vitest'
import { server } from './server'

// jsdom n'implémente pas scrollTo (utilisé par <ScrollRestoration />).
// Dans un beforeEach car `restoreMocks: true` restaure les spies après chaque test.
beforeEach(() => {
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
})

// Toute requête non mockée fait échouer le test : aucun appel réseau réel en test.
beforeAll(() => server.listen({ onUnhandledFrame: 'error' }))

afterEach(() => {
  cleanup()
  server.resetHandlers()
})

afterAll(() => server.close())
