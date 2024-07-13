'use client'

import { IFrame } from '@/components/layouts/IFrame'
import { FormEditor } from '@/views/FormEditor'
import { useParams } from 'next/navigation'

export default function EditForm() {
  const params = useParams()
  const id = params.id as string
  console.log('url_params: ', params)
  console.log('loaded EditForm by id: ', id)

  return (
    <IFrame>
      <FormEditor formId={id as string} />
    </IFrame>
  )
}
