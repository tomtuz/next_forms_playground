'use client'

import { categoryColors } from '@/utils/categories'
import { createContext, ReactNode, useContext, useState } from 'react'

type AppContextType = {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  categoryColors: Record<string, string>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const value = {
    selectedCategory,
    setSelectedCategory,
    categoryColors,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
