import { useState, useEffect } from 'react';

// TODO: Why does this set up the interval twice?
export function useRenderInterval(intervalMs, valueFunc) {
  const [value, setValue] = useState(valueFunc());

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(valueFunc());
    }, intervalMs);

    return () => {
      clearInterval(interval);
    }
  }, []);

  return value;
}