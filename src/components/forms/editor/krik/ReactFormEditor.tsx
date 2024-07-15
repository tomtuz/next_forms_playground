'use client'

import React, { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

import { Form } from '@/types/react'
import { HeaderSection } from './HeaderSection'
import { InputField } from './InputField'

export function ReactFormEditor() {
  const [form, setForm] = useState<Form>({
    // id: uuidv4(),
    header: { title: '', description: '' },
    fields: []
  })

  const { control, handleSubmit } = useForm<Form>({
    defaultValues: form
  })

  const { fields, append } = useFieldArray({
    control,
    name: 'fields'
  })

  const onSubmit = (data: Form) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl p-4">
      <HeaderSection control={control} />

      {fields.map((field, index) => (
        <InputField
          key={field.id}
          index={index}
          fields={fields}
          control={control}
        />
      ))}

      <button
        type="button"
        onClick={() =>
          // append({ id: uuidv4(), type: 'text', label: '', value: '' })
          append({ type: 'text', label: '' })
        }
        className="mb-4 rounded bg-blue-500 p-2 text-white"
      >
        Add Question
      </button>

      <button type="submit" className="rounded bg-green-500 p-2 text-white">
        Save
      </button>
    </form>
  )
}
