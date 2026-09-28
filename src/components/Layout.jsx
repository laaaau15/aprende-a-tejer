import React from 'react'
import { Link, useRoute } from '../router'

const NAV = [
  { to: '/', emoji: '🏠', label: 'Inicio' },
  { to: '/puntos', emoji: '🧶', label: 'Punto' },
  { to: '/ganchillo', emoji: '🪡', label: 'Ganchillo' },
  { to: '/aprender', emoji: '🎓', label: 'Aprender' },
  { to: '/buscar', emoji: '🔎', label: 'Buscar' },
  { to: '/favoritos', emoji: '❤️', label: 'Guardados' }
]

const HELP_ROUTES = /^\/(puntos|ganchillo|aprender|proyecto)/

export default function Layout({ children }) {
  const { path } = useRoute()
  const showHelp = HELP_ROUTES.test(path)

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-20 bg-cream/90 backdrop-blur border-b border-oat">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-display text-xl font-semibold">Aprende a tejer 🧶</Link>
          <nav className="hidden md:flex gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                  path === item.to ? 'bg-yarn-dark text-white' : 'hover:bg-oat/70'
                }`}
              >
                {item.emoji} {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 pb-24 md:pb-10">{children}</main>

      {showHelp ? (
        <Link
          to="/rescate"
          className="fixed bottom-20 md:bottom-6 right-4 z-30 btn-primary shadow-lg"
        >
          😭 Estoy atascada
        </Link>
      ) : null}

      <nav className="md:hidden fixed bottom-0 inset-x-0 z-20 bg-white border-t border-oat flex justify-around py-1">
        {NAV.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex flex-col items-center text-[11px] px-2 py-1 rounded-lg ${
              path === item.to ? 'text-yarn-dark font-bold' : 'text-plum/60'
            }`}
          >
            <span className="text-lg">{item.emoji}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
