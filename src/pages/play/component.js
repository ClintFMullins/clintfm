import React from 'react';
import { TimeWidget } from '../../features/time-widget/component';
import { Showcase } from '../../features/showcase/component';
import './styles.css';

export function Play() {
  return (
    <div className="play">
      <div className="showcase-wrapper">
        <Showcase hue={200} />
      </div>
      <div className="showcase-wrapper">
        <Showcase link={`/projects/current-time`} hue={3}>
          <TimeWidget size={150} isRound={true} />
        </Showcase>
      </div>
      <div className="showcase-wrapper">
        <Showcase hue={200} />
      </div>
    </div>
  );
}
