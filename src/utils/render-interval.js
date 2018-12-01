import { useState, useEffect } from 'react';

// TODO: Why does this set up the interval twice?
export function useRenderInterval(intervalMs, valueFunc, shouldSetValue = true) {
  const [value, setValue] = useState(valueFunc());

  useEffect(() => {
    if (!shouldSetValue) {
      return;
    }

    const interval = setInterval(() => {
      setValue(valueFunc());
    }, intervalMs);

    return () => {
      clearInterval(interval);
    }
  }, [shouldSetValue]);

  return value;
}