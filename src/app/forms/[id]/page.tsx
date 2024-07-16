'use client'

// ROUTE TO PREVIEW FORM BEFORE SAVING
import { IFrame } from '@/components/layouts/IFrame'
import { useParams } from 'next/navigation'
import { FormEditor } from '@/components/forms/editor/vanilla/FormEditor'

export default function EditForm() {
  const params = useParams()
  const id = params.id as string
  console.log('url_params: ', params)
  console.log('loaded EditForm by id: ', id)

  return (
    // <IFrame>
    <FormEditor formId={id as string} />
    // </IFrame>
  )
}
