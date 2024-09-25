'use client'

import { formRoutes } from '@/app/routes'
import { Button } from '@/cn/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/cn/ui/dropdown-menu'
import { Input } from '@/cn/ui/input'
import { ChevronDown, Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredFormRoutes = formRoutes.filter(
    (formRoute) =>
      formRoute.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formRoute.category.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <header className="fixed top-0 w-full border-b bg-white p-4 shadow-md z-10 max-h-20">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Form Playground
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Forms <ChevronDown className="ml-2 h-4 w-4" />
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
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            {filteredFormRoutes.map((formRoute) => (
              <DropdownMenuItem key={formRoute.id} asChild>
                <Link
                  href={`/forms/${formRoute.id}`}
                  className={`flex items-center justify-between ${pathname === `/formRoute/${formRoute.id}` ? 'bg-accent' : ''}`}
                >
                  {formRoute.name}
                  <span className="text-xs text-muted-foreground">
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
