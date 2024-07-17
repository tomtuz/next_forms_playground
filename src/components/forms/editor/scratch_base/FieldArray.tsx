'use client'

import React, { useEffect, useState } from 'react'
import {
  Control,
  useFieldArray,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue
} from 'react-hook-form'
import { Button } from '@/cn/ui'
import { Form } from '@/types/react'
import { NestedFieldArray } from './NestedFieldArray'

let renderCount = 0

interface FieldArrayProps {
  control: Control<Form, any>
  register: UseFormRegister<Form>
  setValue: UseFormSetValue<Form>
  getValues: UseFormGetValues<Form>
}

export function FieldArray({
  control,
  register,
  getValues,
  setValue
}: FieldArrayProps) {
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: 'fields'
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
      <div className="m-2 flex items-center justify-center gap-6">
        {fields.map((item, index) => (
          <div className="flex flex-col" key={item.id}>
            <div className="mb-2 flex items-center justify-between bg-green-100 p-2">
              {/* Question Header / label */}
              <input
                className="w-[110px] p-1 outline outline-1"
                placeholder="Question Title"
                {...register(`fields.${index}.label`)}
              />

              <Button
                className="w-14"
                type="button"
                onClick={() => remove(index)}
              >
                Delete
              </Button>
            </div>
            {/* NestedArray / Question Answers / options */}
            <NestedFieldArray nestIndex={index} {...{ control, register }} />
          </div>
        ))}
      </div>

      <section className="flex w-full items-center justify-between gap-2">
        <div className="flex gap-2">
          <Button
            type="button"
            onClick={() => {
              append({ label: '', type: 'text', options: [] })
            }}
          >
            append
          </Button>
          <Button
            type="button"
            onClick={() => {
              prepend({ label: '', type: 'text', options: [] })
            }}
          >
            prepend
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            onClick={() => {
              setValue('fields', [
                ...(getValues().fields || []),
                {
                  label: '',
                  type: 'text',
                  options: [{ label: 'appended nested' }]
                }
              ])
            }}
          >
            Append Nested
          </Button>
          <Button
            type="button"
            onClick={() => {
              setValue('fields', [
                {
                  label: '',
                  type: 'text',
                  options: [{ label: 'prepend nested' }]
                },
                ...(getValues().fields || [])
              ])
            }}
          >
            Prepend Nested
          </Button>
        </div>
      </section>

      <span className="flex w-full items-center justify-between">
        Render Count: {renderCount}
      </span>
    </div>
  )
}
