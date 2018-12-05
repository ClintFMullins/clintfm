import React, { useState } from 'react';
import { Creature } from '../../../../features/creature/component';
import { generateCreatureData } from '../../../../features/creature/utils/creature-generation';
import { mateCreatures } from '../../../../features/creature/utils/creature-mating';
import { CreatureStats } from '../../../../features/creature-stats/component';
import { getCreatureAttributes } from '../../../../features/creature/utils/creature-attributes';
import './styles.css';

function getCreatureData(creature) {
  return {
    data: creature,
    attributes: getCreatureAttributes(creature),
  }
}

function CreatureShown(props) {
  return (
    <div className="creature-shown-outer-wrapper" onClick={props.close}>
      <div>
        <CreatureStats creature={props.creature}/>
      </div>
    </div>
  )
}

function MatingCreature(props) {
  console.log(props)
  return (
    <div key={props.index} className={`mating-creature-wrapper ${props.index > 1 ? 'hide-on-mobile' : ''}`} onClick={props.onCreatureClick}>
      <Creature size={130} creatureData={props.data}/>
      <button className="mating-creature-info-button" onClick={props.showInfo}>info</button>
    </div>
  )
}

const CHILD_COUNT = 3;

export function Mating() {
  const [ creatureToShow, setCreatureToShow ] = useState(null);
  // You're not supposed to call useState in loops - but these are based on constants
  // so it won't break anything. In a large project with more folks this would be a 
  // bad idea. In a small project with just me, it's just not a good idea.
  const parentCreatureData = Array.from(new Array(2)).map(() => {
    return useState(getCreatureData(generateCreatureData()));
  });

  const parent1 = parentCreatureData[0][0];
  const parent2 = parentCreatureData[1][0];

  const childrenCreatureData = Array.from(new Array(CHILD_COUNT)).map(() => {
    return useState(getCreatureData(mateCreatures(parent1.data, parent2.data)));
  });

  const parentTriggerNewCreatureFuncs = parentCreatureData.map((creatureData, index) => {
    return () => {
      const [_, setCreatureState] = creatureData;

      const newParent = getCreatureData(generateCreatureData());
      const otherParent = index === 0 ? parent2 : parent1;

      setCreatureState(getCreatureData(generateCreatureData()));

      childrenCreatureData.forEach((childrenCreatureData) => {
        const [_, setChildCreatureState] = childrenCreatureData;

        setChildCreatureState(getCreatureData(mateCreatures(newParent.data, otherParent.data)))
      })
    }
  });

  const childrenTriggerNewCreatureFuncs = childrenCreatureData.map((creatureData) => {
    return () => {
      const [_, setCreatureState] = creatureData;

      setCreatureState(getCreatureData(mateCreatures(parent1.data, parent2.data)));
    }
  });

  const showInfoFuncs = [...parentCreatureData, ...childrenCreatureData].map((creatureData) => {
    return (event) => {
      event.stopPropagation();
      event.preventDefault();

      setCreatureToShow(creatureData[0]);
    }
  });

  return (
    <div className="mating-container">
      {creatureToShow !== null && <CreatureShown creature={creatureToShow} close={() => setCreatureToShow(null)} />}
      <div className="mating-parents mating-center">
        <div className="mating-center-wrapper">
        <div className="mating-title">Parents</div>
          <div className="mating-center">
            {parentCreatureData.map((creatureData, index) => {
              return (
                <MatingCreature
                  data={creatureData[0].data}
                  index={index}
                  onCreatureClick={parentTriggerNewCreatureFuncs[index]}
                  showInfo={showInfoFuncs[index]}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="mating-children mating-center">
        <div className="mating-center-wrapper">
          <div className="mating-center">
            {childrenCreatureData.map((creatureData, index) => {
              return (
                <MatingCreature
                  data={creatureData[0].data}
                  index={index}
                  onCreatureClick={childrenTriggerNewCreatureFuncs[index]}
                  showInfo={showInfoFuncs[index + 2]}
                />
              );
            })}
          </div>
          <div className="mating-title">Offspring</div>
        </div>
      </div>
    </div>
  );
}