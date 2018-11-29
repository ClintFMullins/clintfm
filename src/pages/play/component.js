import React from 'react';
import { TimeWidget } from '../../features/time-widget/component';
import { PreviewCTA } from '../projects/components/cta/preview-component';
import { PreviewRhymes } from '../projects/components/rhymes/preview-component';
import { Showcase } from '../../features/showcase/component';
import { Grid } from '../../features/grid/component';
import { Creature } from '../../features/creature/component';
import { generateCreatureData } from '../../features/creature/utils/creature-generation';
import './styles.css';

export function Play() {
  return (
    <div className="play">
      <h1>Play</h1>
      <div className="play-projects">
        <div className="showcase-wrapper">
          <Showcase
            title="Now"
            description="See the future"
            link={`/play/current-time`}
            hue={3}
          >
            <TimeWidget size={150} isRound={true} />
          </Showcase>
        </div>

        <div className="showcase-wrapper">
          <Showcase
            title="CTA"
            description="Pls click it"
            link={`/play/cta`}
            hue={215}
          >
            <PreviewCTA />
          </Showcase>
        </div>

        <div className="showcase-wrapper">
          <Showcase
            title="Rhymes"
            description="Where hot bars are born"
            link={`/play/rhymes`}
            hue={124}
          >
            <PreviewRhymes />
          </Showcase>
        </div>

        <div className="showcase-wrapper">
          <Showcase
            title="Lava"
            description="Blaze a trail"
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

        <div className="showcase-wrapper">
          <Showcase
            title="Creature"
            description="Find your favorite"
            link={`/play/creature`}
            hue={75}
          >
            <div className="preview-wrapper">
              <Creature
                size={50}
                creatureData={generateCreatureData()}
              />
            </div>
          </Showcase>
        </div>
      </div>
    </div>
  );
}
