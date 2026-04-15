import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export interface AuthUser {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'user' | 'admin'
  balance: number
  credits: number
  aiTokens: number
  createdAt: string
}

interface AuthContextType {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (email: string, password: string) => { success: boolean; error?: string }
  register: (name: string, email: string, password: string) => { success: boolean; error?: string }
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)
const STORAGE_KEY = 'rulwear-auth'
const USERS_KEY = 'rulwear-users'

function getStoredUser(): AuthUser | null {
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    return s ? JSON.parse(s) : null
  } catch { return null }
}

function getUsers(): Record<string, { password: string; user: AuthUser }> {
  try {
    const s = localStorage.getItem(USERS_KEY)
    return s ? JSON.parse(s) : {}
  } catch { return {} }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(getStoredUser)

  const login = useCallback((email: string, password: string) => {
    const users = getUsers()
    const entry = users[email.toLowerCase()]
    if (!entry) return { success: false, error: 'Пользователь не найден' }
    if (entry.password !== password) return { success: false, error: 'Неверный пароль' }
    setUser(entry.user)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entry.user))
    return { success: true }
  }, [])

  const register = useCallback((name: string, email: string, password: string) => {
    const users = getUsers()
    const key = email.toLowerCase()
    if (users[key]) return { success: false, error: 'Email уже зарегистрирован' }
    const newUser: AuthUser = {
      id: 'user-' + Date.now(),
      email: key,
      name,
      role: 'user',
      balance: 0,
      credits: 0,
      aiTokens: 0,
      createdAt: new Date().toISOString(),
    }
    users[key] = { password, user: newUser }
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
    setUser(newUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))
    return { success: true }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
