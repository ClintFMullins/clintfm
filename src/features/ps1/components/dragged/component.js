import React, { useState, useEffect } from 'react';
import { GrabbedItem } from '../../styles';
import { ACTION_SET_SEGMENT_DRAGGING_INDEX, ACTION_MOVE } from '../../reducer';

// Hack - corresponds to the draggable symbol
const HEIGHT = 85;
const WIDTH = 78;

export function Dragged({ dispatch, children, setIsDragging, computedPositions, fromIndex, reportClosestIndex }) {
  const [points, setPoints] = useState({ top: 0, left: 0 });
  const [isMouseDown, setMouseDown] = useState(false);
  const [closestIndex, setClosestIndex] = useState(null);

  function mouseMoveHandler(event) {
    if (isMouseDown) {
      const mouseX = event.clientX - WIDTH;
      const mouseY = event.clientY - WIDTH;
      setPoints({ top: mouseY, left: mouseX });

      if (computedPositions) {
        let newClosestIndex = null;
        let minDistance = Infinity;
        computedPositions.forEach((position, index) => {
          const xDistance = Math.abs(mouseX - position.left);
          const yDistance = Math.abs(mouseY - position.top);
          const totalDistance = xDistance + yDistance;
        
          if (totalDistance < minDistance) {
            newClosestIndex = index;
            minDistance = totalDistance;
          }
        });
  
        if (closestIndex !== newClosestIndex) {
          setClosestIndex(newClosestIndex)
          reportClosestIndex(newClosestIndex)
        }
      }
    }
  }

  function mouseDownHandler(event) {
    setIsDragging(true);
    setPoints({ top: event.clientY - HEIGHT, left: event.clientX - WIDTH });
    setMouseDown(true);
  }

  function mouseUpHandler() {
    console.log('yeah?')
    if (fromIndex === null || closestIndex === null) {
      return;
    }
    console.log('yeah. fuck you')

    dispatch({ type: ACTION_SET_SEGMENT_DRAGGING_INDEX, index: null })
    dispatch({ type: ACTION_MOVE, fromIndex, toIndex: closestIndex })
    reportClosestIndex(null);
    setIsDragging(false);
    setMouseDown(false);
  }

  useEffect(() => {
    document.addEventListener('mouseup', mouseUpHandler);

    return () => {
      document.removeEventListener('mouseup', mouseUpHandler);
    }
  }, [fromIndex, closestIndex]);

  useEffect(() => {
    document.addEventListener('mousemove', mouseMoveHandler);

    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
    }
  });

  useEffect(() => {
    document.addEventListener('mousedown', mouseDownHandler);

    return () => {
      document.removeEventListener('mousedown', mouseDownHandler);
    }
  }, []);

  if (!children) {
    return null;
  }

  return (
    <GrabbedItem style={points}>
      {children}
    </GrabbedItem>
  );
};