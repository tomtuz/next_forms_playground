import React from 'react'
import { ListPage } from '@/components/testing/zustand/ListPage'
import { JotaiProvider } from '@/providers/jotai'

export default function Home() {
  return (
    <main>
      <JotaiProvider>
        <ListPage />
      </JotaiProvider>
    </main>
  )
}
