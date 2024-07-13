import React from 'react'
import { Label } from '@/cn/ui/label'

interface SelectorProps {
  title?: string
  labelId?: string
  children: React.ReactNode
}

export function BaseInput({
  children,
  title,
  labelId
}: Readonly<SelectorProps>) {
  return (
    <div className="grid gap-3">
      <Label htmlFor={labelId}>{title}</Label>
      {children}
    </div>
  )
}
