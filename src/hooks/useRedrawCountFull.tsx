import React, { useRef, useCallback, useEffect } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/cn/ui/tooltip'

interface RenderHistory {
  count: number
  timestamp: number
}

export function useRenderCountFull(componentName: string = 'Component') {
  const renderCount = useRef(0)
  const historyRef = useRef<RenderHistory[]>([])
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    renderCount.current += 1

    // Use setTimeout to update history after all synchronous updates
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      historyRef.current.push({
        count: renderCount.current,
        timestamp: Date.now()
      })
    }, 500)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  })

  const updateHistory = useCallback(() => {
    historyRef.current.push({
      count: renderCount.current,
      timestamp: Date.now()
    })
  }, [])

  const RenderCountVisualizer = useCallback(() => {
    const currentCount = renderCount.current
    const history = historyRef.current

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <span className="inline-flex space-x-1">
              {history.length > 0 && (
                <span className="w-[80px] bg-orange-200 text-sm font-bold outline outline-1 outline-red-300">
                  {history[history.length - 1].count}
                </span>
              )}
              <span className="w-[80px] bg-red-100 text-sm font-bold outline outline-1 outline-red-300">
                {currentCount}
              </span>
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{componentName}</p>
            <p>History: {history.map((h) => h.count).join(', ')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }, [componentName])

  return {
    renderCount: renderCount.current,
    updateHistory,
    RenderCountVisualizer
  }
}
