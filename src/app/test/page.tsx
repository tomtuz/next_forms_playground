import React, { Profiler } from 'react'
import { TestFormReact } from '@/components/forms/editor/test/TestFormReact'
import { TestFormRefs } from '@/components/forms/editor/test/TestFormRefs'
import { TestFormDataApi } from '@/components/forms/editor/test/TestFormDataApi'
import { TestWatch } from '@/components/forms/editor/test/TestWatch'
import { ProfilerClient } from '@/components/testing/ProfilerClient'

export default function TestComponents() {
  return (
    <div className="flex w-full justify-center gap-4">
      <TestFormRefs />
      <TestFormDataApi />
      <TestFormReact />
      <TestWatch />
      {/* <ProfilerClient /> */}
    </div>
  )
}
