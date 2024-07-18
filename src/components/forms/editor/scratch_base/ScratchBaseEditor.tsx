'use client'

import React from 'react'
import { useForm, UseFormRegister } from 'react-hook-form'
import { Button } from '@/cn/ui'
import { Form } from '@/types/react'

import { useRenderCount } from '@/hooks/useCountRedraw'
import { FieldArray } from './FieldArray'

const defaultFormData = {
  header: { title: '', description: '' },
  fields: []
}

interface HeaderSectionProps {
  register: UseFormRegister<Form>
}

export function FormHeader({ register }: Readonly<HeaderSectionProps>) {
  // -- DEBUG --
  const renderCount = useRenderCount()
  // -- DEBUG --

  return (
    <div className="bg-purple-100 p-4 outline outline-1">
      <input
        className="mb-2 w-full rounded border p-2"
        {...register('header.title')}
      />

      <input
        className="mb-4 w-full rounded border p-2"
        {...register('header.description')}
      />
      <span className="flex w-[80px] flex-col content-center items-center justify-center bg-red-100 text-sm font-bold outline outline-1 outline-red-300">
        <span>{renderCount}</span>
      </span>
    </div>
  )
}

export function ScratchBaseEditor() {
  // const renderCount = useRenderCount()

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

      <FormHeader register={register} />

      <div className="p-2 outline outline-1 outline-pink-100">
        <FieldArray {...{ control, register, getValues, setValue }} />
      </div>

      <div className="flex w-full justify-end gap-3">
        <Button type="button" onClick={() => reset(defaultFormData)}>
          Reset
        </Button>
        <Button type="submit">Save</Button>
      </div>
      {/* <span className="flex w-[80px] flex-col content-center items-center justify-center bg-red-100 text-sm font-bold outline outline-1 outline-red-300">
        <span>{renderCount}</span>
      </span> */}
    </form>
  )
}
