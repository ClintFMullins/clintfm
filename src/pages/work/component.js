import React from 'react';
import { CorePrinciples } from './components/core-principles/component';
import { TechSkills } from './components/tech-skills/component';
import './styles.css';
import { useWindowSize } from '../../utils/dom';

export function Work() {
  const { height } = useWindowSize();

  return (
    <div className="work-wrapper">
      <div className="work">
        <div className="intro" style={{ height }}>
          <div>
            Hi, my name is 
            <br />
            <span className="bold-it">Clint Mullins</span>.
            <br />
            <br />
            I'm a <span className="bold-it">tech lead</span> with a <span className="bold-it">frontend focus</span>.
            <div className="intro-hint">
              Scroll down for information that compliments my <a rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/clinton-mullins-5651a161/">LinkedIn</a>
            </div>
          </div>
        </div>

        <CorePrinciples />
        <TechSkills />
      </div>
    </div>
  );
}
