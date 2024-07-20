import React from 'react'
import { useFormContext } from 'react-hook-form'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/cn/ui/select'
import { Form, FieldType } from '@/types/react'
import { renderCountElement, useRenderCount } from '@/hooks/useCountRedraw'

interface FieldTypeSelectProps {
  nestIndex: number
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

export function AnswerTypeSelect({ nestIndex, onOpen }: FieldTypeSelectProps) {
  const renderCount = useRenderCount()
  const { setValue, getValues } = useFormContext<Form>()

  return (
    <div className="bg-yellow-200 p-2">
      <Select
        onValueChange={(value) =>
          setValue(`fields.${nestIndex}.type`, value as FieldType)
        }
        defaultValue={getValues(`fields.${nestIndex}.type`)}
        onOpenChange={(open) => open && onOpen && onOpen()}
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
