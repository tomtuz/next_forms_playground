import React, { useCallback, useRef } from 'react';
import { useEventListener } from './useEventListener';

interface ClickInfo {
  refTarget: string;
  currentTarget: string;
  path: string[];
  timestamp: number;
  x: number;
  y: number;
  bubbles: boolean;
  cancelable: boolean;
  defaultPrevented: boolean;
  targetIdentifier: string;
  clickLocation: string;
}

/**
 * A custom hook for debugging click events and their propagation.
 * @param refTarget The refTarget element to attach the click listener to
 * @param callback Optional callback to handle the debug information
 * @param stopPropagation Whether to stop event propagation (default: false)
 * @param componentName A name to identify this debug instance
 * @returns A ref object containing the latest debug information
 */
export function useClickDebugger(
  refTarget: React.RefObject<HTMLElement>,
  callback?: (info: ClickInfo) => void, // or undefined
  componentName: string = 'Component'
) {
  const debugInfoRef = useRef<ClickInfo | null>(null);

  const handleClick = useCallback((event: MouseEvent) => {
    const path = event.composedPath().map((element) => getElementDescription(element as HTMLElement));

    const debugInfo: ClickInfo = {
      refTarget: getElementDescription(event.target as HTMLElement),
      currentTarget: getElementDescription(event.currentTarget as HTMLElement),
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
    };

    debugInfoRef.current = debugInfo;

    // custom data handler callback
    if (callback) {
      callback(debugInfo);
    } else {
      // default output
      console.log(`Click Debug Info (${componentName}):`);
      console.log(debugInfo);
    }

  }, [callback, componentName]);

  useEventListener('click', handleClick, refTarget.current);
  return debugInfoRef;
}

/**
 * Helper function to get a string description of an HTML element
 * @param element The HTML element to describe
 * @returns A string description of the element
 */
function getElementDescription(element: HTMLElement | EventTarget): string {
  if (element instanceof HTMLElement) {
    return `${element.tagName.toLowerCase()}${element.id ? `#${element.id}` : ''}${
      element.className ? `.${element.className.split(' ').join('.')}` : ''
    }`;
  }
  return String(element);
}

/**
 * Helper function to get a more concise identifier for an HTML element
 * @param element The HTML element to identify
 * @returns A string identifier of the element
 */
function getElementIdentifier(element: HTMLElement): string {
  if (!element) return 'Unknown';
  return element.id || element.getAttribute('data-testid') || element.className.split(' ')[0] || element.tagName.toLowerCase();
}
