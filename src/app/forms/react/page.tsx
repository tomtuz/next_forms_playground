import { ReactFormEditor } from '@/components/forms/editor/react/ReactFormEditor'
import { FormReactProvider } from '@/contexts/FormReactContext'

export default function NewForm() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-6 text-3xl font-bold">Simple Input Test</h1>
      <FormReactProvider>
        <ReactFormEditor />
      </FormReactProvider>
    </div>
  )
}
