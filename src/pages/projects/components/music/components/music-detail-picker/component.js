import React, { useState } from 'react';
import './styles.css';
import * as cn from 'classnames';

const NOTE_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const NOTE_MODIFIERS = ['', '#', 'b'];
const OCTAVES = ['2', '3', '4', '5'];

const MODIFIER_MAP = {
  '': '[none]',
  '#': 'sharp',
  'b': 'flat',
}
const OCTAVE_MAP = {
  '2': 'low',
  '3': 'medium',
  '4': 'high',
  '5': 'vhigh',
}

export function MusicDetailPicker(props) {
  const [chosenLetter, setLetter] = useState(NOTE_LETTERS[0]);
  const [chosenModifier, setModifier] = useState(NOTE_MODIFIERS[0]);
  const [chosenOctave, setOctave] = useState(OCTAVES[1]);

  function submitNote() {
    props.submitNote(`${chosenLetter}${chosenModifier}${chosenOctave} q`);
    props.close();
  }

  return (
    <div className="music-detail-picker-wrapper">
      <div className="music-detail-picker">
        <div className="music-detail-section">
          {NOTE_LETTERS.map((letter) => {
            return (
              <button
                className={cn('music-detail-button', {
                  'music-detail-button-selected': chosenLetter === letter,
                })}
                onClick={() => setLetter(letter)}
              >
                {letter}
              </button>
            );
          })}
        </div>

        <div className="music-detail-section">
          {NOTE_MODIFIERS.map((modifier) => {
            return (
              <button
                className={cn('music-detail-button', {
                  'music-detail-button-selected': chosenModifier === modifier,
                })}
                onClick={() => setModifier(modifier)}
              >
                {MODIFIER_MAP[modifier]}
              </button>
            );
          })}
        </div>

        <div className="music-detail-section">
          {OCTAVES.map((octave) => {
            return (
              <button
                className={cn('music-detail-button', {
                  'music-detail-button-selected': chosenOctave === octave,
                })}
                onClick={() => setOctave(octave)}
              >
                {OCTAVE_MAP[octave]}
              </button>
            );
          })}
        </div>

        <div className="music-detail-submission">
          <button className="music-detail-button music-detail-button-submit" onClick={props.close}>Cancel</button>
          <button className="music-detail-button" onClick={submitNote}>Submit {`${chosenLetter}${chosenModifier}${chosenOctave}`}</button>
        </div>
      </div>
    </div>
  );
}