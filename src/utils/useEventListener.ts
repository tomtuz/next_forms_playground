import { useCallback, useEffect, useRef } from "react";
type EventListenerTarget = HTMLElement | Window | Document;

/**
 * A custom hook for adding event listeners with proper cleanup and type safety.
 * This hook supports various event targets and event types.
 */
export function useEventListener<K extends keyof HTMLElementEventMap>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  refTarget: React.RefObject<EventListenerTarget> | EventListenerTarget | null = window,
  options?: boolean | AddEventListenerOptions
) {
  // Use useRef to store the latest handler function
  const savedHandler = useRef(handler);

  // Update ref.current value if handler changes
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  // Create a memoized callback that always calls the latest handler
  const eventListener = useCallback((event: HTMLElementEventMap[K]) => {
    if (savedHandler.current) {
      savedHandler.current(event);
    }
  }, []);

  useEffect(() => {
    const targetElement = refTarget && 'current' in refTarget ? refTarget.current : refTarget;

    if (!targetElement) {
      return;
    }

    // Create event listener that calls handler function stored in ref
    targetElement.addEventListener(eventName, eventListener as EventListener, options);

    // Remove event listener on cleanup
    return () => {
      targetElement.removeEventListener(eventName, eventListener as EventListener, options);
    };
  }, [eventName, refTarget, options, eventListener]);

}
