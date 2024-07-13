'use client'

// Native
import React from 'react'

// UI
import { FormFieldInput } from '@/components/field/FormFieldInput'
import { FormHeader } from '@/components/field/FormHeader'

// CN UI
import { Button } from '@/cn/ui/button'
import { Separator } from '@/cn/ui/separator'
import { useToast } from '@/cn/ui/use-toast'

// Hooks
import { useFormData } from '@/hooks/useFormData'

// State management
import { useFormContext } from '@/contexts/FormContext'

// Router
import { useRouter } from 'next/navigation'

// Types
import type { FieldType } from '@/types'

export function FormEditor({ formId }: { formId?: string }) {
  const router = useRouter()

  // Hooks
  const { addForm, updateForm } = useFormContext() // context hooks
  const { formData, addField, handleFieldChange, handleHeaderChange } =
    useFormData(formId)
  const { toast } = useToast() // notifications

  const addFieldHandler = (e: React.MouseEvent, type: FieldType) => {
    e.preventDefault()
    addField(type)
  }

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (formId) {
      updateForm(formData)
    } else {
      addForm(formData)
      router.push(`/form/list`)

      // OR redirect to edit page form/[id]
      // const newFormId = addForm(formData)
      // router.push(`/form/${newFormId}`)
    }
    toast({ title: 'Success', description: 'Form saved successfully' })
  }

  return (
    <form className="grid w-full items-start gap-6 rounded-lg border">
      <FormHeader
        title={formData.header.title}
        description={formData.header.description}
        onUpdate={handleHeaderChange}
      />
      <Separator className="my-4" />

      {/* TODO: figure out why redraw happens without React.memo */}
      {/* {formData.fields.map((field) => (
        <FormFieldInput
          key={field.id}
          field={field}
          onInputChange={handleFieldChange}
        />
      ))} */}

      {formData.fields.map((field) => (
        <MemoFormFieldInput
          key={field.id}
          field={field}
          onInputChange={handleFieldChange}
        />
      ))}

      <AddFieldButtons onAdd={addFieldHandler} />

      <div className="flex justify-center">
        <Button onClick={handleSave}>Save form</Button>
      </div>
    </form>
  )
}

// an optimization to prevent redraw
// TODO: investigate what causes FormFieldInput onChange redraw
const MemoFormFieldInput = React.memo(
  FormFieldInput,
  (prevProps, nextProps) =>
    prevProps.field.id === nextProps.field.id &&
    prevProps.field.label === nextProps.field.label &&
    prevProps.field.type === nextProps.field.type
)

// Input selector component that lives here for quick design iteration
function AddFieldButtons({
  onAdd
}: {
  onAdd: (e: React.MouseEvent, type: FieldType) => void
}) {
  return (
    <div className="flex justify-between">
      {['text', 'number', 'textarea', 'select'].map((type) => (
        <Button key={type} onClick={(e) => onAdd(e, type as FieldType)}>
          Add {type}
        </Button>
      ))}
    </div>
  )
}
