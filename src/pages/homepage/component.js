import React from 'react';
import { TimeWidget } from '../../features/time-widget/component';
import './style.css';

export function Homepage() {
  return (
    <div style={{ background: 'eggshell' }}>
      <div>
        <TimeWidget size={500} />
      </div>
    </div>
  );
}
