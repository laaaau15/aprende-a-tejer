import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Repo se sirve en https://laaaau15.github.io/aprende-a-tejer/
export default defineConfig({
  base: '/aprende-a-tejer/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'icons/*.png'],
      manifest: {
        id: '/aprende-a-tejer/',
        name: 'Aprende a tejer desde cero',
        short_name: 'Aprende a tejer',
        description: 'Tu guía visual para aprender punto a dos agujas, agujas circulares y ganchillo, paso a paso y sin liarte.',
        start_url: '/aprende-a-tejer/',
        scope: '/aprende-a-tejer/',
        display: 'standalone',
        background_color: '#FBF6EE',
        theme_color: '#FBF6EE',
        lang: 'es',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        navigateFallback: '/aprende-a-tejer/index.html',
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/aprende-a-tejer/'),
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'app-shell' }
          }
        ]
      }
    })
  ]
})
