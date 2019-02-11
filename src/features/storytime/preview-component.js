import React, { useState } from 'react';
import styled from 'styled-components';
import { useInterval } from '../../utils/render-interval';

const NUMBER_OF_BLOBS = 5;

const BlobsWrapper = styled.div`
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const GrowBlob = styled.div`
  position: absolute;
  width: 10%;
  height: 10%;
  top: 50%;
  left: 50%;
  transform: translate(-10px, -10px);
  background-color: hsl(${props => props.hue}, 60%, 70%);
  border-radius: 100%;
  transition: all 3s linear;

  ${props => props.growing && `
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transform: translate(0, 0);
  `}
`;

export function PreviewStoryTime() {
  const [growingIndex, setGrowingIndex] = useState(0);
  const [userIsHovering, setUserIsHovering] = useState(false);

  useInterval(() => {
    setGrowingIndex((prevIndex) => {
      let newIndex = prevIndex + 1;
      if (newIndex >= 3) {
        newIndex = 0;
      }

      return newIndex;
    })
  }, userIsHovering ? 1000 : null);

  let renderedBlobs = [];
  for (let i = 0; i < NUMBER_OF_BLOBS; i++) {
    const hue = 30 * i % 360;
    renderedBlobs.push(
      <GrowBlob growing={growingIndex === i} hue={hue} zIndex={NUMBER_OF_BLOBS - i}/>
    )
  }

  return (
    <BlobsWrapper
      onMouseEnter={() => setUserIsHovering(true)}
      onMouseLeave={() => setUserIsHovering(false)}
    >
      {renderedBlobs}
    </BlobsWrapper>
  );
}