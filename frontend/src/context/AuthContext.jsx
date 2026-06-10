import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../api/client'
import LoadingScreen from '../components/ui/LoadingScreen'
import { useNavigate, usePath } from '../router'

const AuthContext = createContext(null)
const SESSION_KEY = 'teacher_session'

export function AuthProvider({ children }) {
  const [teacher, setTeacher] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem(SESSION_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        const restored = api.restoreSession(parsed.id)
        if (restored) setTeacher(restored)
        else localStorage.removeItem(SESSION_KEY)
      } catch {
        localStorage.removeItem(SESSION_KEY)
      }
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (user_id, password) => {
    const result = await api.login(user_id, password)
    if (!result.ok) throw new Error(result.error)
    setTeacher(result.teacher)
    localStorage.setItem(SESSION_KEY, JSON.stringify(result.teacher))
    return result.teacher
  }, [])

  const logout = useCallback(async () => {
    await api.logout()
    setTeacher(null)
    localStorage.removeItem(SESSION_KEY)
  }, [])

  const value = useMemo(
    () => ({ teacher, loading, login, logout, isAuthenticated: Boolean(teacher) }),
    [teacher, loading, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function RequireAuth({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()
  const path = usePath()

  useEffect(() => {
    if (!loading && !isAuthenticated && path !== '/login') {
      navigate('/login')
    }
  }, [isAuthenticated, loading, navigate, path])

  if (loading) {
    return <LoadingScreen message="Starting app…" />
  }

  if (!isAuthenticated) return null
  return children
}
