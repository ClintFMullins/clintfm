import React from 'react';
import { TimeWidget } from '../../features/time-widget/component';
import './style.css';

export function Homepage() {
  return (
    <div style={{ background: 'eggshell' }}>
      <TimeWidget size={10} />
      <TimeWidget size={50} />
      <TimeWidget size={100} />
      <TimeWidget size={200} />
      <TimeWidget size={500} />
    </div>
  );
}
