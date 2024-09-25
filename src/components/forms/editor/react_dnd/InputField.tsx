import { FieldType, Form } from '@/types/react'
import { Button, Checkbox, Input, Textarea } from '@cn'
import React, { useCallback, useEffect } from 'react'
import { Control, Controller, useFieldArray, useWatch } from 'react-hook-form'

interface InputFieldProps {
  index: number
  control: Control<Form>
  setLastUsedType: (type: FieldType) => void
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

export function InputField({
  index,
  control,
  setLastUsedType
}: InputFieldProps) {
  const fieldTypes: FieldType[] = [
    'text',
    'number',
    'textarea',
    'checkbox',
    'file',
    'select'
  ]

  const fieldType = useWatch({
    control,
    name: `fields.${index}.type`,
    defaultValue: 'text' as FieldType
  })

  const AnswerComponent = useCallback(() => {
    const Placeholder = AnswerPlaceholders[fieldType]
    return <Placeholder disabled fieldIndex={index} control={control} />
  }, [fieldType, index, control])

  useEffect(() => {
    setLastUsedType(fieldType)
  }, [fieldType, setLastUsedType])

  return (
    <div className="mb-4 rounded border bg-primary p-4">
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
          // <Select {...field} className="mb-2 w-full">
          // <Select {...field}>
          //   {fieldTypes.map((type) => (
          //     <option key={type} value={type}>
          //       {type}
          //     </option>
          //   ))}
          // </Select>

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
