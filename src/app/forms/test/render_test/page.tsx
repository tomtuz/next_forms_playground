import React from 'react'
import { RenderCountTestComponent } from '@/components/forms/editor/test/RenderCount/RenderCountTest'
export default function TestForm() {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="mb-4 text-2xl font-bold">Render Count Test Page</h1>
      <RenderCountTestComponent />
    </div>
  )
}
