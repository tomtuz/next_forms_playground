'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@cn/ui/button'
import { Form as FormWrap } from '@cn/ui/form'
import type { Form } from '@/types/react'
import { FormHeader } from './FormHeader'
import { FieldArray } from './FieldArray'

const defaultValues: Form = {
  header: { title: '', description: '' },
  fields: []
}

export function ReactFormEditor() {
  const form = useForm<Form>({
    defaultValues
  })

  const onSubmit = (data: Form) => {
    try {
      console.log(JSON.stringify(data, null, 2))
    } catch (error) {
      console.error('Error processing form data:', error)
    }
  }

  const handlePrintData = () => {
    const data = form.getValues()
    console.log(JSON.stringify(data, null, 2))
  }

  return (
    <FormWrap {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <h1 className="w-full p-4 text-center text-3xl">React Base</h1>

        <FormHeader control={form.control} />
        <FieldArray form={form} />

        <div className="flex space-x-4">
          <Button type="submit">Submit Form</Button>
          <Button type="button" onClick={handlePrintData}>
            Print Data
          </Button>
        </div>
      </form>
    </FormWrap>
  )
}
