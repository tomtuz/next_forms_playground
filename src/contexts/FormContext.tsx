'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from 'react'
import { Form } from '@/types'
import { LS_FORM_DATA } from '@/constants'

interface FormContextType {
  forms: Form[]
  addForm: (form: Form) => string
  updateForm: (form: Form) => void
  getForm: (id: string) => Form | undefined
  deleteAllForms: () => void
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export function FormProvider({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const [forms, setForms] = useState<Form[]>([])

  useEffect(() => {
    const storedForms = localStorage.getItem(LS_FORM_DATA)
    if (!storedForms) return
    setForms(JSON.parse(storedForms))
  }, [])

  const getForm = useCallback(
    (id: string) => forms.find((form) => form.id === id),
    [forms]
  )

  const addForm = useCallback((formData: Form) => {
    console.log('saving form:')
    console.log(formData)
    setForms((prevForms) => {
      const updatedForms = [...prevForms, formData]
      localStorage.setItem(LS_FORM_DATA, JSON.stringify(updatedForms))
      return updatedForms
    })

    return formData.id
  }, [])

  const updateForm = useCallback((updatedForm: Form) => {
    setForms((prevForms) => {
      const newForms = prevForms.map((form) =>
        form.id === updatedForm.id ? updatedForm : form
      )
      console.log('Forms after updating:', newForms)
      return newForms
    })
  }, [])

  const deleteAllForms = useCallback(() => {
    console.log('deleting all Forms')
    setForms(() => {
      localStorage.setItem(LS_FORM_DATA, JSON.stringify([]))
      return []
    })
  }, [])

  const formContext = React.useMemo(
    () => ({
      forms,
      addForm,
      updateForm,
      getForm,
      deleteAllForms
    }),
    [forms, addForm, updateForm, getForm, deleteAllForms]
  )

  return (
    <FormContext.Provider value={formContext}>{children}</FormContext.Provider>
  )
}

export const useFormContext = () => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider')
  }
  return context
}
