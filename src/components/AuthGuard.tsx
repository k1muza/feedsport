'use client'

import { useAuth } from '@/context/AuthContext'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const PUBLIC_PATHS = ['/admin/login', '/admin/register']

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!user && !PUBLIC_PATHS.includes(pathname)) {
      router.replace('/admin/login')
    }
  }, [user, pathname, router])

  if (!user && !PUBLIC_PATHS.includes(pathname)) return null

  return <>{children}</>
}
