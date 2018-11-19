import { useState, useEffect } from 'react';

export function renderInterval(intervalMs, valueFunc) {
  const [value, setValue] = useState(valueFunc());

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(valueFunc);
    }, intervalMs);

    return () => {
      clearInterval(interval);
    }
  }, []);

  return value;
}