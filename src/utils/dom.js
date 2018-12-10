import { useRef, useState, useLayoutEffect } from 'react';

// Doesn't seem to work :thinking:
export function useDomDimensions() {
  const ref = useRef(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);

  function updateContainerSize() {
    setWidth(ref.current && ref.current.clientWidth);
    setHeight(ref.current && ref.current.clientHeight);
  }

  useLayoutEffect(() => {
    updateContainerSize();
  })

  useLayoutEffect(() => {
    ref.current.addEventListener('resize', updateContainerSize);

    return () => {
      ref.current.removeEventListener('resize', updateContainerSize)
    }
  });

  return { ref, width, height };
}

export function useWindowSize() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  function updateWindowSize() {
    if (width !== window.innerWidth) {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
  }

  useLayoutEffect(() => {
    window.addEventListener('resize', updateWindowSize);

    return () => {
      window.removeEventListener('resize', updateWindowSize)
    }
  });

  return { width, height };
}