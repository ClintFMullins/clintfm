import React from 'react';
import { TimeWidget } from '../../features/time-widget/component';
import { PreviewCTA } from '../projects/components/cta/preview-component';
import { PreviewRhymes } from '../projects/components/rhymes/preview-component';
import { Showcase } from '../../features/showcase/component';
import { Grid } from '../../features/grid/component';
import { Creature } from '../../features/creature/component';
import { randomInRange } from '../../features/creature/utils/random';
import { generateCreatureData } from '../../features/creature/utils/creature-generation';
import './styles.css';

const SHOWCASE_DATA = [
  {
    link: `/play/current-time`,
    preview: <TimeWidget size={150} isRound={true} />,
  },
  {
    link: `/play/cta`,
    preview: <PreviewCTA />,
  },
  {
    link: `/play/rhymes`,
    preview: <PreviewRhymes />,
  },
  {
    link: `/play/lava`,
    preview: (
      <div className="preview-wrapper">
        <Grid
          width={150}
          height={150}
          velocity={2}
          squareSize={15}
        />
      </div>
    ),
  },
  {
    link: `/play/creature`,
    preview: (
      <div className="preview-wrapper">
        <Creature
          size={50}
          creatureData={generateCreatureData()}
        />
      </div>
    ),
  },
];

export function Play() {
  return (
    <div className="play">
      <h1>Play</h1>
      <div className="play-projects">
        {SHOWCASE_DATA.map((data) => {
          return (
            <div className="showcase-wrapper">
              <Showcase
                link={data.link}
                hue={randomInRange(0, 360)}
              >
                {data.preview}
              </Showcase>
            </div>
          )
        })}
        <ProjectUnderConstruction />
      </div>
    </div>
  );
}

export function ProjectUnderConstruction() {
  return (
    <div className="showcase-wrapper">
      <div className="not-real-project">
        <div className="not-real-project">
          <div className="not-real-project">
            <div className="not-real-project-inner">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
