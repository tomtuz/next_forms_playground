import React, { Profiler } from 'react'
import { TestFormReact } from '@/components/forms/editor/TestFormReact'
import { TestFormRefs } from '@/components/forms/editor/TestFormRefs'
import { TestFormDataApi } from '@/components/forms/editor/TestFormDataApi'

export default function TestForm() {
  return (
    <div className="flex w-full justify-center gap-4">
      {/* <Profiler id="MyComponent" onRender={callback}>
        <TestEditor />
      </Profiler>
      <Profiler id="MyComponent" onRender={callback}>
        <TestEditorTwo />
      </Profiler> */}
      <TestFormRefs />
      <TestFormDataApi />
      <TestFormReact />
    </div>
  )
}
