'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

type AppContextType = {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

// Top-level context provider for generic application needs
const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const value = {
    selectedCategory,
    setSelectedCategory,
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
