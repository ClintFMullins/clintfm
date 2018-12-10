import React from 'react';
import { getWrittenTime, SORTED_TECH_SKILLS_KEYS, TECH_SKILLS } from './utils';
import './styles.css';
import { useWindowSize } from '../../../../utils/dom';

export function TechSkills() {
  const { height } = useWindowSize();

  return (
    <div className="tech-skills-wrapper" style={{ minHeight: height }}>
      <div>
        <div className="core-strengths-header">Tech Experience</div>
        <div className="tech-skills-skill-wrapper">
          {SORTED_TECH_SKILLS_KEYS.map((techSkillKey) => {
            const techSkill = TECH_SKILLS[techSkillKey];

            return (
              <div className="skill-container" key={techSkillKey}>
                <div className="skill-name">
                  {techSkillKey}
                </div>
                <div className={`skill-time ${techSkill.isUsingCurrently ? '' : 'skill-container-inactive'}`}>
                  {getWrittenTime(techSkill.timeSpent)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}
