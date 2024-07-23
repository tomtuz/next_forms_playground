import React from 'react'
import { ListPage } from '@/components/testing/recoil/ListPage'
import { RecoilProvider } from '@/providers/recoil'

export default function Home() {
  return (
    <main>
      <RecoilProvider>
        <h1>Recoil List Management Example</h1>
        <ListPage />
      </RecoilProvider>
    </main>
  )
}
