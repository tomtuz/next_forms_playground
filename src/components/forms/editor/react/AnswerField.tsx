import React from 'react'
import { Form } from '@/types/react'
import { renderCountElement, useRenderCount } from '@/hooks/useCountRedraw'
import { AnswerTypeSelect } from './AnswerTypeSelect'
import { AnswerPlaceholder } from './AnswerPlaceholder'
import { FieldArrayWithId } from 'react-hook-form'

interface AnswerFieldProps {
  index: number
  field: FieldArrayWithId<Form, 'fields', 'id'>
  onSelect: (index: number) => void
}

const MemoizedAnswerTypeSelect = React.memo(AnswerTypeSelect)
const MemoizedAnswerPlaceholder = React.memo(AnswerPlaceholder)

export function AnswerField({ index, field, onSelect }: AnswerFieldProps) {
  const renderCount = useRenderCount()

  return (
    <div className="mb-4 rounded bg-red-100 p-4 outline outline-1">
      <MemoizedAnswerTypeSelect
        index={index}
        onSelect={onSelect}
        field={field}
      />
      <MemoizedAnswerPlaceholder field={field} index={index} />
      {renderCountElement(renderCount, 'AnswerField')}
    </div>
  )
}
