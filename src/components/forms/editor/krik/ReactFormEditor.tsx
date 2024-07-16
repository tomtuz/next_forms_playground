'use client'

import React, { useCallback, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import { Button } from '@cn/ui/button'

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove
} from '@dnd-kit/sortable'

import type { Form, FieldType } from '@/types/react'

import { HeaderSection } from './HeaderSection'
import { InputField } from './InputField'
import { SortableInputField } from './SortableInputField'

const defaultFieldType: FieldType = 'text'

export function ReactFormEditor() {
  const [lastUsedType, setLastUsedType] = useState<FieldType>(defaultFieldType)
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<
    number | null
  >(null)
  const { control, handleSubmit } = useForm<Form>({
    defaultValues: {
      header: { title: '', description: '' },
      fields: []
    }
  })
  const { fields, append, move } = useFieldArray({
    control,
    name: 'fields'
  })

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const onSubmit = (data: Form) => {
    console.log(data)
  }

  const addQuestion = useCallback(() => {
    append({ label: '', type: lastUsedType, options: [] })
    setSelectedQuestionIndex(fields.length)
  }, [append, lastUsedType, fields.length])

  const handleDragEnd = useCallback(
    (event: any) => {
      const { active, over } = event

      if (active.id !== over.id) {
        const oldIndex = fields.findIndex((field) => field.id === active.id)
        const newIndex = fields.findIndex((field) => field.id === over.id)
        move(oldIndex, newIndex)
        setSelectedQuestionIndex(newIndex)
      }
    },
    [fields, move]
  )

  const handleSelect = useCallback((index: number) => {
    setSelectedQuestionIndex(index)
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HeaderSection control={control} />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={fields.map((field) => field.id)}
          strategy={verticalListSortingStrategy}
        >
          {fields.map((field, index) => (
            <SortableInputField
              key={field.id}
              id={field.id}
              index={index}
              control={control}
              setLastUsedType={setLastUsedType}
              isSelected={index === selectedQuestionIndex}
              onSelect={handleSelect}
            />
          ))}
        </SortableContext>
      </DndContext>
      <Button type="button" onClick={addQuestion}>
        Add Question
      </Button>
      <Button type="submit">Save</Button>
    </form>
  )
}
