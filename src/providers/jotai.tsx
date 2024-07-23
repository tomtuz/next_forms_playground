'use client'

import { DevTools } from 'jotai-devtools'
import { Provider } from 'jotai'
import { ReactNode } from 'react'
import 'jotai-devtools/styles.css'

interface JotaiProviderProps {
  children: ReactNode
}

export const JotaiProvider = ({ children }: JotaiProviderProps) => {
  return (
    <Provider>
      <DevTools />
      {children}
    </Provider>
  )
}
