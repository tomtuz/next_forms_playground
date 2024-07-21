import React, { useCallback } from 'react'
import { QuestionTitle } from '../QuestionTitle'
import { AnswerField } from '../AnswerField'
import { useRenderCount, renderCountElement } from '@/hooks/useCountRedraw'
import { FieldArrayWithId } from 'react-hook-form'
import { Form } from '@/types/react'

interface QuestionProps {
  field: FieldArrayWithId<Form, 'fields', 'id'>
  index: number
  remove: (index: number) => void
  isSelected: boolean
  onSelect: (index: number) => void
}

const MemoizedQuestionTitle = React.memo(QuestionTitle)
const MemoizedAnswerField = React.memo(AnswerField)

export function Question({
  field,
  index,
  remove,
  isSelected,
  onSelect
}: QuestionProps) {
  const renderCount = useRenderCount()
  const handleQuestionSelect = useCallback(() => {
    onSelect(index)
  }, [onSelect, index])

  // Pass the remove function directly, without wrapping it
  const handleRemove = useCallback(() => remove(index), [remove, index])

  return (
    <div
      role="button"
      onClick={handleQuestionSelect}
      className={isSelected ? 'ring-2 ring-blue-500' : ''}
    >
      <MemoizedQuestionTitle index={index} remove={handleRemove} />
      <MemoizedAnswerField index={index} field={field} onSelect={onSelect} />
      {renderCountElement(renderCount, `Question: ${index}`)}
    </div>
  )
}
