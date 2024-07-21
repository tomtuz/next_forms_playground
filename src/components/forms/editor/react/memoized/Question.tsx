import React, { useCallback } from 'react'
import { QuestionTitle } from '../QuestionTitle'
import { AnswerField } from '../AnswerField'
import { useRenderCount, renderCountElement } from '@/hooks/useCountRedraw'

interface QuestionProps {
  field: any
  index: number
  remove: (index: number) => void
  onSelect: (index: number) => void
}

export const Question = React.memo(function Question({
  field,
  index,
  remove,
  onSelect
}: QuestionProps) {
  const renderCount = useRenderCount()

  const handleSelection = useCallback(() => {
    onSelect(index)
  }, [onSelect, index])

  const handleAnswerTypeSelectOpen = useCallback(() => {
    onSelect(index)
  }, [onSelect, index])

  return (
    <div role="button" onClick={handleSelection}>
      <div className="outline outline-1">
        <QuestionTitle
          key={`${field.id}-header`}
          index={index}
          remove={remove}
        />
        <AnswerField
          key={field.id}
          index={index}
          onAnswerTypeSelectOpen={handleAnswerTypeSelectOpen}
        />
        {renderCountElement(renderCount, `Question: ${index}`)}
      </div>
    </div>
  )
})
