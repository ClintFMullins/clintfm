import React, { useState } from 'react';
import { useRenderInterval } from '../../utils/render-interval';
import { generateCreatureData } from './utils/creature-generation';
import { Creature } from './component';

export function CreaturePreview({ size }) {
  const [userIsHovering, setUserIsHovering] = useState(false);
  const updatingCreatureData = useRenderInterval(200, generateCreatureData, userIsHovering);

  return (
    <div
      onMouseEnter={() => setUserIsHovering(true)}
      onMouseLeave={() => setUserIsHovering(false)}
    >
      <Creature
        size={size}
        creatureData={updatingCreatureData}
      />
    </div>
  );
}