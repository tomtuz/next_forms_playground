import React, { Profiler } from 'react'
import { TestFormReact } from '@/components/forms/editor/test/TestFormReact'
import { TestFormReactDev } from '@/components/forms/editor/test/TestFormReactDev'
import { TestFormRefs } from '@/components/forms/editor/test/TestFormRefs'
import { TestFormDataApi } from '@/components/forms/editor/test/TestFormDataApi'

export default function TestForm() {
  const callback = (id: string, phase: string, actualDuration: number) => {
    console.log(
      'id: ',
      id,
      'phase: ',
      phase,
      'actualDuration: ',
      actualDuration
    )
  }

  return (
    <div className="flex w-full justify-center gap-4">
      {/* <Profiler id="MyComponent" onRender={callback}>
        <TestFormRefs />
      </Profiler>
      <Profiler id="MyComponent" onRender={callback}>
        <TestFormDataApi />
      </Profiler>
      <Profiler id="MyComponent" onRender={callback}>
        <TestFormReact />
      </Profiler> */}

      <TestFormRefs />
      <TestFormDataApi />
      <TestFormReact />
      <TestFormReactDev />
    </div>
  )
}
