// Native
import React, { useState, useEffect, useCallback } from 'react'
import { useDebouncedCallback } from 'use-debounce'

// CN UI
import { Input } from '@/cn/ui/input'
import { Textarea } from '@/cn/ui/textarea'

// UI
import { BaseEditInput } from '@/components/forms/fields/BaseEditInput'
import { SimpleSelectorInput } from '@/components/forms/fields/SimpleSelectorInput'
import { CheckboxInput } from '@/components/forms/fields/CheckboxInput'
import { FileUploadInput } from '@/components/forms/fields/FileUploadInput'

// Types
import type { FormField, FieldType } from '@/types'

type PlaceholderProps = {
  [key in FieldType]?: React.FC<{
    disabled?: boolean
  }>
}

// 'text' | 'number' | 'textarea' | 'checkbox' | 'file' | 'select';
const AnswerPlaceholders: PlaceholderProps = {
  text: ({ disabled }) => (
    <Input
      type="text"
      placeholder="Answer will be here..."
      disabled={disabled}
    />
  ),
  number: ({ disabled }) => (
    <Input
      type="number"
      placeholder="Number answer will be here..."
      disabled={disabled}
    />
  ),
  textarea: ({ disabled }) => (
    <Textarea placeholder="Answer will be here..." disabled={disabled} />
  ),
  checkbox: ({ disabled }) => <CheckboxInput disabled={disabled} />,
  file: ({ disabled }) => <FileUploadInput disabled={disabled} />,
  select: ({ disabled }) => <SimpleSelectorInput disabled={disabled} />
}

const FieldAnswerComponent: React.FC<{
  type: FieldType
  disabled?: boolean
}> = ({ type, disabled }) => {
  const Component = AnswerPlaceholders[type]
  return Component?.({ disabled })
}

// MAIN

interface FormFieldProps {
  field: FormField
  onInputChange: (id: string, label: Partial<FormField>) => void
}

export function FormFieldInput({ field, onInputChange }: FormFieldProps) {
  const [localTitle, setLocalTitle] = useState(field.label)

  useEffect(() => {
    setLocalTitle(field.label)
  }, [field])

  const debouncedOnInputChange = useDebouncedCallback(
    (id: string, label: string) => {
      onInputChange(id, { label }) // call hook to update value
    },
    300
  )

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTitle = e.target.value
      setLocalTitle(newTitle)
      debouncedOnInputChange(field.id, newTitle)
    },
    [debouncedOnInputChange, field.id]
  )

  return (
    <BaseEditInput>
      <Input
        id={field.id}
        type="text"
        placeholder="Question label"
        value={localTitle}
        onChange={handleTitleChange}
      />
      <FieldAnswerComponent type={field.type} disabled />
    </BaseEditInput>
  )
}
