import React, { Profiler } from 'react'
import { TestEditor } from '@/components/forms/editor/TestEditor'
import { TestEditorTwo } from '@/components/forms/editor/TestEditorTwo'
import { TestEditorForm } from '@/components/forms/editor/TestEditorForm'

export default function TestForm() {
  return (
    <div className="flex w-full justify-center gap-4">
      {/* <Profiler id="MyComponent" onRender={callback}>
        <TestEditor />
      </Profiler>
      <Profiler id="MyComponent" onRender={callback}>
        <TestEditorTwo />
      </Profiler> */}
      <TestEditor />
      <TestEditorTwo />
      <TestEditorForm />
    </div>
  )
}
