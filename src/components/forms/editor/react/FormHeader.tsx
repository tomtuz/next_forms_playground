import React from 'react'
import {
  Control,
  Controller,
  useFormContext,
  UseFormRegister
} from 'react-hook-form'
import { Form } from '@/types/react'
import { useRenderCount, renderCountElement } from '@/hooks/useCountRedraw'
import { FormItem, FormLabel } from '@/cn/ui/form'
import { Input } from '@/cn/ui'

interface HeaderSectionProps {
  control: Control<Form>
}

export function FormHeader({ control }: HeaderSectionProps) {
  // -- DEBUG --
  const renderCount = useRenderCount()
  // -- DEBUG --
  const { register } = useFormContext<Form>()

  // Preferred templating
  // -----------
  // Vanilla <input>
  // Component (Just <Input /> from ShadCN UI)
  // Component (FormItem, FormLabel, etc., from ShadCN UI)

  return (
    <div className="relative bg-purple-100 p-4">
      <Controller
        name="header.title"
        control={control}
        render={({ field }) => (
          <>
            <div>Form Title</div>
            <Input
              {...field}
              placeholder="Form Title"
              className="mb-2 w-full rounded border p-2"
            />
          </>
        )}
      />
      <input
        {...register('header.description')}
        placeholder="Form Description"
      />

      {/* <Controller
        name="header.description"
        control={control}
        render={({ field }) => (
          <>
            <div>Header Title</div>
            <Input
              {...field}
              placeholder="Header Title"
              className="mb-2 w-full rounded border p-2"
            />
          </>
        )}
      /> */}

      {/* <VanillaHeader register={register} /> */}
      {/* <span className="flex w-[80px] flex-col content-center items-center justify-center bg-red-100 text-sm font-bold outline outline-1 outline-red-300">
        <span>{renderCount}</span>
      </span> */}
      {renderCountElement(renderCount, 'FormHeader')}
    </div>
  )
}

interface VanillaHeaderProps {
  register: UseFormRegister<Form>
}
function VanillaHeader({ register }: VanillaHeaderProps) {
  return (
    <>
      <input
        className="mb-2 w-full rounded border p-2"
        {...register(`header.title`)}
      />
      <input
        className="mb-4 w-full rounded border p-2"
        {...register(`header.description`)}
      />
    </>
  )
}
