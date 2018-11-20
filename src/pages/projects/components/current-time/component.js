import React from 'react';
import { TimeWidget } from '../../../../features/time-widget/component';

export function CurrentTime() {
  return (
    <div>
      <TimeWidget
        width={window.innerWidth}
        height={window.innerHeight}
        isRound={false}
        alwaysRun={true}
      />
    </div>
  )
}