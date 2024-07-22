import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { Form } from '@/types/react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Button } from '@/cn/ui'
import { Question } from './memoized/Question'
import { useRenderCount, renderCountElement } from '@/hooks/useCountRedraw'
import clsx from 'clsx'

export function FieldArray() {
  const renderCount = useRenderCount()
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number | null>(
    0
  )
  const activeQuestionIndexRef = useRef<number | null>(activeQuestionIndex)
  const newQuestionRef = useRef<number | null>(0)

  const { control } = useFormContext<Form>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields'
  })

  useEffect(() => {
    activeQuestionIndexRef.current = activeQuestionIndex
  }, [activeQuestionIndex])

  const handleRemove = useCallback(
    (index: number) => {
      remove(index)
      if (activeQuestionIndexRef.current === index) {
        setActiveQuestionIndex(null)
      }
    },
    [remove]
  )

  const addQuestion = useCallback(() => {
    append({ label: '', type: 'text', options: [] })
    newQuestionRef.current = fields.length
  }, [append, fields.length])

  const handleQuestionActive = useCallback((index: number) => {
    setActiveQuestionIndex((prevIndex) => (prevIndex === index ? index : index))
  }, [])

  useEffect(() => {
    if (newQuestionRef.current !== null) {
      setActiveQuestionIndex(newQuestionRef.current)
      newQuestionRef.current = null
    }
  }, [fields.length])

  const formInputs = React.useMemo(
    () =>
      fields.map((field, index) => (
        <div
          key={`${field.id}-div`}
          className={clsx(
            'mb-4 rounded border bg-red-100',
            activeQuestionIndex === index && 'ring-2 ring-blue-500'
          )}
        >
          <Question
            key={field.id}
            field={field}
            index={index}
            remove={handleRemove}
            onSelect={handleQuestionActive}
            isSelected={activeQuestionIndex === index}
          />
        </div>
      )),
    [handleQuestionActive, handleRemove, fields.length]
  )

  return (
    <div className="p-4">
      {formInputs}
      <Button type="button" onClick={addQuestion}>
        Add Question
      </Button>
      {renderCountElement(renderCount, 'FieldArray')}
    </div>
  )
}
