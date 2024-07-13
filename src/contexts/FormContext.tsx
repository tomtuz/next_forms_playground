'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Form } from '@/types'

interface FormContextType {
  forms: Form[]
  addForm: (form: Form) => string
  updateForm: (form: Form) => void
  getForm: (id: string) => Form | undefined
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export function FormProvider({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const [forms, setForms] = useState<Form[]>([])

  useEffect(() => {
    const storedForms = localStorage.getItem('forms')
    if (storedForms) {
      setForms(JSON.parse(storedForms))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('forms', JSON.stringify(forms))
  }, [forms])

  const getForm = useCallback(
    (id: string) => forms.find((form) => form.id === id),
    [forms]
  )

  const addForm = useCallback((form: Form) => {
    const newForm = { ...form, id: form.id || uuidv4() }
    setForms((prevForms) => {
      const updatedForms = [...prevForms, newForm]
      console.log('Forms after adding:', updatedForms)
      return updatedForms
    })
    return newForm.id
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

  const formContext = React.useMemo(
    () => ({
      forms,
      addForm,
      updateForm,
      getForm
    }),
    [forms, addForm, updateForm, getForm]
  )

  return (
    <FormContext.Provider value={formContext}>{children}</FormContext.Provider>
  )
}

export const useFormContext = () => {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider')
  }
  return context
}
