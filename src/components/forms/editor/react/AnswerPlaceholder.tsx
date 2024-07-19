import React from 'react'
import {
  Control,
  Controller,
  useFormContext,
  UseFormRegister
} from 'react-hook-form'
import { Input, Textarea } from '@/cn/ui'
import { Form, FieldType } from '@/types/react'
import { MultiOptionField } from './MultiOptionField'

interface AnswerPlaceholderProps {
  fieldType: FieldType
  nestIndex: number
  control: Control<Form>
}

export function AnswerPlaceholder({
  fieldType,
  nestIndex,
  control
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
        // <Controller
        //   name={`fields.${nestIndex}.options.0.label`}
        //   control={control}
        //   render={({ field }) => (
        //     // <Input {...field} type="text" placeholder="Text answer..." />
        //     <input {...field} type="text" placeholder="Text answer..." />
        //   )}
        //   defaultValue=""
        // />
      )

    case 'number':
      return (
        <Controller
          name={`fields.${nestIndex}.options.0.label`}
          control={control}
          render={({ field }) => (
            <Input {...field} type="number" placeholder="Number answer..." />
          )}
          defaultValue=""
        />
      )

    case 'textarea':
      return (
        <Controller
          name={`fields.${nestIndex}.options.0.label`}
          control={control}
          render={({ field }) => (
            <Textarea {...field} placeholder="TextArea answer..." />
          )}
          defaultValue=""
        />
      )

    case 'checkbox':
      return (
        <MultiOptionField
          fieldIndex={nestIndex}
          control={control}
          type="checkbox"
        />
      )

    case 'file':
      return <Input type="file" />

    case 'select':
      return (
        <MultiOptionField
          fieldIndex={nestIndex}
          control={control}
          type="select"
        />
      )

    default:
      return null
  }
}
AnswerPlaceholder.displayName = 'AnswerPlaceholder'
