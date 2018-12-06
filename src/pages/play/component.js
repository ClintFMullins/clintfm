import React from 'react';
import { TimeWidget } from '../../features/time-widget/component';
import { PreviewCTA } from '../projects/components/cta/preview-component';
import { PreviewRhymes } from '../projects/components/rhymes/preview-component';
import { Showcase } from '../../features/showcase/component';
import { Grid } from '../../features/grid/component';
import { randomInRange } from '../../features/creature/utils/random';
import './styles.css';
import { CreaturePreview } from '../../features/creature/preview-component';
import { PreviewSequence } from '../projects/components/music/preview-component';

const SHOWCASE_DATA = [
  {
    link: `/play/current-time`,
    preview: <TimeWidget size={150} isRound={true} />,
    title: 'now',
  },
  {
    link: `/play/cta`,
    preview: <PreviewCTA />,
    title: 'click',
  },
  {
    link: `/play/rhymes`,
    preview: <PreviewRhymes />,
    title: 'rhymes',
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
    title: 'lava',
  },
  {
    link: `/play/creatures`,
    preview: (
      <div className="preview-wrapper">
        <CreaturePreview />
      </div>
    ),
    title: 'creatures',
  },
  {
    link: `/play/sequence`,
    preview: (
      <PreviewSequence />
    ),
    title: 'sequence',
  },
];

export function Play() {
  return (
    <div className="play">
      <div className="play-projects">
        {SHOWCASE_DATA.map((data) => {
          return (
            <div key={data.title} className="showcase-wrapper">
              <Showcase
                link={data.link}
                hue={randomInRange(0, 360)}
                title={data.title}
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
