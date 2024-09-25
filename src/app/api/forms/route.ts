import { NextResponse } from 'next/server'
import { formStorage } from '@/lib/FormStorage'

export async function POST(request: Request) {
  try {
    const formData = await request.json()
    formStorage.saveForm(formData)
    return NextResponse.json(
      { message: 'Form saved successfully' },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save form' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id) {
    const form = formStorage.getForm(id)
    if (form) {
      return NextResponse.json(form)
    }
    return NextResponse.json({ error: 'Form not found' }, { status: 404 })
  }
  const allForms = formStorage.getAllForms()
  return NextResponse.json(allForms)
}
