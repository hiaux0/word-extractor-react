import { useEffect, useRef, useCallback } from "react";

export function useDebouncedCallback<A extends any[]>(
  callback: (...args: A) => void,
  deps: React.DependencyList = [], // Optional deps array
  wait: number = 200,
) {
  // Track args & timeout handle between calls
  const argsRef = useRef<A>();
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  // Cleanup function to clear the timeout
  function cleanup() {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }

  // Make sure our timeout gets cleared when the component unmounts
  useEffect(() => cleanup, []);

  // Wrap the debounced function in `useCallback` so it doesn't get re-created
  // on every render unless its dependencies change
  const debouncedCallback = useCallback(
    (...args: A) => {
      // Capture the latest args
      argsRef.current = args;

      // Clear debounce timer
      cleanup();

      // Start waiting again
      timeout.current = setTimeout(() => {
        if (argsRef.current) {
          callback(...argsRef.current);
        }
      }, wait);
    },
    [callback, wait, ...deps], // Include custom deps
  );

  return debouncedCallback;
}
