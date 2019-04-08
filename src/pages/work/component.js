import React, { useEffect, useRef, useState } from 'react';
import { CorePrinciples } from './components/core-principles/component';
import { TechSkills } from './components/tech-skills/component';
import styled from 'styled-components';
import './styles.css';
import { useWindowSize } from '../../utils/dom';

const SCALE_FACTOR = 15;

const SubtleLink = styled.a`
  color: grey;
  font-weight: 600;
`;

export function Work() {
  const { height } = useWindowSize();
  const [color, setColor] = useState(window.scrollY);
  const timeoutId = useRef(null);

  function throttledOnScroll(scrollPosition) {
    const newHue = (scrollPosition / SCALE_FACTOR) % 360;

    setColor(newHue);
  }

  function onScroll() {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }

      timeoutId.current = setTimeout(function() {
        throttledOnScroll(window.scrollY);
      }, 50);
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  });

  return (
    <div className="work-wrapper" style={{ background: `hsl(${color}, 80%, 93%)`, transition: 'background 400ms linear' }}>
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
              Scroll down for information that compliments my <a rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/clint-mullins-5651a161">LinkedIn</a>
            </div>
          </div>
        </div>

        <CorePrinciples />
        <TechSkills />

        <div className="explanation-wrapper" style={{ minHeight: height }}>
          <div>
            <div className="tech-skills-skill-wrapper">
              <h2>Why is this page so simple? Where's the pizzazz?</h2>
              <p>
                Good question! My goal here is to give you a quick overview of my work philosophy and toolset.
                If that answer leaves you wanting, here are some options for you:
                <ul>
                  <li>For some pizzazz check out the <SubtleLink href="/play">play page</SubtleLink> for fun experiments of mine</li>
                  <li>For more professional experience, <SubtleLink rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/clint-mullins-5651a161">LinkedIn</SubtleLink> is the place to be</li>
                  <li>For anything else feel free to contact me at&nbsp;<SubtleLink href="mailto:clintfmullins@gmail.com">clintfmullins@gmail.com</SubtleLink> </li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
