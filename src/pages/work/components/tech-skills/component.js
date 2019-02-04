import React from 'react';
import { SORTED_TECH_SKILLS_KEYS, TECH_SKILLS } from './utils';
import './styles.css';
import { useWindowSize } from '../../../../utils/dom';

export function TechSkills() {
  const { height } = useWindowSize();

  return (
    <div className="tech-skills-wrapper" style={{ minHeight: height }}>
      <div>
        <div className="tech-skills-skill-wrapper">
          {SORTED_TECH_SKILLS_KEYS.map((techSkillKey) => {
            const techSkill = TECH_SKILLS[techSkillKey];

            return (
              <div className="skill-container" key={techSkillKey}>
                <div className={`skill-name ${techSkill.isUsingCurrently ? '' : 'skill-container-inactive'}`}>
                  {techSkillKey}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}
