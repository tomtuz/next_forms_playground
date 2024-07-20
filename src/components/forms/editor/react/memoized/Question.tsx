import React, { useCallback } from 'react'
import { UseFieldArrayRemove, useFormContext } from 'react-hook-form'
import { Form } from '@/types/react'
import { QuestionTitle } from '../QuestionTitle'
import { AnswerField } from '../AnswerField'
import { useRenderCount, renderCountElement } from '@/hooks/useCountRedraw'

interface QuestionProps {
  field: any
  index: number
  remove: UseFieldArrayRemove
  isSelected: boolean
  onSelect: (index: number) => void
}

const QuestionContent = React.memo(function QuestionContent({
  field,
  index,
  remove,
  onAnswerTypeSelectOpen
}: Omit<QuestionProps, 'isSelected' | 'onSelect'> & {
  onAnswerTypeSelectOpen: () => void
}) {
  const renderCount = useRenderCount()

  return (
    <div className="outline outline-1">
      <QuestionTitle key={`${field.id}-header`} index={index} remove={remove} />
      <AnswerField
        key={field.id}
        index={index}
        onAnswerTypeSelectOpen={onAnswerTypeSelectOpen}
      />
      {renderCountElement(renderCount, `QuestionContent: ${index}`)}
    </div>
  )
})

export function Question({ field, index, remove, onSelect }: QuestionProps) {
  const renderCount = useRenderCount()

  const handleSelection = useCallback(() => {
    onSelect(index)
  }, [onSelect, index])

  const handleAnswerTypeSelectOpen = useCallback(() => {
    onSelect(index)
  }, [onSelect, index])

  return (
    <div role="button" onClick={handleSelection}>
      <QuestionContent
        field={field}
        index={index}
        remove={remove}
        onAnswerTypeSelectOpen={handleAnswerTypeSelectOpen}
      />
      {renderCountElement(renderCount, `Question: ${index}`)}
    </div>
  )
}
