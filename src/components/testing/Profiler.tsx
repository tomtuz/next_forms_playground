'use client'

import React, { Profiler, ReactElement, ReactNode } from 'react'

interface ProfilerWrapperProps {
  onRender?: (
    id: string,
    phase: 'mount' | 'update' | 'nested-update',
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number
  ) => void
  children: ReactNode
}

// wrap components with <Profile /> tags
export function ProfilerWrapper({
  onRender = onRenderCallback,
  children
}: ProfilerWrapperProps) {
  const wrapWithProfiler = (child: ReactElement) => {
    let id = 'Unknown'
    const childType = child.type as React.ComponentType
    // console.log('typeof childType: ', typeof childType)
    // console.log('childType: ', childType)

    if (childType) {
      id = childType.displayName || childType.name || 'Unknown'
      console.log('child pass id: ', id)
    }

    return React.createElement(Profiler, { id, onRender }, child)
  }

  return (
    <>
      {React.Children.map(children, (child) =>
        // dont want valid check as it will double load
        // React.isValidElement(child) ? wrapWithProfiler(child) : child
        // @ts-ignore
        wrapWithProfiler(child)
      )}
    </>
  )
}

export function onRenderCallback(
  id: string,
  phase: 'mount' | 'update' | 'nested-update',
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number
) {
  console.log(`Profiler ID: ${id}`)
  console.log(`Phase: ${phase}`)
  console.log(`Actual Duration: ${actualDuration}`)
  console.log(`Base Duration: ${baseDuration}`)
  console.log(`Start Time: ${startTime}`)
  console.log(`Commit Time: ${commitTime}`)
}
