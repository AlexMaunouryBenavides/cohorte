import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/app/App'
import '@/shared/styles/global.scss'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Élément #root introuvable dans index.html')

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
