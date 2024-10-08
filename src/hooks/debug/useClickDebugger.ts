import { useCallback, useEffect, useRef, useState } from 'react'
import { useEventListener } from './useEventListener'

interface ClickInfo {
  target: string
  currentTarget: string
  path: string[]
  timestamp: number
  x: number
  y: number
  bubbles: boolean
  cancelable: boolean
  defaultPrevented: boolean
  targetIdentifier: string
  clickLocation: string
}

// Helper function to get a string description of an HTML element
function getElementDescription(
  element: HTMLElement | EventTarget | null
): string {
  if (element instanceof HTMLElement) {
    return `${element.tagName.toLowerCase()}${element.id ? `#${element.id}` : ''}${
      element.className ? `.${element.className.split(' ').join('.')}` : ''
    }`
  }
  return String(element)
}

// Helper function to get a more concise identifier for an HTML element
function getElementIdentifier(element: HTMLElement): string {
  if (!element) return 'Unknown'
  return (
    element.id ||
    element.getAttribute('data-testid') ||
    element.className.split(' ')[0] ||
    element.tagName.toLowerCase()
  )
}

// A custom hook for debugging click events and their propagation.
export function useClickDebugger(
  callback?: (info: ClickInfo) => void, // or undefined
  componentName: string = 'Component'
) {
  const debugInfoRef = useRef<ClickInfo | null>(null)
  const [element, setElement] = useState<HTMLElement | null>(null)

  // collect data
  const handleClick = useCallback(
    (event: MouseEvent) => {
      const path = event
        .composedPath()
        .map((element) => getElementDescription(element as HTMLElement))

      const debugInfo: ClickInfo = {
        target: getElementDescription(event.target as HTMLElement),
        currentTarget: getElementDescription(
          event.currentTarget as HTMLElement
        ),
        path: path,
        timestamp: event.timeStamp,
        x: event.x,
        y: event.y,
        // Whether the event bubbles up through the DOM or not
        bubbles: event.bubbles,
        // Whether the event is cancelable
        cancelable: event.cancelable,
        // Whether the default action of the event has been prevented
        defaultPrevented: event.defaultPrevented,
        // components with attribute i.e.: data-testid="landing-card"
        targetIdentifier: getElementIdentifier(event.target as HTMLElement),
        clickLocation: componentName
      }

      debugInfoRef.current = debugInfo

      // custom data handler callback
      if (callback) {
        callback(debugInfo)
      } else {
        // default output
        console.log(`Click Debug Info (${componentName}):`)
        console.log(debugInfo)
      }
    },
    [callback, componentName]
  )

  // register 'click' event
  useEventListener('click', handleClick, () => element, { capture: true })

  // cleanup
  useEffect(() => {
    return () => {
      if (element) {
        element.removeEventListener('click', handleClick, { capture: true })
      }
    }
  }, [element, handleClick])

  const ref = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      setElement(node)
    }
  }, [])

  return [ref, debugInfoRef] as const
}
