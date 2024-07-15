import React, { useCallback } from 'react'
import {
  Control,
  Controller,
  UseFieldArrayReturn,
  useFieldArray
} from 'react-hook-form'
import { Form, FieldType } from '@/types/react'
// TODO: make shadcn provider
// import { Input, Textarea, Checkbox, Button } from '@/cn/ui' // Assuming you're using ShadCN UI components
import { Input } from '@/cn/ui/input' // Assuming you're using ShadCN UI components
import { Textarea } from '@/cn/ui/textarea' // Assuming you're using ShadCN UI components
import { Checkbox } from '@/cn/ui/checkbox' // Assuming you're using ShadCN UI components
import { Button } from '@/cn/ui/button' // Assuming you're using ShadCN UI components

interface InputFieldProps {
  index: number
  fields: UseFieldArrayReturn<Form, 'fields', 'id'>['fields']
  control: Control<Form>
}

type AnswerPlaceholdersProps = {
  [key in FieldType]: React.FC<{
    disabled?: boolean
    fieldIndex: number
    control: Control<Form>
  }>
}

interface MultiOptionFieldProps {
  fieldIndex: number
  control: Control<Form>
  type: 'checkbox' | 'select'
}

export function MultiOptionField({
  fieldIndex,
  control,
  type
}: MultiOptionFieldProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `fields.${fieldIndex}.options`
  })

  return (
    <div>
      {fields.map((option, optionIndex) => (
        <div key={option.id} className="mb-2 flex items-center">
          {type === 'checkbox' ? (
            <Checkbox disabled className="mr-2" />
          ) : (
            <span className="mr-2">{optionIndex + 1}.</span>
          )}
          <Controller
            name={`fields.${fieldIndex}.options.${optionIndex}.label`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Option label"
                className="flex-grow"
              />
            )}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => remove(optionIndex)}
            className="ml-2"
          >
            Remove
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={() => append({ label: '' })}
        className="mt-2"
      >
        Add Option
      </Button>
    </div>
  )
}

const AnswerPlaceholders: AnswerPlaceholdersProps = {
  text: ({ disabled }) => (
    <Input type="text" placeholder="Text answer..." disabled={disabled} />
  ),
  number: ({ disabled }) => (
    <Input type="number" placeholder="Number answer..." disabled={disabled} />
  ),
  textarea: ({ disabled }) => (
    <Textarea placeholder="Long answer..." disabled={disabled} />
  ),
  checkbox: ({ disabled, fieldIndex, control }) => (
    <MultiOptionField
      fieldIndex={fieldIndex}
      control={control}
      type="checkbox"
    />
  ),
  file: ({ disabled }) => <Input type="file" disabled={disabled} />,
  select: ({ disabled, fieldIndex, control }) => (
    <MultiOptionField fieldIndex={fieldIndex} control={control} type="select" />
  )
}

export function InputField({ index, fields, control }: InputFieldProps) {
  const fieldTypes: FieldType[] = [
    'text',
    'number',
    'textarea',
    'checkbox',
    'file',
    'select'
  ]

  const AnswerComponent = useCallback(() => {
    const fieldType = fields[index].type as FieldType
    const Placeholder = AnswerPlaceholders[fieldType]
    return <Placeholder disabled fieldIndex={index} control={control} />
  }, [fields, index, control])

  return (
    <div className="mb-4 rounded border p-4">
      <Controller
        name={`fields.${index}.label`}
        control={control}
        render={({ field }) => (
          <Input {...field} placeholder="Question" className="mb-2 w-full" />
        )}
      />
      <Controller
        name={`fields.${index}.type`}
        control={control}
        render={({ field }) => (
          <select {...field} className="mb-2 w-full rounded border p-2">
            {fieldTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        )}
      />
      <AnswerComponent />
    </div>
  )
}
