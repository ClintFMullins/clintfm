import { useRef, useState, useLayoutEffect } from 'react';

export function useDomDimensions(initialWidthHeight) {
  const ref = useRef(null);
  const [width, setWidth] = useState(initialWidthHeight);
  const [height, setHeight] = useState(initialWidthHeight);

  useLayoutEffect(() => {
    setWidth(ref.current && ref.current.clientWidth);
    setHeight(ref.current && ref.current.clientHeight);
  }, [ref.current]);

  return { ref, width, height };
}