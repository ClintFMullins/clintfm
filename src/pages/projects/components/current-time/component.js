import React, { useState, useEffect } from 'react';
import { TimeWidget } from '../../../../features/time-widget/component';
import { useWindowSize } from '../../../../utils/dom';

export function CurrentTime() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <TimeWidget
        width={width}
        height={height}
        isRound={false}
        alwaysRun={true}
      />
    </div>
  )
}