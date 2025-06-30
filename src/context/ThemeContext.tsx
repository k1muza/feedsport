'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { usePathname } from 'next/navigation'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  const [theme, setTheme] = useState<Theme>('light')

  // load saved theme only for admin routes
  useEffect(() => {
    if (!isAdmin) {
      setTheme('light')
      if (typeof document !== 'undefined') {
        document.documentElement.classList.remove('dark')
      }
      return
    }

    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored)
    }
  }, [isAdmin])

  // apply theme class only on admin routes
  useEffect(() => {
    if (!isAdmin) return

    if (typeof document !== 'undefined') {
      const root = document.documentElement
      root.classList.toggle('dark', theme === 'dark')
      localStorage.setItem('theme', theme)
    }
  }, [theme, isAdmin])

  const toggleTheme = () => {
    if (isAdmin) {
      setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
