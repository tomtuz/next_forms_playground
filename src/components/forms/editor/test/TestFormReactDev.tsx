'use client'

import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { Button } from '@/cn/ui'

export function TestFormReactDev() {
  const { register, control, handleSubmit } = useForm({
    mode: 'onChange'
  })

  return (
    <>
      <form
        className="outline outline-gray-100"
        onSubmit={handleSubmit((d) => console.log(d))}
      >
        <h1>TestReactHookDevForm</h1>
        <div className="flex flex-col gap-2 bg-pink-200 p-2 outline outline-1">
          <input placeholder="Enter value" {...register('test')} />
        </div>
        <div className="flex w-full items-center justify-between">
          <Button type="submit">Save</Button>
        </div>
      </form>
      <DevTool control={control} />
    </>
  )
}
