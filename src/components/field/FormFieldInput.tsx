import React, { useState, useEffect, useCallback } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { Input } from '@/cn/ui/input'
import { Textarea } from '@/cn/ui/textarea'
import { BaseEditInput } from '@/components/field/BaseEditInput'
import { SimpleSelectorInput } from '@/components/field/SimpleSelectorInput'
import type { FormField, FieldType } from '@/types'

interface FormFieldProps {
  field: FormField
  onInputChange: (id: string, label: Partial<FormField>) => void
}

type DataProp = {
  [key in FieldType]?: React.FC<{
    disabled?: boolean
  }>
}

const answerPlaceholders: DataProp = {
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
  select: ({ disabled }) => <SimpleSelectorInput disabled={disabled} />
}

const FieldAnswerComponent: React.FC<{
  type: FieldType
  disabled?: boolean
}> = ({ type, disabled }) => {
  const Component = answerPlaceholders[type]
  return Component?.({ disabled })
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
