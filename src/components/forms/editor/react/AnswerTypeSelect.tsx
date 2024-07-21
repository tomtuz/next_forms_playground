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

export const AnswerTypeSelect = React.memo(function AnswerTypeSelect({
  nestIndex,
  onOpen
}: FieldTypeSelectProps) {
  const renderCount = useRenderCount()
  const { setValue, getValues } = useFormContext<Form>()

  const handleTypeChange = (value: string) => {
    setValue(`fields.${nestIndex}.type`, value as FieldType, {
      shouldDirty: true
    })

    // Reset options when changing type
    if (value === 'checkbox' || value === 'select') {
      setValue(`fields.${nestIndex}.options`, [{ label: '' }], {
        shouldDirty: true
      })
    } else {
      setValue(`fields.${nestIndex}.options`, [{ label: '' }], {
        shouldDirty: true
      })
    }
  }

  return (
    <div className="bg-yellow-200 p-2">
      <Select
        onValueChange={handleTypeChange}
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
})
