'use client'

import { Button } from '@/cn/ui/button'
import Link from 'next/link'
import React, { useCallback, useRef, useState } from 'react'

import { v4 as uuidv4 } from 'uuid'

type InputRefCallback = (instance: HTMLInputElement | null) => void
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

  const updateForms = useCallback((formData: { [key: string]: string }) => {
    Object.entries(formData).forEach(([id, value]) => {
      if (formsRef.current[id]) {
        formsRef.current[id].inputValue = value
      }
    })
  }, [])

  const getForms = useCallback(() => Object.values(formsRef.current), [])

  return { addForm, updateForms, getForms }
}

function useRenderCount() {
  const count = useRef(-2)
  count.current += 1
  return count.current
}

export function TestEditorTwo() {
  const { addForm, updateForms, getForms } = useFormState()
  const [, forceUpdate] = useState({})
  const inputRefs = useRef<{ [key: string]: HTMLInputElement }>({})
  const renderCount = useRenderCount()
  console.log('RenderTwo count:', renderCount)

  const handleAddForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    addForm()
    forceUpdate({})
  }

  const doAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const formData: { [key: string]: string } = {}
    Object.entries(inputRefs.current).forEach(([id, inputElement]) => {
      formData[id] = inputElement.value
    })
    updateForms(formData)
    console.log('formData: ', getForms())
  }

  return (
    <form className="outline-gray-100 outline">
      <h1>TestPageTwo</h1>
      <div className="bg-pink-200 flex flex-col gap-2 p-2 outline outline-1">
        {getForms().map((form) => (
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
