'use client'

interface RenderInfo {
  count: number
  timestamp: number
  phase: 'render' | 'layout' | 'effect'
}
import { useCallback, useLayoutEffect, useRef, useState } from 'react'

export function useHonestRenderCount(componentName: string, debug: boolean) {
  const renderCount = useRef(0)
  const history = useRef<RenderInfo[]>([])
  const [, setUpdateFlag] = useState(false)

  // Render phase
  renderCount.current += 1
  const currentCount = renderCount.current
  history.current.push({
    count: currentCount,
    timestamp: Date.now(),
    phase: 'render'
  })

  if (debug) console.log(`${componentName} render: ${currentCount}`)

  // Layout effect phase
  useLayoutEffect(() => {
    history.current.push({
      count: currentCount,
      timestamp: Date.now(),
      phase: 'layout'
    })
    if (debug) console.log(`${componentName} layout effect: ${currentCount}`)
  })

  // Effect phase
  useLayoutEffect(() => {
    history.current.push({
      count: currentCount,
      timestamp: Date.now(),
      phase: 'effect'
    })
    if (debug) console.log(`${componentName} effect: ${currentCount}`)
  })

  const updateVisualizer = useCallback(() => {
    setUpdateFlag((prev) => !prev)
  }, [])

  const RenderCountVisualizer = () => (
    <div className="inline-flex items-center space-x-2 text-sm">
      <span className="font-bold">{componentName}:</span>
      <span className="rounded bg-blue-100 px-2 py-1">
        Renders: {currentCount}
      </span>
      <span className="rounded bg-green-100 px-2 py-1">
        History:{' '}
        {history.current.map((h) => `${h.count}(${h.phase[0]})`).join(', ')}
      </span>
    </div>
  )

  return {
    renderCount: currentCount,
    history: history.current,
    RenderCountVisualizer,
    updateVisualizer
  }
}
