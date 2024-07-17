import React from 'react'
import { Control, Controller, UseFormRegister } from 'react-hook-form'
import { Input, Textarea } from '@/cn/ui'
import { Form, FieldType } from '@/types/react'
import { MultiOptionField } from './MultiOptionField'

interface AnswerPlaceholderProps {
  fieldType: FieldType
  fieldIndex: number
  control: Control<Form>
  register: UseFormRegister<Form>
}

// let renderCount = 0

export function AnswerPlaceholder({
  fieldType,
  fieldIndex,
  control,
  register
}: AnswerPlaceholderProps) {
  switch (fieldType) {
    case 'text':
      // return <input {...register(`fieldArray.${index}.name` as const)} />;
      // return <Input type="text" placeholder="Text answer..." />
      return <input {...register(`fields.${fieldIndex}.options.0`)} />
    // return (
    //   <Controller
    //     name={`fields.${fieldIndex}.label`}
    //     control={control}
    //     render={({ field.label }) => (
    //       <Input {...field} type="text" placeholder="Text answer..." />
    //     )}
    //   />
    // )

    case 'number':
      // return <Input type="number" placeholder="Number answer..." />
      return <input {...register(`fields.${fieldIndex}.options.0`)} />

    case 'textarea':
      return <Textarea placeholder="Long answer..." />
    case 'checkbox':
      return (
        <MultiOptionField
          fieldIndex={fieldIndex}
          control={control}
          type="checkbox"
        />
      )
    case 'file':
      return <Input type="file" />
    case 'select':
      return (
        <MultiOptionField
          fieldIndex={fieldIndex}
          control={control}
          type="select"
        />
      )
    default:
      return null
  }
}
