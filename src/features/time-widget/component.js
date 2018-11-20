import React, { useState } from 'react';
import { CurrentTime } from './components/current-time/component';
import { QuickTime } from './components/quick-time/component';

export function TimeWidget(props) {
  const [showCurrentTime, setShowCurrentTime] = useState(true);

  return (
    <div
      onMouseEnter={() => setShowCurrentTime(false)}
      onMouseLeave={() => setShowCurrentTime(true)}
    >
      {showCurrentTime ? <CurrentTime size={props.size} /> : <QuickTime size={props.size} />}
    </div>
  )
}