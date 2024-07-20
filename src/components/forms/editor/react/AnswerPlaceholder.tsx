import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Input, Textarea } from '@/cn/ui'
import { Form, FieldType } from '@/types/react'
import { MultiOptionField } from './MultiOptionField'

interface AnswerPlaceholderProps {
  fieldType: FieldType
  nestIndex: number
}

export function AnswerPlaceholder({
  fieldType,
  nestIndex
}: AnswerPlaceholderProps) {
  const { register } = useFormContext<Form>()

  switch (fieldType) {
    case 'text':
      return (
        <input
          {...register(`fields.${nestIndex}.options.0.label`)}
          type="text"
          placeholder="Text answer..."
        />
      )

    case 'number':
      return (
        <Input
          {...register(`fields.${nestIndex}.options.0.label`, {
            valueAsNumber: true
          })}
          type="number"
          placeholder="Number answer..."
        />
      )

    case 'textarea':
      return (
        <Textarea
          {...register(`fields.${nestIndex}.options.0.label`)}
          placeholder="TextArea answer..."
        />
      )

    case 'checkbox':
      return <MultiOptionField fieldIndex={nestIndex} type="checkbox" />

    case 'file':
      return <Input type="file" />

    case 'select':
      return <MultiOptionField fieldIndex={nestIndex} type="select" />

    default:
      return null
  }
}
