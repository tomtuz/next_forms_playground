import { renderCountElement, useRenderCount } from '@/hooks/useRedrawCount'
import { useRenderCountFull } from '@/hooks/useRedrawCountFull'
import { FieldType, Form } from '@/types/react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@cn/select'
import { useCallback } from 'react'
import { FieldArrayWithId, useFormContext, useWatch } from 'react-hook-form'

interface AnswerTypeSelectProps {
  index: number
  onSelect: (index: number) => void
  field: FieldArrayWithId<Form, 'fields', 'id'>
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
  index,
  onSelect,
  field
}: AnswerTypeSelectProps) {
  const renderCount = useRenderCount()
  const { RenderCountVisualizer, updateVisualizer } = useRenderCountFull(
    'AnswerTypeSelect',
    true
  )
  const { control, setValue } = useFormContext<Form>()

  const fieldType = useWatch({
    control,
    name: `fields.${index}.type`,
    defaultValue: field.type as FieldType
  })

  const handleAnswerTypeSelectOpen = useCallback(() => {
    onSelect(index)
  }, [onSelect, index])

  const handleFieldTypeChange = useCallback(
    (type: FieldType) => {
      setValue(`fields.${index}.type`, type, { shouldDirty: true })
    },
    [setValue, index]
  )

  const handleTypeChange = useCallback(
    (value: string) => {
      handleFieldTypeChange(value as FieldType)
    },
    [handleFieldTypeChange]
  )

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (open) handleAnswerTypeSelectOpen()
    },
    [handleAnswerTypeSelectOpen]
  )

  return (
    <div className="bg-yellow-200 p-2">
      <Select
        onValueChange={handleTypeChange}
        value={fieldType}
        onOpenChange={handleOpenChange}
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
      <RenderCountVisualizer />
      {renderCountElement(renderCount, 'AnswerField')}
    </div>
  )
}
