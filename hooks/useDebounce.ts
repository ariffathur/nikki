import { useEffect, useState } from "react";

/**
 * A custom hook that debounces a value, delaying updates until after a specified delay has passed.
 * Useful for search inputs, API calls, and other scenarios where you want to wait for user input to settle.
 *
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds (default: 300ms)
 * @returns The debounced value
 *
 * @example
 * const [searchTerm, setSearchTerm] = useState("");
 * const debouncedSearchTerm = useDebounce(searchTerm, 300);
 *
 * useEffect(() => {
 *   // This will only run 300ms after searchTerm stops changing
 *   if (debouncedSearchTerm) {
 *     performSearch(debouncedSearchTerm);
 *   }
 * }, [debouncedSearchTerm]);
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up timer to update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up timer if value changes before delay expires
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
