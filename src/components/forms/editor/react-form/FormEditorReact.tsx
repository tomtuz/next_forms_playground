'use client'

import React, { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { useForm, useFieldArray } from 'react-hook-form'

import { Button } from '@/cn/ui/button'
import { Separator } from '@/cn/ui/separator'
import { useToast } from '@/cn/ui/use-toast'

import { FormFieldReactInput } from '@forms/editor/react-form/FormFieldReactInput'
import { FormHeaderReact } from '@forms/editor/react-form/FormHeaderReact'

import { useFormReactContext } from '@/contexts/FormReactContext'

import { checkFormData } from '@/lib/validation'
import type { FieldType, Form } from '@/types'

export function FormEditorReact({ formId }: { formId?: string }) {
  const router = useRouter()
  const { addForm, updateForm, getFormById } = useFormReactContext()
  const { toast } = useToast()

  const defaultValues: Form = formId
    ? getFormById(formId) || {
        id: '',
        header: { title: '', description: '' },
        fields: []
      }
    : {
        id: '',
        header: { title: '', description: '' },
        fields: []
      }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<Form>({
    defaultValues
  })

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'fields'
  })

  const onSubmit = async (data: Form) => {
    const { IsValid, headerStatus, fieldStatus } = checkFormData(data)
    if (!IsValid) {
      if (!headerStatus) {
        toast({ title: 'Error', description: 'Form fields are not valid' })
      }
      if (!fieldStatus) {
        toast({ title: 'Error', description: 'Header title cannot be empty' })
      }
      toast({ title: 'Error', description: 'Form is not valid' })
      return
    }

    if (formId) {
      updateForm(data)
      router.push(`/forms/list`)
    } else {
      addForm(data)
      router.push(`/forms/list`)
    }
    toast({ title: 'Success', description: 'Form saved successfully' })
  }

  const addFieldHandler = useCallback(
    (type: FieldType) => {
      append({
        id: uuidv4(),
        type,
        label: '',
        value: '',
        options: type === 'select' ? [''] : undefined,
        required: false
      })
    },
    [append]
  )

  const updateField = useCallback(
    (index: number, data: string) => {
      update(index, { ...fields[index], label: data })
    },
    [fields, update]
  )

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid w-full items-start gap-6 rounded-lg border"
    >
      <FormHeaderReact control={control} />
      <Separator className="my-4" />

      {fields.map((field, index) => (
        <FormFieldReactInput
          key={field.id}
          field={field}
          onInputChange={(data) => updateField(index, data)}
          onDelete={() => remove(index)}
        />
      ))}

      <AddFieldButtons onAdd={addFieldHandler} />

      <div className="flex justify-center">
        <Button type="submit"> Save form </Button>
      </div>
    </form>
  )
}

function AddFieldButtons({ onAdd }: { onAdd: (type: FieldType) => void }) {
  return (
    <div className="flex justify-between p-6">
      {['text', 'number', 'textarea', 'checkbox', 'file', 'select'].map(
        (type) => (
          <Button key={type} onClick={() => onAdd(type as FieldType)}>
            Add {type}
          </Button>
        )
      )}
    </div>
  )
}
