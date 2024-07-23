'use client'
import { RecoilRoot } from 'recoil'
import { ReactNode, Suspense } from 'react'
import { Devtools } from '@/utils/RecoilDevTools'
import Notification from '@/components/testing/recoil/Notification'
import Loading from '@/components/testing/recoil/Loading'

interface RecoilProviderProps {
  children: ReactNode
}

export function RecoilProvider({ children }: RecoilProviderProps) {
  return (
    <Suspense fallback={<Loading />}>
      <RecoilRoot>
        <Devtools />
        <Notification />
        {children}
      </RecoilRoot>
    </Suspense>
  )
}
