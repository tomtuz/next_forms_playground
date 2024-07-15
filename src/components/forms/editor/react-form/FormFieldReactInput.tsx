import React, { useCallback, useEffect, useState } from 'react'

import { Input } from '@/cn/ui/input'
import { Textarea } from '@/cn/ui/textarea'

import { FieldWrap } from '@forms/fields/FieldWrap'
import { FobButton } from '@forms/shared/FobButton'
import { CheckboxInput } from '@forms/fields/CheckboxInput'
import { FileUploadInput } from '@forms/fields/FileUploadInput'
import { SimpleSelectorInput } from '@forms/fields/SimpleSelectorInput'

import type { FieldType, FormField } from '@/types'

interface FormFieldProps {
  field: FormField
  onInputChange: (newLabel: string) => void
  onDelete: () => void
}

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

export function FormFieldReactInput({
  field,
  onInputChange,
  onDelete
}: FormFieldProps) {
  const [localTitle, setLocalTitle] = useState(field.label)

  useEffect(() => {
    setLocalTitle(field.label)
  }, [field])

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onInputChange(e.target.value)
    },
    [onInputChange]
  )

  const handleFieldDelete = useCallback(() => {
    onDelete()
  }, [field.id])

  // > FormField
  //   > FormTypePicker
  //   > FormTypeRender (disabled/active)
  return (
    <FieldWrap className="relative transition duration-150 ease-in-out hover:bg-slate-100">
      <Input
        id={field.id}
        type="text"
        placeholder="Question label"
        value={localTitle}
        onChange={handleTitleChange}
      />
      <FieldAnswerComponent type={field.type} disabled />
      <FobButton onClickDelete={handleFieldDelete} />
    </FieldWrap>
  )
}
