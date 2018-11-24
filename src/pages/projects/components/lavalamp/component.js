import React from 'react';
import { useWindowSize } from '../../../../utils/dom';
import { Grid } from '../../../../features/grid/component';
import './styles.css';

export function Lavalamp() {
  const { width, height } = useWindowSize();

  const scaledWidth = Math.floor(width * 0.8);
  const scaledHeight = Math.floor(height * 0.6);

  return (
    <div className="lava-wrapper">
      <Grid
        width={scaledWidth}
        height={scaledHeight}
        velocity={8}
        squareSize={15}
      />
    </div>
  );
}