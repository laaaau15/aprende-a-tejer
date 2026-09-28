import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import { registerSW } from 'virtual:pwa-register'

// Registra el service worker y comprueba si hay una versión nueva cada vez
// que se abre la app (además de cada hora si se queda abierta). Con
// skipWaiting + clientsClaim (ver vite.config.js) la nueva versión toma el
// control enseguida, así no hace falta recargar dos veces para verla.
const updateSW = registerSW({
  immediate: true,
  onRegisteredSW(_url, registration) {
    if (!registration) return
    registration.update()
    setInterval(() => registration.update(), 60 * 60 * 1000)
  }
})
void updateSW

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
