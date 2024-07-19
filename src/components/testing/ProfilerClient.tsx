'use client'

import React, { Profiler } from 'react'
import { TestFormRefs } from '@/components/forms/editor/test/TestFormRefs'
import { TestFormDataApi } from '@/components/forms/editor/test/TestFormDataApi'
import { TestFormReact } from '@/components/forms/editor/test/TestFormReact'
import { TestWatch } from '@/components/forms/editor/test/TestWatch'
import {
  onRenderCallback,
  ProfilerWrapper
} from '@/components/testing/Profiler'

export function ProfilerClient() {
  return (
    <div className="flex w-full justify-center gap-4">
      <ProfilerWrapper>
        <TestFormRefs />
        <TestFormDataApi />
        <TestFormReact />
        <TestWatch />
      </ProfilerWrapper>

      {/* Consider checkign for side-effects caused by mapping -> compare to vanilla wrap */}
      {/* <Profiler id="Test" onRender={onRenderCallback}>
        <TestFormRefs />
      </Profiler> */}
    </div>
  )
}
