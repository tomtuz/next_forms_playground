import React, { useState, useCallback } from 'react'
import { Control, UseFieldArrayRemove } from 'react-hook-form'
import { Form } from '@/types/react'
import clsx from 'clsx'
import { QuestionTitle } from '../QuestionTitle'
import { AnswerField } from '../AnswerField'
import { useRenderCount, renderCountElement } from '@/hooks/useCountRedraw'

interface QuestionProps {
  field: any
  index: number
  control: Control<Form>
  // remove: UseFormRemove
  remove: UseFieldArrayRemove
  isSelected: boolean
  onSelect: (index: number) => void
}

// Why is this a memoized component?
// We have a 'select current question' functionality that adds a blue outline on click
// Once Question is selected, all others must be unselected, which means that all element within parent mapped array are redrawn.
// To prevent redrawing the entire children tree, we memoize this function, which at worst redraws Question, but not its contents.

// stop rendering subfields on Question select
const QuestionContent = React.memo(function QuestionContent({
  field,
  index,
  control,
  remove,
  onAnswerTypeSelectOpen
}: Omit<QuestionProps, 'isSelected' | 'onSelect'> & {
  onAnswerTypeSelectOpen: () => void
}) {
  const renderCount = useRenderCount()

  return (
    <div className="outline outline-1">
      <QuestionTitle
        key={`${field.id}-header`}
        index={index}
        control={control}
        remove={remove}
      />
      <AnswerField
        key={field.id}
        index={index}
        control={control}
        onAnswerTypeSelectOpen={onAnswerTypeSelectOpen}
      />
      {renderCountElement(renderCount, `QuestionContent: ${index}`)}
    </div>
  )
})
QuestionContent.displayName = 'QuestionContent'

export function Question({
  field,
  index,
  control,
  remove,
  isSelected,
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
    <div
      // className={clsx(
      //   'mb-4 rounded border bg-red-100 p-4',
      //   isSelected && 'ring-2 ring-blue-500'
      // )}
      role="button"
      onClick={handleSelection}
    >
      <QuestionContent
        field={field}
        index={index}
        control={control}
        remove={remove}
        onAnswerTypeSelectOpen={handleAnswerTypeSelectOpen}
      />
      {renderCountElement(renderCount, `Question: ${index}`)}
    </div>
  )
}
