import React from 'react';
import { TimeWidget } from '../../features/time-widget/component';
import { PreviewCTA } from '../projects/components/cta/preview-component';
import { PreviewRhymes } from '../projects/components/rhymes/preview-component';
import { Showcase } from '../../features/showcase/component';
import './styles.css';

export function Play() {
  return (
    <div className="play">
      <h1>Play</h1>
      <div className="play-projects">
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
            title="CTA"
            description="We want you to click this one."
            link={`/projects/cta`}
            hue={215}
          >
            <PreviewCTA />
          </Showcase>
        </div>

        <div className="showcase-wrapper">
          <Showcase
            title="Rhymes"
            description="We've got hot bars for ya"
            link={`/projects/rhymes`}
            hue={124}
          >
            <PreviewRhymes />
          </Showcase>
        </div>
      </div>
    </div>
  );
}
