import React from 'react';
import './styles.css';
import { TextAndPhoto } from '../../features/text-and-photo/component';

export function Work() {
  return (
    <div className="work">
      <h1 className="work-title">Work</h1>

      <div className="intro">
        Hi, my name is <span className="bold-it">Clint Mullins</span>.
        <br />
        I'm a <span className="bold-it">tech lead</span> with a <span className="bold-it">frontend focus</span>.
      </div>

      <h2>Core Strengths</h2>
      <h3>1. Product focused</h3>
      <p>
        If I don't understand why I we are going to build something,
        I start asking questions until I do. Doing this often leads to
        everyone understanding the product better. Any resulting changes
        this type then happen during specing (inexpensive) as opposed to
        after the product has been built (expensive).
      </p>

      TODO: examples

      <h3>2. Pragmatic</h3>
      <p>
        At the end of the day, I work to make people's life better. I want
        to build great products for the user, I want to write clear specs for our
        product team, and maintainable code for the engineer.
        It is my job to make potentially large, ambiguous, complicated
        requests into easy to use software.
      </p>

      TODO: examples

      <h3>3. Leader</h3>
      <p>
        My favorite leaders have been forward-thinking, empathetic, demanding,
        full of ownership, and in the trenches with me. I do my best to emulate
        these traits each and every day.
      </p>

      TODO: examples

      {/* <TextAndPhoto>
        Core Strengths

        <ul>
          <li>Product focused</li>
          <li>Process optimizer</li>
          <li>Pragmatic engineer</li>
          <li>Leader</li>
        </ul>
      </TextAndPhoto> */}
    </div>
  );
}
