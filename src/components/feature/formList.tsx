'use client'

// Native
import { useEffect } from 'react'
import Link from 'next/link'

import { useFormContext } from '@/contexts/FormContext'

export function FormList() {
  const { forms } = useFormContext()

  useEffect(() => {
    console.log('forms within list: ', forms)
  }, [forms])

  return (
    <div>
      <h2>Saved Forms</h2>
      <ul>
        {forms.map((form) => (
          <li key={form.id}>
            <Link href={`/form/${form.id}`}>
              <p>{form.header.title || 'Untitled Form'}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/form/new">
        <p>Create New Form</p>
      </Link>
    </div>
  )
}
