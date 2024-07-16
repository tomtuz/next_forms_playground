/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useRef } from 'react'
import { Control, Controller, useFieldArray, useWatch } from 'react-hook-form'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Input, Textarea, Checkbox, Button, Select } from '@/cn/ui'
import { GripVertical } from 'lucide-react'

import clsx from 'clsx'

import type { Form, FieldType } from '@/types/react'

interface SortableInputFieldProps {
  id: string
  index: number
  control: Control<Form>
  setLastUsedType: (type: FieldType) => void
  isSelected: boolean
  onSelect: (index: number) => void
}

// ... (Keep the MultiOptionField and AnswerPlaceholders as they were)
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

type AnswerPlaceholdersProps = {
  [key in FieldType]: React.FC<{
    disabled?: boolean
    fieldIndex: number
    control: Control<Form>
  }>
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

export const SortableInputField = React.memo(
  ({
    // export function SortableInputField({
    id,
    index,
    control,
    setLastUsedType,
    isSelected,
    onSelect
  }: SortableInputFieldProps) => {
    const fieldTypes: FieldType[] = [
      'text',
      'number',
      'textarea',
      'checkbox',
      'file',
      'select'
    ]
    const inputRef = useRef<HTMLInputElement>(null)
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id })

    const style = {
      transform: CSS.Transform.toString(transform),
      transition
    }

    const fieldType = useWatch({
      control,
      name: `fields.${index}.type`,
      defaultValue: 'text' as FieldType
    })

    const AnswerComponent = useCallback(() => {
      const Placeholder = AnswerPlaceholders[fieldType]
      return (
        <Placeholder disabled={false} fieldIndex={index} control={control} />
      )
    }, [fieldType, index, control])

    React.useEffect(() => {
      setLastUsedType(fieldType)
    }, [fieldType, setLastUsedType])

    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
          onSelect(index)
          inputRef.current?.focus()
        }
      },
      [onSelect, index]
    )

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={clsx(
          'mb-4 rounded border bg-white p-4',
          isSelected && 'ring-2 ring-blue-500'
        )}
        onClick={handleClick}
      >
        <div className="mb-2 flex items-center">
          <div
            {...attributes}
            {...listeners}
            className="mr-2 cursor-move p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical size={20} />
          </div>
          <div className="flex-grow" onClick={(e) => e.stopPropagation()}>
            <Controller
              name={`fields.${index}.label`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  ref={inputRef}
                  placeholder="Question"
                  className="w-full"
                />
              )}
            />
          </div>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <Controller
            name={`fields.${index}.type`}
            control={control}
            render={({ field }) => (
              // <Select {...field} className="mb-2 w-full">
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
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <AnswerComponent />
        </div>
      </div>
    )
  }
)

SortableInputField.displayName = 'SortableInputField'
