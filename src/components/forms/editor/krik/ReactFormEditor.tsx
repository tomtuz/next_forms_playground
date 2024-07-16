'use client'

import React, { useCallback, useState } from 'react'
import { useFieldArray, useForm, Control } from 'react-hook-form'
import { Button } from '@cn/ui/button'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import type { Form, FieldType } from '@/types/react'
import { HeaderSection } from './HeaderSection'
import { SortableInputField } from './SortableInputField'

const defaultFieldType: FieldType = 'text'

// Custom hook for form state management
function useFormEditor() {
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

  const { fields, append, move, remove } = useFieldArray({
    control,
    name: 'fields'
  })

  const addQuestion = useCallback(() => {
    append({ label: '', type: lastUsedType, options: [] })
    setSelectedQuestionIndex(fields.length)
  }, [append, lastUsedType, fields.length])

  const handleSelect = useCallback((index: number) => {
    setSelectedQuestionIndex(index)
  }, [])

  return {
    lastUsedType,
    setLastUsedType,
    selectedQuestionIndex,
    setSelectedQuestionIndex,
    control,
    handleSubmit,
    fields,
    move,
    remove,
    addQuestion,
    handleSelect
  }
}

function SortableQuestionList({
  control,
  fields,
  move,
  remove,
  setSelectedQuestionIndex,
  selectedQuestionIndex,
  setLastUsedType,
  handleSelect
}: {
  control: Control<Form>
  fields: any[]
  move: (from: number, to: number) => void
  remove: (index?: number | number[]) => void
  setSelectedQuestionIndex: (index: number) => void
  selectedQuestionIndex: number | null
  setLastUsedType: (type: FieldType) => void
  handleSelect: (index: number) => void
}) {
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (active.id !== over?.id) {
        const oldIndex = fields.findIndex((field) => field.id === active.id)
        const newIndex = fields.findIndex((field) => field.id === over?.id)
        move(oldIndex, newIndex)
        setSelectedQuestionIndex(newIndex)
      }
      setActiveId(null)
    },
    [fields, move, setSelectedQuestionIndex]
  )

  // const handleDragEnd = (event: DragEndEvent) => {
  //   // ... existing drag end logic
  //   setActiveId(null)
  // }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
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
            remove={remove}
            setLastUsedType={setLastUsedType}
            isSelected={index === selectedQuestionIndex}
            onSelect={handleSelect}
            onRemove={() => remove(index)}
          />
        ))}
      </SortableContext>
      <DragOverlay>
        {activeId ? (
          <SortableInputField
            id={activeId}
            index={fields.findIndex((f) => f.id === activeId)}
            control={control}
            remove={remove}
            setLastUsedType={setLastUsedType}
            isSelected={false}
            onSelect={() => {}}
            onRemove={() => {}}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

// Separate component for DnD context
function SortableQuestionList2({
  control,
  fields,
  move,
  remove,
  setSelectedQuestionIndex,
  selectedQuestionIndex,
  setLastUsedType,
  handleSelect
}: {
  control: Control<Form>
  fields: any[]
  move: (from: number, to: number) => void
  remove: (index?: number | number[]) => void
  setSelectedQuestionIndex: (index: number) => void
  selectedQuestionIndex: number | null
  setLastUsedType: (type: FieldType) => void
  handleSelect: (index: number) => void
}) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (active.id !== over?.id) {
        const oldIndex = fields.findIndex((field) => field.id === active.id)
        const newIndex = fields.findIndex((field) => field.id === over?.id)
        move(oldIndex, newIndex)
        setSelectedQuestionIndex(newIndex)
      }
    },
    [fields, move, setSelectedQuestionIndex]
  )

  return (
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
            remove={remove}
            setLastUsedType={setLastUsedType}
            isSelected={index === selectedQuestionIndex}
            onSelect={handleSelect}
            onRemove={() => remove(index)}
          />
        ))}
      </SortableContext>
    </DndContext>
  )
}

export function ReactFormEditor() {
  const {
    lastUsedType,
    setLastUsedType,
    selectedQuestionIndex,
    control,
    handleSubmit,
    fields,
    move,
    remove,
    addQuestion,
    handleSelect
  } = useFormEditor()

  const onSubmit = (data: Form) => {
    try {
      console.log(JSON.stringify(data, null, 2))
      // Here you can add further processing or API calls
    } catch (error) {
      console.error('Error processing form data:', error)
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HeaderSection control={control} />
      <SortableQuestionList
        control={control}
        fields={fields}
        move={move}
        remove={remove}
        setSelectedQuestionIndex={handleSelect}
        selectedQuestionIndex={selectedQuestionIndex}
        setLastUsedType={setLastUsedType}
        handleSelect={handleSelect}
      />
      <Button type="button" onClick={addQuestion}>
        Add Question
      </Button>
      <Button type="submit">Print Form Data</Button>
    </form>
  )
}
