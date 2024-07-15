import React from 'react'
import { useController, Control } from 'react-hook-form'

import { Input } from '@/cn/ui/input'

import type { Form } from '@/types'

interface HeaderProps {
  control: Control<Form>
}

export function FormHeaderReact({ control }: HeaderProps) {
  const {
    field: titleField,
    fieldState: { error: titleError }
  } = useController({
    name: 'header.title',
    control,
    rules: { required: 'Title is required' }
  })

  const {
    field: descriptionField,
    fieldState: { error: descriptionError }
  } = useController({
    name: 'header.description',
    control
  })

  return (
    <div className="bg-card p-6">
      <div>
        Title:
        <Input {...titleField} />
        {titleError && (
          <span className="text-red-500">{titleError.message}</span>
        )}
      </div>
      <div>
        Description:
        <Input {...descriptionField} />
        {descriptionError && (
          <span className="text-red-500">{descriptionError.message}</span>
        )}
      </div>
    </div>
  )
}
