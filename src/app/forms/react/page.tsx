import { ReactFormEditor } from '@/components/forms/editor/react/ReactFormEditor'
import { FormReactProvider } from '@/contexts/FormReactContext'

export default function NewForm() {
  return (
    <FormReactProvider>
      <ReactFormEditor />
    </FormReactProvider>
  )
}
