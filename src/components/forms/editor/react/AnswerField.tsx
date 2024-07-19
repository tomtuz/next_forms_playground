import React from 'react'
import {
  Control,
  useFormContext,
  UseFormRegister,
  useWatch
} from 'react-hook-form'
import clsx from 'clsx'

import { Form, FieldType } from '@/types/react'
import { renderCountElement, useRenderCount } from '@/hooks/useCountRedraw'
import { AnswerPlaceholder } from './AnswerPlaceholder'
import { AnswerTypeSelect } from './AnswerTypeSelect'

interface SortableInputFieldProps {
  index: number
  control: Control<Form>
  onAnswerTypeSelectOpen: () => void
}

// Nested field array
export function AnswerField({
  index,
  control,
  onAnswerTypeSelectOpen
}: SortableInputFieldProps) {
  // -- DEBUG --
  const renderCount = useRenderCount()
  // -- DEBUG --

  const { register } = useFormContext<Form>()
  const fieldType = useWatch({
    control,
    name: `fields.${index}.type`,
    defaultValue: 'text' as FieldType
  })

  return (
    <div className={clsx('mb-4 rounded bg-red-100 p-4 outline outline-1')}>
      <AnswerTypeSelect
        nestIndex={index}
        control={control}
        onOpen={onAnswerTypeSelectOpen}
      />

      <AnswerPlaceholder
        fieldType={fieldType}
        nestIndex={index}
        control={control}
      />
      {renderCountElement(renderCount, 'AnswerField')}
    </div>
  )
}
