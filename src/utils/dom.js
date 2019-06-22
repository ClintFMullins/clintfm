import { useRef, useState, useEffect, useLayoutEffect } from "react";

export function useFocusOnLoad({ select } = {}) {
  const ref = useRef();
  const hasSelected = useRef(false);

  function refFocus() {
    if (ref && ref.current && ref.current.focus) {
      ref.current.focus();
      if (select && !hasSelected.current) {
        hasSelected.current = true;
        ref.current.select();
      }
    }
  }

  useEffect(refFocus);

  return { ref, refFocus };
}

export function useWindowSize() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  function updateWindowSize() {
    if (width !== window.innerWidth || height !== window.innerHeight) {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
  }

  useLayoutEffect(() => {
    window.addEventListener("resize", updateWindowSize);

    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  });

  return { width, height };
}
