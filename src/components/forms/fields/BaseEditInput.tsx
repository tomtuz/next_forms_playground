import type React from 'react'

interface BaseEditProps {
  children: React.ReactNode
}

export function BaseEditInput({ children }: Readonly<BaseEditProps>) {
  return <div className="grid gap-3">{children}</div>
}
