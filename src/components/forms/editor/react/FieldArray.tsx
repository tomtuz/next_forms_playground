import React, { useCallback, useState } from 'react'
import { FieldType, Form } from '@/types/react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import { Button } from '@/cn/ui'
import { QuestionField } from './QuestionField'
import { QuestionHeader } from './QuestionHeader'

interface FieldArrayProps {
  form: UseFormReturn<Form, any, undefined>
}

const defaultFieldType: FieldType = 'text'

export function FieldArray({ form }: Readonly<FieldArrayProps>) {
  const [lastUsedType, setLastUsedType] = useState<FieldType>(defaultFieldType)
  // Selected Question index state for outline
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<
    number | null
  >(null)

  const { fields, append, remove, prepend } = useFieldArray({
    control: form.control,
    name: 'fields'
  })

  const addQuestion = useCallback(() => {
    append({ label: '', type: 'text', options: [] })
    // setSelectedQuestionIndex(fields.length)
  }, [append, fields.length])

  return (
    <div>
      <div>Hello</div>
      {fields.map((field, index) => (
        <div key={field.id}>
          <QuestionHeader
            index={index}
            control={form.control}
            remove={remove}
          />
          <QuestionField
            key={field.id}
            index={index}
            control={form.control}
            register={form.register}
            setLastUsedType={setLastUsedType}
            isSelected={index === selectedQuestionIndex}
          />
        </div>
      ))}
      <Button type="button" onClick={addQuestion}>
        Add Question
      </Button>
    </div>
  )
}
