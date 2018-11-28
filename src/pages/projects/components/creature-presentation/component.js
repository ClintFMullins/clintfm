import React, {useState} from 'react';
import { Creature } from '../../../../features/creature/component';
import { generateCreatureData } from '../../../../features/creature/utils/creature-generation';
import { getCreatureAttributes } from '../../../../features/creature/utils/creature-attributes';
import { TimeWidget } from '../../../../features/time-widget/component';
import './styles.css';

function getNewCreature() {
  const data = generateCreatureData();
  const attributes = getCreatureAttributes(data);

  return { data, attributes };
}

function Attribute(props) {
  return (
    <div>
      <span className="attribute-bold">{props.label}</span>: {props.value}
    </div>
  );
}

// TODO: Redo layout with grid to make this better.
export function CreaturePresentation() {
  const [creature, setCreature] = useState(getNewCreature)

  function showNewCreature() {
    setCreature(getNewCreature());
  }

  return (
    <div className="present-creature-wrapper" onClick={showNewCreature}>
      <div className="creature-machine">
        <div className="creature-machine-image">
          <div className="creature-foreground">
            <Creature size={150} creatureData={creature.data} />
          </div>
          <div className="creature-machine-image-background">
            <TimeWidget size={700}/>
          </div>
        </div>
        <div className="creature-machine-info">
          {Object.keys(creature.attributes).map((name) => {
            return <Attribute key={name} label={name} value={creature.attributes[name]} />
          })}
        </div>
        <div className="creature-machine-title">Creature Finder</div>
        <div className="creature-machine-detail-line line-1" />
        <div className="creature-machine-detail-line line-2" />
      </div>
    </div>
  );
}