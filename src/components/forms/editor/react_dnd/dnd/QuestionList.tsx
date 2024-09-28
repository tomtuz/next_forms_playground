import { useCallback, useState } from 'react'
import { Control } from 'react-hook-form'

import { FieldType, Form } from '@/types/react'

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'

import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'

import { SortableInputField } from '@forms/editor/react_dnd/SortableInputField'

// DND wrapper - FieldArray
export function DNDQuestionList({
  control,
  fields,
  move,
  remove,
  setSelectedQuestionIndex,
  setLastUsedType,
  handleSelect,
  selectedQuestionIndex
}: {
  control: Control<Form>
  fields: any[]
  move: (from: number, to: number) => void
  remove: (index?: number | number[]) => void
  setSelectedQuestionIndex: (index: number) => void
  setLastUsedType: (type: FieldType) => void
  handleSelect: (index: number) => void
  selectedQuestionIndex: number | null
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
