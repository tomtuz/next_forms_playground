import React from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/cn/ui/select'
import { Form, FieldType } from '@/types/react'
import { renderCountElement, useRenderCount } from '@/hooks/useCountRedraw'

interface AnswerTypeSelectProps {
  nestIndex: number
  onOpen: () => void
}

const fieldTypes: FieldType[] = [
  'text',
  'number',
  'textarea',
  'checkbox',
  'file',
  'select'
]

export function AnswerTypeSelect({ nestIndex, onOpen }: AnswerTypeSelectProps) {
  const renderCount = useRenderCount()
  const { control, setValue } = useFormContext<Form>()

  const fieldType = useWatch({
    control,
    name: `fields.${nestIndex}.type`,
    defaultValue: 'text' as FieldType
  })

  const handleTypeChange = (value: string) => {
    setValue(`fields.${nestIndex}.type`, value as FieldType, {
      shouldDirty: true
    })
  }

  return (
    <div className="bg-yellow-200 p-2">
      <Select
        onValueChange={handleTypeChange}
        value={fieldType}
        onOpenChange={(open) => open && onOpen()}
      >
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
      {renderCountElement(renderCount, 'AnswerTypeSelect')}
    </div>
  )
}
