import React, { useRef, useEffect, useState } from 'react';
import { initializeGrid, getColorAdjustedGrid, paintGrid } from './utils/grid';

export function Grid(props) {
  const canvas = useRef();
  const [color, setColor] = useState(0);
  const grid = useRef(initializeGrid(Math.ceil(props.height / props.squareSize), Math.ceil(props.width / props.squareSize)));
  const rowCount = Math.ceil(props.height / props.squareSize);
  const columnCount = Math.ceil(props.width / props.squareSize);

  useEffect(() => {
    grid.current = initializeGrid(rowCount, columnCount);
  }, [props.width, props.height]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newGrid = getColorAdjustedGrid(grid.current, props.velocity);
      const ctx = canvas.current.getContext('2d');
      paintGrid(ctx, newGrid, props.squareSize);

      grid.current = newGrid;
    }, 50);

    return () => {
      clearInterval(interval);
    }
  });

  const getColumnRow = (event) => ({
    columnIndex: Math.floor((event.nativeEvent.offsetX * columnCount) / props.width),
    rowIndex: Math.floor((event.nativeEvent.offsetY * rowCount) / props.height),
  });

  function onCanvasClick(event) {
    const { columnIndex, rowIndex } = getColumnRow(event);
  
    setColor(grid.current[columnIndex][rowIndex]);
  }

  function onCanvasHover(event) {
    const { columnIndex, rowIndex } = getColumnRow(event);

    grid.current[columnIndex][rowIndex] = color;
  }

  return ( 
    <div>
      <canvas
        ref={canvas}
        width={props.width}
        height={props.height}
        onClick={onCanvasClick}
        onMouseMove={onCanvasHover}
      />
    </div>
  );
}