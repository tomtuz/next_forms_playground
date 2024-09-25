import { FieldType, Form } from '@/types/react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@cn/select'
import { Control, Controller } from 'react-hook-form'

interface FieldTypeSelectProps {
  index: number
  control: Control<Form>
}

const fieldTypes: FieldType[] = [
  'text',
  'number',
  'textarea',
  'checkbox',
  'file',
  'select'
]

export function FieldTypeSelect({ index, control }: FieldTypeSelectProps) {
  return (
    <Controller
      name={`fields.${index}.type`}
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
  )
}
