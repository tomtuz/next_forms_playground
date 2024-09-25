import { Label } from '@cn/label'
import React from 'react'

interface BaseInputProps {
  title?: string
  labelId?: string
  children: React.ReactNode
}

export function BaseInput({
  children,
  title,
  labelId
}: Readonly<BaseInputProps>) {
  return (
    <div className="grid gap-3">
      <Label htmlFor={labelId}>{title}</Label>
      {children}
    </div>
  )
}
