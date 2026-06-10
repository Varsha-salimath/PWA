import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const RouterContext = createContext(null)

export function matchPath(path, pattern) {
  const patternParts = pattern.split('/').filter(Boolean)
  const pathParts = path.split('/').filter(Boolean)
  if (patternParts.length !== pathParts.length) return null

  const params = {}
  for (let i = 0; i < patternParts.length; i += 1) {
    if (patternParts[i].startsWith(':')) {
      params[patternParts[i].slice(1)] = decodeURIComponent(pathParts[i])
    } else if (patternParts[i] !== pathParts[i]) {
      return null
    }
  }

  return params
}

export function Router({ children }) {
  const [path, setPath] = useState(() => {
    const p = window.location.pathname
    return p === '/' || p === '' ? '/login' : p
  })

  const navigate = useCallback((next) => {
    if (next !== window.location.pathname) {
      window.history.pushState({}, '', next)
    }
    setPath(next)
  }, [])

  const goBack = useCallback(() => {
    window.history.back()
  }, [])

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const value = useMemo(() => ({ path, navigate, goBack }), [path, navigate, goBack])

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useRouter() {
  const ctx = useContext(RouterContext)
  if (!ctx) throw new Error('useRouter must be used within Router')
  return ctx
}

export function useNavigate() {
  return useRouter().navigate
}

export function usePath() {
  return useRouter().path
}

export function useRouteParams(pattern) {
  const path = usePath()
  return useMemo(() => matchPath(path, pattern), [path, pattern])
}
