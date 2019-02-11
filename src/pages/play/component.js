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
import { useWindowSize } from '../../utils/dom';
import { PreviewPrompt } from '../../features/ps1/preview-component';
import { PreviewStoryTime } from '../../features/storytime/preview-component';

const SHOWCASE_DATA = [
  {
    link: `/play/current-time`,
    preview: (size) => <TimeWidget size={size} isRound={true} />,
    title: 'now',
  },
  {
    link: `/play/cta`,
    preview: () => <PreviewCTA />,
    title: 'click',
  },
  {
    link: `/play/rhymes`,
    preview: () => <PreviewRhymes />,
    title: 'rhymes',
  },
  {
    link: `/play/lava`,
    preview: (size) => (
      <div className="preview-wrapper">
        <Grid
          width={size}
          height={size}
          velocity={2}
          squareSize={size / 5}
        />
      </div>
    ),
    title: 'lava',
  },
  {
    link: `/play/creatures`,
    preview: (size) => (
      <div className="preview-wrapper">
        <CreaturePreview size={size / 4}/>
      </div>
    ),
    title: 'creatures',
  },
  {
    link: `/play/sequence`,
    preview: () => (
      <PreviewSequence />
    ),
    title: 'sequence',
  },
  {
    link: `/play/prompt`,
    preview: () => <PreviewPrompt />,
    title: 'prompt',
  },
  {
    link: `/play/story`,
    preview: () => <PreviewStoryTime />,
    title: 'story',
  },
];

export function Play() {
  const { width, height } = useWindowSize();

  const size = Math.min(width / 4, height / 3);

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
                size={size}
              >
                {data.preview(size)}
              </Showcase>
            </div>
          )
        })}
      </div>
    </div>
  );
}
