import React from 'react';
import './styles.css';
import { TextAndPhoto } from '../../features/text-and-photo/component';

export function Work() {
  return (
    <div className="work">
      <h1>Work</h1>

      <div className="intro">
        Hi, my name is <span className="bold-it">Clint Mullins</span>.
        <br />
        I'm a <span className="bold-it">tech lead</span> with a <span className="bold-it">frontend focus</span>.
      </div>

      <TextAndPhoto>
        Core Traits (todo: most things but also fix tenses language below)

        <ul>
          <li>Product focused</li>
          <li>Customer obsessed</li>
          <li>Process optimizer</li>
          <li>Best practice enforcer</li>
          <li>Leader by example</li>
          <li>Pragmatic engineer</li>
        </ul>
      </TextAndPhoto>
    </div>
  );
}
