import React from 'react'
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

export const Question = React.memo(function Question({
  field,
  index,
  remove,
  isSelected,
  onSelect
}: QuestionProps) {
  const renderCount = useRenderCount()

  const handleQuestionSelect = () => {
    onSelect(index)
  }

  const handleAnswerTypeSelectOpen = () => {
    onSelect(index)
  }

  return (
    <div
      role="button"
      onClick={handleQuestionSelect}
      className={isSelected ? 'ring-2 ring-blue-500' : ''}
    >
      <QuestionTitle index={index} remove={() => remove(index)} />
      <AnswerField
        index={index}
        onAnswerTypeSelectOpen={handleAnswerTypeSelectOpen}
      />
      {renderCountElement(renderCount, `Question: ${index}`)}
    </div>
  )
})
