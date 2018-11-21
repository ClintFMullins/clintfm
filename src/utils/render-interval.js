import { useState, useEffect } from 'react';

export function useRenderInterval(intervalMs, valueFunc) {
  const [value, setValue] = useState(valueFunc());

  useEffect(() => {
    const interval = setTimeout(() => {
      setValue(valueFunc);
    }, intervalMs);

    return () => {
      clearTimeout(interval);
    }
  }, []);

  return value;
}