import React from 'react';
import { TimeWidget } from '../../features/time-widget/component';
import { Showcase } from '../../features/showcase/component';
import './style.css';

export function Homepage() {
  return (
    <div style={{ background: 'eggshell', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
      <div style={{ marginBottom: '20px' }}>
        <Showcase link={`/projects/current-time`} hue={3}>
          
        </Showcase>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <Showcase link={`/projects/current-time`} hue={3}>
          <TimeWidget size={150} isRound={true} />
        </Showcase>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <Showcase link={`/projects/current-time`} hue={3}>
          
        </Showcase>
      </div>
    </div>
  );
}
