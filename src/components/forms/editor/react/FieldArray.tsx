import React, { useRef, useEffect, useState, useCallback } from 'react'
import { Form } from '@/types/react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Button } from '@cn/ui'
import { Question } from './memoized/Question'
import { useRenderCount, renderCountElement } from '@/hooks/useCountRedraw'
import clsx from 'clsx'

export function FieldArray() {
  const renderCount = useRenderCount()
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number | null>(
    null
  )
  const newQuestionRef = useRef<number | null>(null)

  const { control } = useFormContext<Form>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields'
  })

  const addQuestion = useCallback(() => {
    append({ label: '', type: 'text', options: [] })
    newQuestionRef.current = fields.length
  }, [append, fields.length])

  const handleQuestionActive = useCallback((index: number) => {
    setActiveQuestionIndex(index)
  }, [])

  const handleRemove = useCallback(
    (index: number) => {
      remove(index)
      if (activeQuestionIndex === index) {
        setActiveQuestionIndex(null)
      }
    },
    [remove, activeQuestionIndex]
  )

  useEffect(() => {
    if (newQuestionRef.current !== null) {
      setActiveQuestionIndex(newQuestionRef.current)
      newQuestionRef.current = null
    }
  }, [fields.length])

  return (
    <div className="p-4">
      {fields.map((field, index) => (
        <div
          key={`${field.id}-div`}
          className={clsx(
            'mb-4 rounded border bg-red-100',
            activeQuestionIndex === index && 'ring-2 ring-blue-500'
          )}
          onClick={() => handleQuestionActive(index)}
        >
          <Question
            key={field.id}
            field={field}
            index={index}
            remove={handleRemove}
            onSelect={handleQuestionActive}
          />
        </div>
      ))}

      <Button type="button" onClick={addQuestion}>
        Add Question
      </Button>
      {renderCountElement(renderCount, 'FieldArray')}
    </div>
  )
}
