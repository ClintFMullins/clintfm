import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import './styles.css';

export function SkySphere(props) {
  const { width, height, ref } = useDomDimensions();

  const translateX = (props.percentX / 100) * width;
  const translateY = (props.percentY / 100) * height;

  const size = props.isDay ? props.size : props.size / 2; 

  const style = {
    width: `${size}px`,
    height: `${size}px`,
    transform: `translateX(${translateX}px) translateY(-${translateY}px)`,
    backgroundColor: props.isDay ? 'yellow' : 'white',
  }

  return (
    <div className="sky-sphere-center">
      <div className="sky-sphere-wrapper" ref={ref}>
        <div className={`sky-sphere ${props.sunshine ? 'sky-sphere-hue' : ''}`} style={style} />
      </div>
    </div>
  );
}

function useDomDimensions(initialWidthHeight) {
  const ref = useRef(null);
  const [width, setWidth] = useState(initialWidthHeight);
  const [height, setHeight] = useState(initialWidthHeight);

  useLayoutEffect(() => {
    setWidth(ref.current && ref.current.clientWidth);
    setHeight(ref.current && ref.current.clientHeight);
  }, [ref.current]);

  return { ref, width, height };
}
