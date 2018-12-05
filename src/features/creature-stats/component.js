import React from 'react';
import { TimeWidget } from '../time-widget/component';
import { Creature } from '../creature/component';
import './styles.css';

function Attribute(props) {
  return (
    <div>
      <span className="attribute-bold">{props.label}</span>: {props.value}
    </div>
  );
}

export function CreatureStats(props) {
  const { creature } = props;

  return (
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
      <div className="creature-machine-title">Creature Details</div>
      <div className="creature-machine-detail-line line-1" />
      <div className="creature-machine-detail-line line-2" />
    </div>
  );
}