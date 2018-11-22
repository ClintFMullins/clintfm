import React from 'react';
import { TimeWidget } from '../../features/time-widget/component';
import { PreviewCTA } from '../projects/components/cta/preview-component';
import { Showcase } from '../../features/showcase/component';
import './styles.css';

export function Play() {
  return (
    <div className="play">
      <div className="showcase-wrapper">
        <Showcase
          title="Time++"
          description="Starting now, and so on."
          link={`/projects/current-time`}
          hue={3}
        >
          <TimeWidget size={150} isRound={true} />
        </Showcase>
      </div>

      <div className="showcase-wrapper">
        <Showcase
          title="Call To Action"
          description="We want you to click this one."
          link={`/projects/cta`}
          hue={3}
        >
          <PreviewCTA />
        </Showcase>
      </div>
    </div>
  );
}
