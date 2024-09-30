'use client'

import { formRoutes } from '@/app/routes'
import { DropdownMenu, DropdownMenuTrigger } from '@cn/dropdown-menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { DropdownContent } from './DropdownContent'
import { MemoizedTriggerButton } from './MemoizedTriggerButton'

export default function Header() {
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const currentFormRoute = useMemo(() => {
    if (!isClient) return undefined
    const pathName = pathname?.substring(1)
    return formRoutes.find((route) => pathName === `${route.path}`)
  }, [pathname, isClient])

  const isRootPath = pathname === '/'

  if (!isClient) {
    return null // or a loading spinner
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold">
          Form Playground
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4">
            <MemoizedTriggerButton currentFormRoute={currentFormRoute} />
          </DropdownMenuTrigger>
          <DropdownContent isRootPath={isRootPath} pathname={pathname} />
        </DropdownMenu>
      </div>
    </header>
  )
}
