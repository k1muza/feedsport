'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { db } from '@/data/db'
import { User } from '@/types/user'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('authUser') : null
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const login = async (email: string, password: string) => {
    const existing = await db.users.where({ email, password }).first()
    if (existing) {
      setUser(existing)
      localStorage.setItem('authUser', JSON.stringify(existing))
      return true
    }
    return false
  }

  const register = async (email: string, password: string) => {
    const check = await db.users.where({ email }).first()
    if (check) return false
    const now = new Date().toISOString()
    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      password,
      createdAt: now,
      updatedAt: now
    }
    await db.users.add(newUser)
    setUser(newUser)
    localStorage.setItem('authUser', JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('authUser')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
