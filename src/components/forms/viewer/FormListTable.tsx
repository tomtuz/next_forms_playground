'use client'

import React from 'react'
import Link from 'next/link'
import { Form } from '@/types' // Adjust the import path as needed
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/cn/ui/table'
import { useFormContext } from '@/contexts/FormContext'

interface FormListTableProps {
  forms: Form[]
}
// React.FC<FormListTableProps> = ({ forms }) => (
export function FormListTable() {
  const { forms, deleteAllForms } = useFormContext()

  return (
    <Table>
      <TableCaption>A list of your forms</TableCaption>
      <TableCaption>
        <button type="button" onClick={() => deleteAllForms()}>
          DeleteAll
        </button>
      </TableCaption>
      <TableCaption>
        <Link href="/forms/new">New</Link>
      </TableCaption>
      <TableCaption>
        <Link href="/forms/newz">Newz</Link>
      </TableCaption>
      <TableCaption>
        <Link href="/test">TestPage</Link>
      </TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Fields Count</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {forms.map((form) => (
          <TableRow key={form.id}>
            <TableCell className="font-medium">
              <Link href={`/forms/${form.id}`}>{form.id.slice(0, 8)}...</Link>
            </TableCell>
            <TableCell>{form.header.title}</TableCell>
            <TableCell>{form.header.description}</TableCell>
            <TableCell className="text-right">{form.fields.length}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
