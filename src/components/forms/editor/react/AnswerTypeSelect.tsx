import React from 'react'
import { Control, Controller, useFormContext } from 'react-hook-form'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/cn/ui/select'
import { Form, FieldType } from '@/types/react'
import { renderCountElement, useRenderCount } from '@/hooks/useCountRedraw'
import { register } from 'module'

interface FieldTypeSelectProps {
  nestIndex: number
  control?: Control<Form> | undefined
  onOpen?: () => void
}

const fieldTypes: FieldType[] = [
  'text',
  'number',
  'textarea',
  'checkbox',
  'file',
  'select'
]

export function AnswerTypeSelect({
  nestIndex,
  control,
  onOpen
}: FieldTypeSelectProps) {
  // -- DEBUG --
  const renderCount = useRenderCount()
  // -- DEBUG --
  const { register } = useFormContext<Form>()

  return (
    <div className="bg-yellow-200 p-2">
      <Controller
        name={`fields.${nestIndex}.type`}
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="mb-2 w-full">
              <SelectValue placeholder="Select answer type" />
            </SelectTrigger>
            <SelectContent>
              {fieldTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {/* 
      <select {...register(`fields.${nestIndex}.type`)}>
        <option value="text">text</option>
        <option value="number">number</option>
        <option value="textarea">textarea</option>
      </select> */}
      {renderCountElement(renderCount, 'AnswerTypeSelect')}
    </div>
  )
}
