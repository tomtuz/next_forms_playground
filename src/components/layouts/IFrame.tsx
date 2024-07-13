import React from 'react'
import { cn } from '@/lib/utils'

interface WidthWrapProps {
  title?: string
  children: React.ReactNode
}

export function IFrame({ children }: Readonly<WidthWrapProps>) {
  const forcedStyles =
    'w-[700px] max-w-[700px] outline outline-1 outline-red-400'
  return (
    <div
      className={cn(
        'flex h-screen flex-1 flex-col items-center justify-center gap-4 p-4 lg:gap-6 lg:p-6',
        forcedStyles
      )}
    >
      {children}
    </div>
  )
}
