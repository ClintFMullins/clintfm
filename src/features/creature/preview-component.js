import React, { useState } from 'react';
import { useRenderInterval } from '../../utils/render-interval';
import { generateCreatureData } from './utils/creature-generation';
import { Creature } from './component';

export function CreaturePreview() {
  const [userIsHovering, setUserIsHovering] = useState(false);
  const updatingCreatureData = useRenderInterval(1000, generateCreatureData, userIsHovering);

  return (
    <div
      onMouseEnter={() => setUserIsHovering(true)}
      onMouseLeave={() => setUserIsHovering(false)}
    >
      <Creature
        size={50}
        creatureData={updatingCreatureData}
      />
    </div>
  );
}