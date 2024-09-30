import { useEffect, useRef } from 'react'

type EventListenerTarget = HTMLElement | Window | Document

/**
 * A custom hook for adding event listeners with proper cleanup and type safety.
 * This hook supports various event targets and event types.
 */
export function useEventListener<K extends keyof HTMLElementEventMap>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  refTarget: () => EventListenerTarget | null,
  options?: boolean | AddEventListenerOptions
) {
  // Use useRef to store the latest handler function
  const savedHandler = useRef(handler)

  // Update ref.current value if handler changes
  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  // Create a memoized callback that always calls the latest handler
  useEffect(() => {
    const targetElement = refTarget()
    if (!targetElement?.addEventListener) return

    const eventListener = (event: Event) =>
      savedHandler.current(event as HTMLElementEventMap[K])

    // Create event listener that calls handler function stored in ref
    targetElement.addEventListener(eventName, eventListener, options)

    // Remove event listener on cleanup
    return () => {
      targetElement.removeEventListener(eventName, eventListener, options)
    }
  }, [eventName, refTarget, options])
}
