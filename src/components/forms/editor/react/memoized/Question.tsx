import { renderCountElement, useRenderCount } from '@/hooks/useRedrawCount'
import { useRenderCountFull } from '@/hooks/useRedrawCountFull'
import { AnswerField } from '@forms/editor/react/AnswerField'
import { QuestionTitle } from '@forms/editor/react/QuestionTitle'
import React, { useCallback } from 'react'
// import { useRenderCount, RenderCounter } from '@/hooks/useCountRedraw'
import { Form } from '@/types/react'
import { FieldArrayWithId } from 'react-hook-form'

interface QuestionProps {
  field: FieldArrayWithId<Form, 'fields', 'id'>
  index: number
  remove: (index: number) => void
  isSelected: boolean
  onSelect: (index: number) => void
}

const QuestionTitleMemo = React.memo(QuestionTitle)

export function QuestionComponent({
  field,
  index,
  remove,
  isSelected,
  onSelect
}: QuestionProps) {
  const renderCount = useRenderCount()
  const { RenderCountVisualizer, updateVisualizer } = useRenderCountFull(
    'Question',
    true
  )
  const handleQuestionSelect = useCallback(() => {
    onSelect(index)
  }, [onSelect, index])

  const handleRemove = useCallback(() => remove(index), [remove, index])

  return (
    <div
      role="button"
      onClick={handleQuestionSelect}
      className={isSelected ? 'ring-2 ring-blue-500' : ''}
    >
      <QuestionTitleMemo index={index} remove={handleRemove} />
      <AnswerField index={index} field={field} onSelect={onSelect} />
      <RenderCountVisualizer />
      {renderCountElement(renderCount, 'AnswerField')}
    </div>
  )
}

// export const Question = memo(
//   QuestionComponent
//   // (prevProps, nextProps) => {
//   //   return (
//   //     prevProps.field === nextProps.field &&
//   //     // prevProps.index === nextProps.index &&
//   //     prevProps.isSelected === nextProps.isSelected
//   //   )
//   // }
// )
