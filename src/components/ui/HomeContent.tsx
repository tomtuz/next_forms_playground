'use client'

import { FormRoute } from '@/app/routes'
import { LandingCard } from '@/components/ui/LandingCard'
import { useAppContext } from '@/contexts/AppContext'
import { categories, categoryColors } from '@/utils/categories'
import { Input } from '@cn/input'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { CategoryButton } from './CategoryButon'

interface HomeContentProps {
  initialRoutes: FormRoute[]
}

export default function HomeContent({ initialRoutes }: HomeContentProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const { selectedCategory, setSelectedCategory } = useAppContext()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)
    },
    []
  )

  const filteredTests = useMemo(() => {
    const lowercaseSearchTerm = searchTerm.toLowerCase()
    return initialRoutes.filter((formRoute: FormRoute) => {
      const categoryMatch =
        selectedCategory === 'All' || formRoute.category === selectedCategory
      const nameMatch = formRoute.name
        .toLowerCase()
        .includes(lowercaseSearchTerm)

      return categoryMatch && nameMatch
    })
  }, [selectedCategory, searchTerm, initialRoutes])

  if (!mounted) {
    return null // or a loading spinner
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <Input
          type="search"
          placeholder="Search Forms..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="sm:w-64"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <CategoryButton
              key={category}
              category={category}
              isSelected={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
              categoryColors={categoryColors}
            />
          ))}
        </div>
      </div>
      <div className="h-[calc(100vh-300px)] overflow-y-auto">
        <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTests.map((formRoute) => (
            <div key={formRoute.id}>
              <LandingCard formRoute={formRoute} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
