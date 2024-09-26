'use client'

import { formRoutes } from '@/app/routes'
import { useAppContext } from '@/contexts/AppContext'
import { Button } from '@cn/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@cn/dropdown-menu'
import { Input } from '@cn/input'
import clsx from 'clsx'
import { ChevronDown, Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState('')
  const { selectedCategory, setSelectedCategory, categoryColors } =
    useAppContext()

  const filteredFormRoutes = useMemo(() => {
    const lowercaseSearchTerm = searchTerm.toLowerCase()
    return formRoutes.filter(
      (formRoute) =>
        formRoute.name.toLowerCase().includes(lowercaseSearchTerm) ||
        formRoute.category.toLowerCase().includes(lowercaseSearchTerm)
    )
  }, [searchTerm])

  const currentFormRoute = useMemo(() => {
    return formRoutes.find((route) => pathname === `${route.path}`)
  }, [pathname])

  const isRootPath = pathname === '/'

  const handleCategorySelect = useCallback(
    (category: string) => {
      setSelectedCategory(category)
    },
    [setSelectedCategory]
  )

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)
    },
    []
  )

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold">
          Form Playground
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {currentFormRoute ? currentFormRoute.name : 'Forms'}{' '}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <div className="p-2">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 opacity-50" />
                <Input
                  type="search"
                  placeholder="Search forms..."
                  className="h-8"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            {filteredFormRoutes.map((formRoute) => (
              <DropdownMenuItem
                key={formRoute.id}
                asChild
                className="cursor-pointer"
              >
                <Link
                  href={`${formRoute.path}`}
                  className={clsx(
                    'flex items-center justify-between',
                    !isRootPath &&
                      pathname === `${formRoute.path}` &&
                      'bg-accent'
                  )}
                  onClick={() => handleCategorySelect(formRoute.category)}
                >
                  {formRoute.name}
                  <span
                    className={clsx(
                      'rounded-full px-3 py-1 text-xs font-medium',
                      categoryColors[formRoute.category],
                      // Highlight logic for root path and other paths
                      (isRootPath && selectedCategory === formRoute.category) ||
                        (!isRootPath && pathname === `${formRoute.path}`)
                        ? 'ring-2 ring-primary'
                        : ''
                    )}
                  >
                    {formRoute.category}
                  </span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
