import React from 'react';
import { CorePrinciples } from './components/core-principles/component';
import { TechSkills } from './components/tech-skills/component';
import './styles.css';

export function Work() {
  return (
    <div className="work-wrapper">
      <div className="work">
        <div className="intro">
          <div>
            Hi, my name is 
            <br />
            <span className="bold-it">Clint Mullins</span>.
            <br />
            <br />
            I'm a <span className="bold-it">tech lead</span> with a <span className="bold-it">frontend focus</span>.
            <div className="intro-hint">
              Scroll down for information that compliments my <a href="todo">LinkedIn</a>
            </div>
          </div>
        </div>

        <CorePrinciples />
        <TechSkills />
      </div>
    </div>
  );
}
