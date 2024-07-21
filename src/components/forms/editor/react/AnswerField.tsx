import React from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { Form, FieldType } from '@/types/react'
import { renderCountElement, useRenderCount } from '@/hooks/useCountRedraw'
import { AnswerTypeSelect } from './AnswerTypeSelect'
import { AnswerPlaceholder } from './AnswerPlaceholder'

interface AnswerFieldProps {
  index: number
  onAnswerTypeSelectOpen: () => void
}

export function AnswerField({
  index,
  onAnswerTypeSelectOpen
}: AnswerFieldProps) {
  const renderCount = useRenderCount()
  const { control } = useFormContext<Form>()

  const fieldType = useWatch({
    control,
    name: `fields.${index}.type`,
    defaultValue: 'text' as FieldType
  })

  return (
    <div className="mb-4 rounded bg-red-100 p-4 outline outline-1">
      <AnswerTypeSelect nestIndex={index} onOpen={onAnswerTypeSelectOpen} />
      <AnswerPlaceholder fieldType={fieldType} nestIndex={index} />
      {renderCountElement(renderCount, 'AnswerField')}
    </div>
  )
}
