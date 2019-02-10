import React, { useState } from 'react';
import { useInterval } from '../../utils/render-interval';
import { generateCreatureData } from './utils/creature-generation';
import { Creature } from './component';

export function CreaturePreview({ size }) {
  const [userIsHovering, setUserIsHovering] = useState(false);
  const [creatureData, setCreatureData] = useState(generateCreatureData());

  useInterval(() => {
    setCreatureData(generateCreatureData());
  }, userIsHovering ? 300 : null);

  return (
    <div
      onMouseEnter={() => setUserIsHovering(true)}
      onMouseLeave={() => setUserIsHovering(false)}
    >
      <Creature
        size={size}
        creatureData={creatureData}
      />
    </div>
  );
}