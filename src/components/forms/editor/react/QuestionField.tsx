import React, { useEffect, useRef, KeyboardEvent, useState } from 'react'
import {
  Control,
  Controller,
  useFieldArray,
  UseFormRegister,
  useWatch
} from 'react-hook-form'
import { Button, Input } from '@/cn/ui'
import clsx from 'clsx'

import { Form, FieldType } from '@/types/react'
import { AnswerPlaceholder } from './AnswerPlaceholder'
import { FieldTypeSelect } from './FieldTypeSelect'

interface SortableInputFieldProps {
  index: number
  control: Control<Form>
  remove: () => void
  register: UseFormRegister<Form>
  setLastUsedType: (type: FieldType) => void
  isSelected: boolean
  // onSelect: (index: number) => void
}

// Nested field array
export function QuestionField({
  index,
  control,
  register,
  remove,
  setLastUsedType,
  isSelected
  // onSelect
}: SortableInputFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const fieldType = useWatch({
    control,
    name: `fields.${index}.type`,
    defaultValue: 'text' as FieldType
  })

  useEffect(() => {
    setLastUsedType(fieldType)
  }, [fieldType, setLastUsedType])

  // const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
  //   onSelect(index)
  // }

  // const { fields, append, remove, prepend } = useFieldArray({
  //   control,
  //   name: 'fields'
  // })

  return (
    <div
      className={clsx(
        'mb-4 rounded border bg-white p-4',
        isSelected && 'ring-2 ring-blue-500'
      )}
      // onClick={handleClick}
      role="button"
    >
      <QuestionHeader
        index={index}
        control={control}
        inputRef={inputRef}
        register={register}
        remove={remove}
      />
      {/* <FieldTypeSelect index={index} control={control} /> */}
      {/* <AnswerPlaceholder
        fieldType={fieldType}
        fieldIndex={index}
        register={register}
        control={control}
      /> */}
    </div>
  )
}

interface QuestionHeaderProps {
  index: number
  control: Control<Form>
  inputRef: React.RefObject<HTMLInputElement>
  register: UseFormRegister<Form>
  remove: () => void
}

function QuestionHeader({
  index,
  control,
  inputRef,
  register,
  remove
}: QuestionHeaderProps) {
  return (
    <div className="mb-2 flex items-center">
      <div className="flex w-full">
        {/* <Controller
          name={`fields.${index}.label`}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              ref={inputRef}
              placeholder="Question"
              className="w-full"
            />
          )}
        /> */}
        <input {...register(`fields.${index}.label`)} />

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={remove}
          className="ml-2 bg-red-100"
        >
          Remove
        </Button>
      </div>
    </div>
  )
}
