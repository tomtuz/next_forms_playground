import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { Form } from '@/types/react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import { Button } from '@/cn/ui'
import { Question } from './memoized/Question'
import { useRenderCount, renderCountElement } from '@/hooks/useCountRedraw'
import { AnswerField } from './AnswerField'
import { QuestionTitle } from './QuestionTitle'
import clsx from 'clsx'

interface FieldArrayProps {
  form: UseFormReturn<Form, any, undefined>
}

export function FieldArray({ form }: Readonly<FieldArrayProps>) {
  const renderCount = useRenderCount()
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<
    number | null
  >(null)

  const newQuestionRef = useRef<number | null>(null)

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'fields'
  })

  const addQuestion = useCallback(() => {
    append({ label: '', type: 'text', options: [] })
    newQuestionRef.current = fields.length
  }, [append, fields.length])

  const handleQuestionSelect = useCallback((index: number) => {
    setSelectedQuestionIndex((prevIndex) =>
      prevIndex === index ? null : index
    )
  }, [])

  useEffect(() => {
    if (newQuestionRef.current !== null) {
      setSelectedQuestionIndex(newQuestionRef.current)
      newQuestionRef.current = null
    }
  }, [fields.length])

  return (
    <div className="p-4">
      {/* {memoizedQuestions} */}
      {fields.map((field, index) => (
        <div
          key={`${field.id}-div`}
          className={clsx(
            'mb-4 rounded border bg-red-100',
            selectedQuestionIndex === index && 'ring-2 ring-blue-500'
          )}
        >
          <Question
            key={field.id}
            field={field}
            index={index}
            control={form.control}
            remove={remove}
            isSelected={selectedQuestionIndex === index}
            onSelect={handleQuestionSelect}
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
