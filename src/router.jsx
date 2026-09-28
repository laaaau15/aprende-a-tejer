import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'

// --- Router basado en hash (#/ruta?query), igual que la app original ---

function parseHash() {
  const raw = window.location.hash.replace(/^#/, '') || '/'
  const [path, queryString = ''] = raw.split('?')
  const query = Object.fromEntries(new URLSearchParams(queryString))
  return { path: path || '/', query }
}

export function useRoute() {
  const [route, setRoute] = useState(parseHash)
  useEffect(() => {
    const onChange = () => setRoute(parseHash())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

export function navigate(to) {
  if (!to.startsWith('/')) to = '/' + to
  window.location.hash = to
}

export function goBack(fallback = '/') {
  if (window.history.length > 1) {
    window.history.back()
  } else {
    navigate(fallback)
  }
}

export function Link({ to, children, className = '', onClick, ...rest }) {
  return (
    <a
      href={'#' + to}
      className={className}
      onClick={(e) => {
        onClick?.(e)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}

// Empareja una ruta con patrón tipo /aprender/:id contra un path real.
export function matchRoute(pattern, path) {
  const pParts = pattern.split('/').filter(Boolean)
  const rParts = path.split('/').filter(Boolean)
  if (pParts.length !== rParts.length) return null
  const params = {}
  for (let i = 0; i < pParts.length; i++) {
    if (pParts[i].startsWith(':')) {
      params[pParts[i].slice(1)] = decodeURIComponent(rParts[i])
    } else if (pParts[i] !== rParts[i]) {
      return null
    }
  }
  return params
}

export function useMatch(pattern) {
  const { path } = useRoute()
  return matchRoute(pattern, path)
}

const RouteContext = createContext(null)

export function Switch({ routes }) {
  const { path, query } = useRoute()
  for (const [pattern, Component] of routes) {
    const params = matchRoute(pattern, path)
    if (params) {
      return (
        <RouteContext.Provider value={{ params, query, path }}>
          <Component params={params} query={query} />
        </RouteContext.Provider>
      )
    }
  }
  const NotFound = routes.find(([p]) => p === '*')?.[1]
  if (NotFound) return <NotFound />
  return <div className="p-8 text-center">Página no encontrada.</div>
}

export function useParams() {
  return useContext(RouteContext)?.params ?? {}
}

export function useQuery() {
  return useContext(RouteContext)?.query ?? {}
}
