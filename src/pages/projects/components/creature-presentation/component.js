import React, {useState} from 'react';
import { Creature } from '../../../../features/creature/component';
import { generateCreatureData } from '../../../../features/creature/utils/creature-generation';
import './styles.css';

export function CreaturePresentation() {
  const [creatureData, setCreatureData] = useState(generateCreatureData())

  function showNewCreature() {
    setCreatureData(generateCreatureData());
  }

  return (
    <div className="present-creature-wrapper" onClick={showNewCreature}>
      <Creature size={250} creatureData={creatureData} />
    </div>
  );
}