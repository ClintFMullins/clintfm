import React from "react";
import {
  SORTED_FAVORITES,
  SORTED_RECENT,
  LESS_RECENT,
  SORTED_DABBLE,
} from "./utils";
import "./styles.css";
import { useWindowSize } from "../../../../utils/dom";

export function TechSkills() {
  const { height } = useWindowSize();

  return (
    <div className="tech-skills-wrapper" style={{ minHeight: height }}>
      My non-exhaustive tech buzzwords, grouped for your convenience:
      <br />
      <br />
      <div>
        <h3>❤️ Favorites</h3>/* eslint-disable jsx-a11y/accessible-emoji */
        <div className="tech-skills-skill-wrapper">
          {SORTED_FAVORITES.map((tech) => {
            return <TechSkill techSkill={tech} />;
          })}
        </div>
      </div>
      <div>
        <h3>🔧 Recent</h3>/* eslint-disable jsx-a11y/accessible-emoji */
        <div className="tech-skills-skill-wrapper">
          {SORTED_RECENT.map((tech) => {
            return <TechSkill techSkill={tech} />;
          })}
        </div>
      </div>
      <div>
        <h3>📀 Not So Recent</h3>/* eslint-disable jsx-a11y/accessible-emoji */
        <div className="tech-skills-skill-wrapper">
          {LESS_RECENT.map((tech) => {
            return <TechSkill techSkill={tech} />;
          })}
        </div>
      </div>
      <div>
        <h3>🎨 For fun, dabbled in...</h3>/* eslint-disable
        jsx-a11y/accessible-emoji */
        <div className="tech-skills-skill-wrapper">
          {SORTED_DABBLE.map((tech) => {
            return <TechSkill techSkill={tech} />;
          })}
        </div>
      </div>
    </div>
  );
}

function TechSkill({ techSkill }) {
  return (
    <div className="skill-container">
      <div className="skill-name">{techSkill}</div>
    </div>
  );
}
