'use client'

import React, { useCallback, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

// CN UI
import { Button } from '@cn/ui/button'

import type { Form, FieldType } from '@/types/react'

// Components
import { HeaderSection } from './HeaderSection'
import { QuestionField } from './QuestionField'

const defaultFieldType: FieldType = 'text'

// Form state management hook
function useFormEditor() {
  const [lastUsedType, setLastUsedType] = useState<FieldType>(defaultFieldType)

  // Selected Question index state for outline
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<
    number | null
  >(null)

  const { control, handleSubmit, watch, register } = useForm<Form>({
    defaultValues: {
      header: { title: '', description: '' },
      fields: []
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields'
  })

  // const watchFieldArray = watch('fields')
  // const controlledFields = fields.map((field, index) => ({
  //   ...field,
  //   ...watchFieldArray[index]
  // }))

  const addQuestion = useCallback(() => {
    append({ label: '', type: lastUsedType, options: [] })
    // setSelectedQuestionIndex(fields.length)
  }, [append, lastUsedType, fields.length])

  // const handleSelect = useCallback((index: number) => {
  //   setSelectedQuestionIndex(index)
  // }, [])

  return {
    lastUsedType,
    setLastUsedType,
    selectedQuestionIndex,
    setSelectedQuestionIndex,
    control,
    handleSubmit,
    fields,
    register,
    // controlledFields,
    // move,
    remove,
    addQuestion
    // handleSelect
  }
}

export function ReactFormEditor() {
  const {
    setLastUsedType,
    selectedQuestionIndex,
    control,
    handleSubmit,
    fields,
    register,
    // controlledFields,
    // move,
    remove,
    addQuestion
    // handleSelect
  } = useFormEditor()

  const onSubmit = (data: Form) => {
    try {
      console.log(JSON.stringify(data, null, 2))
    } catch (error) {
      console.error('Error processing form data:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Header */}
      <HeaderSection register={register} control={control} />
      {/* Questions */}
      {fields.map((field, index) => (
        // {controlledFields.map((field, index) => (
        <QuestionField
          key={field.id}
          index={index}
          control={control}
          register={register}
          remove={remove}
          setLastUsedType={setLastUsedType}
          isSelected={index === selectedQuestionIndex}
          // onSelect={handleSelect}
        />
      ))}
      {/* Controls */}
      <Button type="button" onClick={addQuestion}>
        Add Question
      </Button>
      <Button type="submit">Print Form Data</Button>
    </form>
  )
}
