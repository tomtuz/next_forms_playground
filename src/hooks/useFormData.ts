'use client'

// Native
import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useFormContext } from '@/contexts/FormContext'
import { Form, FormField, FieldType } from '@/types';

const initialFormData: Form = {
  id: uuidv4(),
  header: {
    title: '',
    description: '',
  },
  fields: []
  // ^ id: string; type: FieldType; title: string; fieldData: string | number | boolean | File | null;
};

export function useFormData(formId?: string) {
  const { getForm } = useFormContext()

  // initial state
  const [formData, setFormData] = useState<Form>(() => {
    console.log("setting formId: ", formId)
    console.log("getForm Exists?: ", getForm)

    // get localStorage form data
    if (getForm && formId) {
      const formContextData = getForm(formId)

      console.log("formContextData", formContextData)
      return formContextData || initialFormData
    }

    return initialFormData
  })

  useEffect(() => {
    if (formId) {
      getForm(formId)
    }
  }, [getForm, formId]);

  // Mutations
  const addField = useCallback((type: FieldType) => {
    // 1. set header -> title, description
    // 2. set fields (multiple) -> data <FieldType>
    setFormData((prevData) => ({
      ...prevData,
      fields: [
        ...prevData.fields, // when editing
        { id: uuidv4(), type, label: "", value: null }
      ]
    }));
  }, []);

  // Events
  const handleFieldChange = useCallback((id: string, updates: Partial<FormField>) => {
    console.log("handleFieldChange")
    console.log('id: ', id)
    console.log('updates: ', updates)

    setFormData((prevData) => ({
      ...prevData,
      fields: prevData.fields.map((field) =>
        field.id === id && updates?.label ? { ...field, title: updates?.label } : field
      )
    }))
  }, [])

  const handleHeaderChange = useCallback(
    (key: 'title' | 'description', value: string) => {
      setFormData((prevData) => ({
        ...prevData,
        header: { ...prevData.header, [key]: value },
      }));
    },
    []
  );

  return {
    formData,
    setFormData,
    addField,
    handleFieldChange,
    handleHeaderChange
  };
}
