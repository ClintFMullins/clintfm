import React, { useState } from 'react';
import { CurrentTime } from './components/current-time/component';
import { QuickTime } from './components/quick-time/component';

export function TimeWidget(props) {
  const [showCurrentTime, setShowCurrentTime] = useState(true);

  const width = props.size ? props.size : props.width;
  const height = props.size ? props.size : props.height;

  const childProps = {
    height,
    width,
    isRound: props.isRound,
  }

  return (
    <div
      onMouseEnter={() => setShowCurrentTime(false)}
      onMouseLeave={() => setShowCurrentTime(true)}
    >
      {showCurrentTime && !props.alwaysRun ? <CurrentTime {...childProps} /> : <QuickTime {...childProps} />}
    </div>
  )
}