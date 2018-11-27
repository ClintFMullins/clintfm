import React from 'react';
import { TimeWidget } from '../../features/time-widget/component';
import { PreviewCTA } from '../projects/components/cta/preview-component';
import { PreviewRhymes } from '../projects/components/rhymes/preview-component';
import { Showcase } from '../../features/showcase/component';
import { Grid } from '../../features/grid/component';
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
            link={`/play/current-time`}
            hue={3}
          >
            <TimeWidget size={150} isRound={true} />
          </Showcase>
        </div>

        <div className="showcase-wrapper">
          <Showcase
            title="CTA"
            description="We want you to click this one."
            link={`/play/cta`}
            hue={215}
          >
            <PreviewCTA />
          </Showcase>
        </div>

        <div className="showcase-wrapper">
          <Showcase
            title="Rhymes"
            description="We've got hot bars for ya"
            link={`/play/rhymes`}
            hue={124}
          >
            <PreviewRhymes />
          </Showcase>
        </div>

        <div className="showcase-wrapper">
          <Showcase
            title="Lava"
            description="Move your mouse with the color"
            link={`/play/lava`}
            hue={60}
          >
            <div className="preview-wrapper">
              <Grid
                width={150}
                height={150}
                velocity={2}
                squareSize={15}
              />
            </div>
          </Showcase>
        </div>
      </div>
    </div>
  );
}
