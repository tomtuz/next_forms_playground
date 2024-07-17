'use client'

import React, { useEffect, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { Button } from '@/cn/ui'
import { NestedFieldArray } from './NestedFieldArray'

let renderCount = 0

interface FieldArrayProps {
  control: any
  register: any
  setValue: any
  getValues: any
}

export function FieldArray({
  control,
  register,
  setValue,
  getValues
}: FieldArrayProps) {
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: 'test'
  })

  renderCount += 1

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="mb-4 rounded border bg-white p-4">
      <ul className="mb-2 flex items-center justify-center gap-6">
        {fields.map((item, index) => (
          <li className="flex w-40 flex-col" key={item.id}>
            <input
              className="p-1 outline outline-1"
              placeholder="Text answer..."
              {...register(`test.${index}.name`)}
            />

            <Button type="button" onClick={() => remove(index)}>
              Delete
            </Button>
            <NestedFieldArray nestIndex={index} {...{ control, register }} />
          </li>
        ))}
      </ul>

      <section className="flex w-full items-center justify-between">
        <Button
          type="button"
          onClick={() => {
            append({ name: 'append' })
          }}
        >
          append
        </Button>

        <Button
          type="button"
          onClick={() => {
            setValue('test', [
              ...(getValues().test || []),
              {
                name: 'append',
                nestedArray: [{ field1: 'append', field2: 'append' }]
              }
            ])
          }}
        >
          Append Nested
        </Button>

        <Button
          type="button"
          onClick={() => {
            prepend({ name: 'append' })
          }}
        >
          prepend
        </Button>

        <Button
          type="button"
          onClick={() => {
            setValue('test', [
              {
                name: 'append',
                nestedArray: [{ field1: 'Prepend', field2: 'Prepend' }]
              },
              ...(getValues().test || [])
            ])
          }}
        >
          prepend Nested
        </Button>
      </section>

      <span className="flex w-full items-center justify-between">
        Render Count: {renderCount}
      </span>
    </div>
  )
}
