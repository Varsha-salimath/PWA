import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type RouterContextValue = {
  path: string
  navigate: (path: string) => void
  goBack: () => void
}

const RouterContext = createContext<RouterContextValue | null>(null)

export function Router({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(() => {
    const p = window.location.pathname
    return p === '/' || p === '' ? '/login' : p
  })

  const navigate = useCallback((next: string) => {
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
