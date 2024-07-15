'use client'

import { Button } from '@/cn/ui/button'
import Link from 'next/link'
import React, { useRef, useCallback, useState, useMemo, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

type Form = {
  id: string
  title: string
  inputValue: string
  header: { title: string; description: string }
  fields: Array<string>
}

function useFormState() {
  const formsRef = useRef<{ [key: string]: Form }>({})

  const addForm = useCallback(() => {
    const id = uuidv4()
    formsRef.current[id] = {
      id,
      title: '',
      inputValue: '',
      header: { title: '', description: '' },
      fields: []
    }
    return id
  }, [])

  const getForms = useCallback(
    (ids: string[]) => ids.map((id) => formsRef.current[id]).filter(Boolean),
    []
  )

  const updateForms = useCallback((formData: { [key: string]: string }) => {
    Object.entries(formData).forEach(([id, value]) => {
      if (formsRef.current[id]) {
        formsRef.current[id].inputValue = value
      }
    })
  }, [])

  return { addForm, getForms, updateForms }
}

type InputRefCallback = (instance: HTMLInputElement | null) => void

function useRenderCount() {
  const count = useRef(0)
  count.current += 1
  return count.current
}

export function TestEditor() {
  const [formIds, setFormIds] = useState<string[]>([])
  const { addForm, getForms, updateForms } = useFormState()
  const inputRefs = useRef<{ [key: string]: HTMLInputElement }>({})
  const renderCount = useRenderCount()
  console.log('Render count:', renderCount)

  useEffect(() => {
    // Add initial forms
    setFormIds([addForm(), addForm()])
  }, [addForm])

  const handleAddForm = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setFormIds((prev) => [...prev, addForm()])
    },
    [addForm]
  )

  const forms = useMemo(() => getForms(formIds), [getForms, formIds])

  const doAction = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      const formData: { [key: string]: string } = {}
      Object.entries(inputRefs.current).forEach(([id, inputElement]) => {
        formData[id] = inputElement.value
      })
      updateForms(formData)
      console.log('formData: ', getForms(formIds))
    },
    [getForms, formIds, updateForms]
  )

  return (
    <form className="outline-gray-100 outline">
      <h1>TestPage</h1>
      <div className="bg-pink-200 flex flex-col gap-2 p-2 outline outline-1">
        {forms.map((form) => (
          <StateInputComp
            key={form.id}
            initialValue={form.inputValue}
            inputRef={(el) => {
              if (el) inputRefs.current[form.id] = el
              else delete inputRefs.current[form.id]
            }}
          />
        ))}
      </div>
      <div className="flex w-full items-center justify-between">
        <Button onClick={doAction}>Save</Button>
        <Button onClick={handleAddForm}>Add</Button>
      </div>
      <div className="flex items-center justify-between">
        <Link href="/forms/list">List</Link>
        <Link href="/forms/new">New</Link>
      </div>
    </form>
  )
}

function StateInputComp({
  initialValue,
  inputRef
}: {
  initialValue: string
  inputRef: InputRefCallback
}) {
  const [value, setValue] = useState(initialValue)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return <input value={value} onChange={handleChange} ref={inputRef} />
}
