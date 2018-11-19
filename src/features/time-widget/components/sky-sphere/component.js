import React, { useState, useRef, useLayoutEffect } from 'react';
import './styles.css';

export function SkySphere(props) {
  const { setRef, width, height } = useSizeOfElement();

  const translateX = (props.percentX / 100) * width;
  const translateY = (props.percentY / 100) * height;

  const style = {
    width: `${props.size}px`,
    height: `${props.size}px`,
    transform: `translateX(${translateX}px) translateY(-${translateY}px)`,
    backgroundColor: props.isDay ? 'yellow' : 'white',
    display: width ? 'block' : 'none',
  }

  return (
    <div className="sky-sphere-center">
      <div className="sky-sphere-wrapper" ref={setRef}>
        <div className="sky-sphere" style={style} />
      </div>
    </div>
  );
}

function useSizeOfElement() {
  let wrapperRef = useRef();
  let width = useRef();
  let height = useRef();

  const [_, reRender ] = useState(0);

  const setWrapperRef = (ref) => {
    wrapperRef.current = ref;
  }

  useLayoutEffect(() => {
    if (wrapperRef.current) {
      width.current = wrapperRef.current.clientWidth;
      height.current = wrapperRef.current.clientHeight;
    } else {
      reRender();
    }
  });

  return {
    setRef: setWrapperRef,
    width: width.current,
    height: height.current,
  }
}
