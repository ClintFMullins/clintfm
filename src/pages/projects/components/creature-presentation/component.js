import React, {useState} from 'react';
import { generateCreatureData } from '../../../../features/creature/utils/creature-generation';
import { getCreatureAttributes } from '../../../../features/creature/utils/creature-attributes';
import './styles.css';
import { CreatureStats } from '../../../../features/creature-stats/component';

function getNewCreature() {
  const data = generateCreatureData();
  const attributes = getCreatureAttributes(data);

  return { data, attributes };
}

// TODO: Redo layout with grid to make this better.
export function CreaturePresentation(props) {
  const [creature, setCreature] = useState(getNewCreature)

  function showNewCreature() {
    setCreature(getNewCreature());
  }

  return (
    <div className="present-creature-wrapper" onClick={showNewCreature}>
      <CreatureStats creature={creature}/>
    </div>
  );
}