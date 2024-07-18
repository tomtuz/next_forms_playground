import React from 'react'
import { Control, Controller, UseFormRegister } from 'react-hook-form'
import { Form } from '@/types/react'
import { FormItem, FormLabel } from '@/cn/ui/form'
import { useRenderCount } from '@/hooks/useCountRedraw'

interface HeaderSectionProps {
  control: Control<Form>
  register: UseFormRegister<Form>
}

export function FormHeader({ control, register }: HeaderSectionProps) {
  // -- DEBUG --
  const renderCount = useRenderCount()
  // -- DEBUG --

  // Using custom UI, has runtime overhead because of event tracking by react-hook-form

  return (
    <div className="bg-purple-100 p-4">
      <Controller
        name="header.title"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            placeholder="Form Title"
            className="mb-2 w-full rounded border p-2"
          />
        )}
      />
      {/* <FormItem>
        <FormLabel>Form title</FormLabel>
        <input
          className="mb-2 w-full rounded border p-2"
          {...register(`header.title`)}
        />
      </FormItem> */}
      {/* <input
        className="mb-2 w-full rounded border p-2"
        {...register(`header.title`)}
      /> */}

      {/* <Controller
        name="header.description"
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            placeholder="Form Description"
            className="mb-4 w-full rounded border p-2"
          />
        )}
      /> */}

      {/* <FormItem>
        <FormLabel>Form description</FormLabel>
        <input
          className="mb-4 w-full rounded border p-2"
          {...register(`header.description`)}
        />
      </FormItem> */}

      <input
        className="mb-4 w-full rounded border p-2"
        {...register(`header.description`)}
      />
      <span className="flex w-[80px] flex-col content-center items-center justify-center bg-red-100 text-sm font-bold outline outline-1 outline-red-300">
        <span>{renderCount}</span>
      </span>
    </div>
  )
}
