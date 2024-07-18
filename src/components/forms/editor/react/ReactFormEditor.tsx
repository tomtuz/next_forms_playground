'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

// CN UI
import { Button } from '@cn/ui/button'
import { FormItem, FormLabel, Form as FormWrap } from '@cn/ui/form'

import type { Form, FieldType } from '@/types/react'

// Components
import { useRenderCount } from '@/hooks/useCountRedraw'
import { FormHeader } from './FormHeader'
import { QuestionHeader } from './QuestionHeader'
import { QuestionField } from './QuestionField'
import { FieldArray } from './FieldArray'

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
    remove,
    addQuestion
  }
}

export function ReactFormEditor() {
  // -- DEBUG --
  const renderCount = useRenderCount()
  // -- DEBUG --

  const {
    setLastUsedType,
    selectedQuestionIndex
    // control,
    // handleSubmit,
    // fields,
    // register,
    // remove,
    // addQuestion
  } = useFormEditor()
  const [isMounted, setIsMounted] = useState(false)

  const onSubmit = (data: Form) => {
    try {
      console.log(JSON.stringify(data, null, 2))
    } catch (error) {
      console.error('Error processing form data:', error)
    }
  }
  // name={`fields.${index}.type`}
  // control={control}

  const form = useForm<Form>({
    defaultValues: {
      header: { title: '', description: '' },
      fields: []
    }
  })

  // we should consider separating this to a separate component, so that we could avoid redrawing this form
  // const { fields, append, remove } = useFieldArray({
  //   control: form.control,
  //   name: 'fields'
  // })

  // const addQuestion = useCallback(() => {
  //   append({ label: '', type: 'text', options: [] })
  //   // setSelectedQuestionIndex(fields.length)
  // }, [append, fields.length])

  return (
    <FormWrap {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {/* Question Header / label */}
        <h1 className="w-full p-4 text-center text-3xl">React Base</h1>

        <FormHeader register={form.register} control={form.control} />

        {/* NestedArray / Question Answers / options */}
        <FieldArray form={form} />
        {/* Controls */}
        {/* <Button type="button" onClick={addQuestion}>
          Add Question
        </Button> */}
        <Button type="submit">Print Form Data</Button>

        <span className="flex w-[80px] flex-col content-center items-center justify-center bg-red-100 text-sm font-bold outline outline-1 outline-red-300">
          <span>{renderCount}</span>
        </span>
      </form>
    </FormWrap>
  )
}
