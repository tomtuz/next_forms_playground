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
import { DevTool } from '@hookform/devtools'
import { useRenderCount } from '@/hooks/useCountRedraw'
import { AnswerPlaceholder } from './AnswerPlaceholder'
import { FieldTypeSelect } from './FieldTypeSelect'

interface SortableInputFieldProps {
  index: number
  control: Control<Form>
  // remove: () => void
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
  // remove,
  setLastUsedType,
  isSelected
  // onSelect
}: SortableInputFieldProps) {
  // -- DEBUG --
  const renderCount = useRenderCount()
  // -- DEBUG --

  const inputRef = useRef<HTMLInputElement>(null)
  const fieldType = useWatch({
    control,
    name: `fields.${index}.type`,
    defaultValue: 'text' as FieldType
  })

  const [isMounted, setIsMounted] = useState(false)

  // const { fields, remove, append } = useFieldArray({
  //   control,
  //   name: `fields.${index}.options`
  // })

  // TODO: This causes parent rerender
  // useEffect(() => {
  //   setLastUsedType(fieldType)
  // }, [fieldType, setLastUsedType])

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
        'mb-4 rounded border bg-blue-100 p-4',
        isSelected && 'ring-2 ring-blue-500'
      )}
      // onClick={handleClick}
      role="button"
    >
      <FieldTypeSelect index={index} control={control} />
      <AnswerPlaceholder
        fieldType={fieldType}
        fieldIndex={index}
        register={register}
        control={control}
      />
      <span className="flex w-[80px] flex-col content-center items-center justify-center bg-red-100 text-sm font-bold outline outline-1 outline-red-300">
        <span>{renderCount}</span>
      </span>
    </div>
  )
}
