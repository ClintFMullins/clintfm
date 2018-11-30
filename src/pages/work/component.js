import React from 'react';
import './styles.css';
import { TextAndPhoto } from '../../features/text-and-photo/component';

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
              Scroll if you have time, or just check out <a href="todo">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="core-strengths">
          <div>
            <div className="core-strengths-header">Core Principles</div>
            <div className="wordy-section">
              <div className="wordy-section-title">Lead</div>
              <div className="wordy-section-p">
                My favorite leaders have been forward-thinking, empathetic, demanding,
                full of ownership, and in the trenches with those they lead. I do my best to emulate
                these traits and work on tight feedback loops with all teams I work with and within.
              </div>
            </div>
            <div className="wordy-section">
              <div className="wordy-section-title">Be pragmatic</div>
              <div className="wordy-section-p">
                At the end of the day, I work to make people's lives better. I want
                to build great products for the user, I want to write clear specs for our
                product team, and maintainable code for the engineer.
                It is my job to make potentially large, ambiguous, complicated
                requests into easy to use software.
              </div>
            </div>
            <div className="wordy-section">
              <div className="wordy-section-title">Be product obsessed</div>
              <div className="wordy-section-p wordy-section-p-last">
                If I don't understand why we are going to build something,
                I ask questions until I do. This process often leads to
                everyone understanding the product better. Any resulting changes
                then happen during planning (inexpensive) as opposed to
                after the product has been implemented (expensive).
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
