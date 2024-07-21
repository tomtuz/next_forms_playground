import React from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import clsx from 'clsx'

import { Form, FieldType, FormField } from '@/types/react'
import { renderCountElement, useRenderCount } from '@/hooks/useCountRedraw'
import { AnswerPlaceholder } from './AnswerPlaceholder'
import { AnswerTypeSelect } from './AnswerTypeSelect'

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

  const type = useWatch<Form, `fields.${number}.type`>({
    control,
    name: `fields.${index}.type`,
    defaultValue: 'text' as FieldType
  })

  return (
    <div className={clsx('mb-4 rounded bg-red-100 p-4 outline outline-1')}>
      <AnswerTypeSelect nestIndex={index} onOpen={onAnswerTypeSelectOpen} />

      <AnswerPlaceholder fieldType={type} nestIndex={index} />
      {renderCountElement(renderCount, 'AnswerField')}
    </div>
  )
}
