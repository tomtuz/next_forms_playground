/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button } from '@/cn/ui'
import { useRenderCount } from '@/hooks/useCountRedraw'
import React from 'react'
import { useFieldArray } from 'react-hook-form'

interface NestedFieldArrayProps {
  nestIndex: number
  control: any
  register: any
}

export function NestedFieldArray({
  nestIndex,
  control,
  register
}: NestedFieldArrayProps) {
  const renderCount = useRenderCount()

  const { fields, remove, append } = useFieldArray({
    control,
    name: `fields.${nestIndex}.options`
  })

  return (
    <div className="flex flex-col items-center gap-2 bg-red-100 p-2">
      {fields.map((item, k) => (
        <div className="flex flex-col items-center" key={item.id}>
          <div className="mb-2 flex w-full items-center justify-between gap-2">
            <label className="font-bold">Nested</label>
            <Button className="w-14" onClick={() => remove(k)}>
              Delete
            </Button>
          </div>

          <input
            className="mb-2 outline outline-1"
            placeholder="Text answer..."
            {...register(`fields.${nestIndex}.options.${k}.label`)}
          />
        </div>
      ))}

      <Button
        onClick={() =>
          append({
            label: 'test label string'
          })
        }
      >
        Add
      </Button>
      <span className="flex w-[80px] flex-col content-center items-center justify-center bg-red-100 text-sm font-bold outline outline-1 outline-red-300">
        <span>{renderCount}</span>
      </span>
    </div>
  )
}
