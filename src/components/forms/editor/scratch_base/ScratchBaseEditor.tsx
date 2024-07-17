'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/cn/ui'
import { Form } from '@/types/react'

import { FieldArray } from './FieldArray'

const defaultFormData = {
  header: { title: '', description: '' },
  fields: []
}

export function ScratchBaseEditor() {
  const { control, register, handleSubmit, getValues, reset, setValue } =
    useForm<Form>({
      defaultValues: defaultFormData
    })

  const onSubmit = (data: any) => {
    try {
      console.log(JSON.stringify(data, null, 2))
    } catch (error) {
      console.error('Error processing form data:', error)
    }
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="w-full p-4 text-center text-3xl">Scratch Base</h1>

      <input
        className="mb-2 w-full rounded border p-2"
        {...register('header.title')}
      />

      <input
        className="mb-4 w-full rounded border p-2"
        {...register('header.description')}
      />

      <div className="p-2 outline outline-1 outline-pink-100">
        <FieldArray {...{ control, register, getValues, setValue }} />
      </div>

      <div className="flex w-full justify-end gap-3">
        <Button type="button" onClick={() => reset(defaultFormData)}>
          Reset
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
