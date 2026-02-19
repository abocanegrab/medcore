import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import type { ReactNode } from 'react'
import { getUserById } from '../data/mockUsers'
import type { MockUser } from '../data/mockUsers'

interface AuthContextValue {
  currentUser: MockUser | null
  login: (userId: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const STORAGE_KEY = 'medcore_user_id'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<MockUser | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? getUserById(stored) ?? null : null
  })

  const login = useCallback((userId: string) => {
    const user = getUserById(userId)
    if (user) {
      setCurrentUser(user)
      localStorage.setItem(STORAGE_KEY, userId)
    }
  }, [])

  const logout = useCallback(() => {
    setCurrentUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
