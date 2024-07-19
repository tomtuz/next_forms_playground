import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@radix-ui/react-tooltip'
import { useRef, useEffect } from 'react'

export function useRenderCount(): number {
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current += 1
  })

  return renderCount.current
}

export const renderCountElement = (
  count: number,
  name: string = 'GenericElement',
  shift: number = 1
) => (
  <div>
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>
          <span className="w-[80px] bg-red-100 text-sm font-bold outline outline-1 outline-red-300">
            {count}
          </span>
        </TooltipTrigger>
        <TooltipContent className="bg-white">
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
)
