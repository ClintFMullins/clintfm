import React, { useReducer, useEffect, useRef } from 'react';
import * as TinyMusic from 'tinymusic';
import * as cn from 'classnames';
import './styles.css';

const audioContext = new AudioContext();

function silence(duration = 'q') {
  return `- ${duration}`
}

const ACTION_PLAY = 'play';
const ACTION_PLUS_LENGTH = 'plus-length';
const ACTION_MINUS_LENGTH = 'minus-length';
const ACTION_PLUS_SEQUENCE = 'plus-seq';
const ACTION_MINUS_SEQUENCE = 'minus-seq';
const ACTION_UPDATE_NOTE = 'add-note';
const ACTION_UPDATE_NOTE_SOUND = 'add-note-sound';
const ACTION_INCREMENT_SEQUENCE = 'increment-sequence';

function getSequenceOfLength(sequence, length) {
  if (sequence.length > length) {
    return sequence.slice(0, length);
  }
  const fillSequence = Array.from(new Array(length - sequence.length)).map(() => {
    return false;
  })

  return [...sequence, ...fillSequence];
}

const getSequenceNoteCount = (state) => state.sequences[0].length;

const initialState = {
  isPlaying: true,
  tempo: 120,
  sequences: [
    [true, false, false, false],
    [false, true, false, false],
    [false, false, true, false],
    [false, false, false, true],
  ],
  sequenceNotes: [
    'C3 q',
    'E3 q',
    'F3 q',
    'G3 q',
  ],
  currentNoteIndex: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION_PLAY:
      return {
        ...state,
        isPlaying: true,
      };
    case ACTION_PLUS_LENGTH:
      const newPlusLength = getSequenceNoteCount(state) + 1;

      return {
        ...state,
        sequences: state.sequences.map((sequence) => {
          return getSequenceOfLength(sequence, newPlusLength);
        }),
        currentNoteIndex: 0,
      };
    case ACTION_MINUS_LENGTH:
      const newMinusLength = Math.max(getSequenceNoteCount(state) - 1, 1);
      
      return {
        ...state,
        sequences: state.sequences.map((sequence) => {
          return getSequenceOfLength(sequence, newMinusLength);
        }),
        currentNoteIndex: 0,
      };
    case ACTION_PLUS_SEQUENCE:
      return {
        ...state,
        sequences: [...state.sequences, getSequenceOfLength([], getSequenceNoteCount(state))],
        sequenceNotes: [...state.sequenceNotes, silence()],
        currentNoteIndex: 0,
      };
    case ACTION_MINUS_SEQUENCE:
      const newSequenceCount = Math.max(state.sequences.length - 1, 1);

      return {
        ...state,
        sequences: state.sequences.slice(0, newSequenceCount),
        sequenceNotes: state.sequenceNotes.slice(0, newSequenceCount),
        currentNoteIndex: 0,
      };
    case ACTION_UPDATE_NOTE:
      const newSequences = [ ...state.sequences ];

      newSequences[action.sequenceIndex][action.noteIndex] = action.shouldAddNote;

      return {
        ...state,
        sequences: newSequences,
        currentNoteIndex: 0,
      };
    case ACTION_INCREMENT_SEQUENCE:
      let newSequenceIndex = state.currentNoteIndex + 1;
      if (newSequenceIndex > getSequenceNoteCount(state) - 1) {
        newSequenceIndex = 0;
      }

      return {
        ...state,
        currentNoteIndex: newSequenceIndex,
      };
    case ACTION_UPDATE_NOTE_SOUND:
      const newSequenceNotes = [ ...state.sequenceNotes ];

      newSequenceNotes[action.sequenceIndex] = action.note

      return {
        ...state,
        sequenceNotes: newSequenceNotes,
        currentNoteIndex: 0,
      };
    default:
      return state;
  }
}

export function MusicSequence() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const musicSequences = useRef([]);

  const sequenceTrigger = state.sequences.reduce((agg, cur) => {
    return agg + cur; 
  }, []) + state.sequenceNotes;

  useEffect(() => {
    musicSequences.current.forEach((musicSequence) => {
      musicSequence.stop();
    });

    const newMusicSequences = [];
    
    state.sequences.forEach((sequence, index) => {
      const processedSequence = sequence.map((shouldPlayNote) => {
        return shouldPlayNote ? state.sequenceNotes[index] : silence();
      })

      const seq = new TinyMusic.Sequence(audioContext, state.tempo, processedSequence);

      seq.createCustomWave([-0.8, 1, 0.8, 0.8, -0.8, -0.8, -1]);
      seq.play();
      newMusicSequences.push(seq);
    });

    musicSequences.current = newMusicSequences;

    const visualInterval = setInterval(() => {
      dispatch({type: ACTION_INCREMENT_SEQUENCE });
    }, (60 / state.tempo) * 1000);

    return () => clearInterval(visualInterval);
  }, [sequenceTrigger])

  console.log(state);

  return (
    <div className="sequence-page-wrapper">
      <div className="sequence-page-wrapper-inner">
        <div className="all-sequences-adding-container">
        <div className="sequence-add-sequence" onClick={() => { dispatch({type: ACTION_MINUS_SEQUENCE}) }}>
            -
        </div>
          <div className="all-sequences-wrapper-container">
            <div className="sequence-add-note" onClick={() => { dispatch({type: ACTION_MINUS_LENGTH}) }}>
              -
            </div>
            <div className="all-sequences-wrapper">
              {state.sequences.map((sequence, sequenceIndex) => {
                const sequenceSoundVisual = state.sequenceNotes[sequenceIndex].split(' ')[0];

                function changeNoteSound() {
                  dispatch({
                    type: ACTION_UPDATE_NOTE_SOUND,
                    sequenceIndex,
                    note: 'G3 q',
                  })
                }

                return(
                  <div className="sequence-wrapper">
                    <div className="sequence-note-sound" onClick={changeNoteSound}>
                      {sequenceSoundVisual}
                    </div>
                    <div className="sequence-note-wrapper">
                      {Array.from(new Array(getSequenceNoteCount(state))).map((_, noteIndex) => {
                        const currentNote = sequence[noteIndex];
                        
                        function addNote() {
                          dispatch({
                            type: ACTION_UPDATE_NOTE,
                            sequenceIndex,
                            noteIndex,
                            shouldAddNote: !currentNote,
                          })
                        }

                        const noteClasses = cn('sequence-note', {
                          'sequence-note-filled': currentNote,
                          'sequence-note-playing': noteIndex === state.currentNoteIndex,
                        });

                        return <div className={noteClasses} onClick={addNote} />;
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="sequence-add-note" onClick={() => { dispatch({type: ACTION_PLUS_LENGTH}) }}>
              +
            </div>
          </div>
          <div className="sequence-add-sequence" onClick={() => { dispatch({type: ACTION_PLUS_SEQUENCE}) }}>
            +
          </div>
        </div>
      </div>
    </div>
  );
}


// var ac = new AudioContext(),
//   // get the current Web Audio timestamp (this is when playback should begin)
//   when = ac.currentTime,
//   // set the tempo
//   tempo = 132,
//   // initialize some vars
//   sequence1,
//   sequence2,
//   sequence3,
//   // create an array of "note strings" that can be passed to a sequence
//   lead = [
//     '-   e',
//     'Bb3 e',
//     'A3  e',
//     'Bb3 e',
//     'G3  e',
//     'A3  e',
//     'F3  e',
//     'G3  e',

//     'E3  e',
//     'F3  e',
//     'G3  e',
//     'F3  e',
//     'E3  e',
//     'F3  e',
//     'D3  q',

//     '-   e',
//     'Bb3 s',
//     'A3  s',
//     'Bb3 e',
//     'G3  e',
//     'A3  e',
//     'G3  e',
//     'F3  e',
//     'G3  e',

//     'E3  e',
//     'F3  e',
//     'G3  e',
//     'F3  e',
//     'E3  s',
//     'F3  s',
//     'E3  e',
//     'D3  q'
//   ],
//   harmony = [
//     '-   e',
//     'D4  e',
//     'C4  e',
//     'D4  e',
//     'Bb3 e',
//     'C4  e',
//     'A3  e',
//     'Bb3 e',

//     'G3  e',
//     'A3  e',
//     'Bb3 e',
//     'A3  e',
//     'G3  e',
//     'A3  e',
//     'F3  q',

//     '-   e',
//     'D4  s',
//     'C4  s',
//     'D4  e',
//     'Bb3 e',
//     'C4  e',
//     'Bb3 e',
//     'A3  e',
//     'Bb3 e',

//     'G3  e',
//     'A3  e',
//     'Bb3 e',
//     'A3  e',
//     'G3  s',
//     'A3  s',
//     'G3  e',
//     'F3  q'
//   ],
//   bass = [
//     'D3  q',
//     '-   h',
//     'D3  q',

//     'A2  q',
//     '-   h',
//     'A2  q',

//     'Bb2 q',
//     '-   h',
//     'Bb2 q',

//     'F2  h',
//     'A2  h'
//   ];

// // create 3 new sequences (one for lead, one for harmony, one for bass)
// sequence1 = new TinyMusic.Sequence( ac, tempo, lead );
// sequence2 = new TinyMusic.Sequence( ac, tempo, harmony );
// sequence3 = new TinyMusic.Sequence( ac, tempo, bass );

// // set staccato and smoothing values for maximum coolness
// sequence1.staccato = 0.55;
// sequence2.staccato = 0.55;
// sequence3.staccato = 0.05;
// sequence3.smoothing = 0.4;

// // adjust the levels so the bass and harmony aren't too loud
// sequence1.gain.gain.value = 1.0;
// sequence2.gain.gain.value = 0.8;
// sequence3.gain.gain.value = 0.65;

// // apply EQ settings
// sequence1.mid.frequency.value = 800;
// sequence1.mid.gain.value = 3;
// sequence2.mid.frequency.value = 1200;
// sequence3.mid.gain.value = 3;
// sequence3.bass.gain.value = 6;
// sequence3.bass.frequency.value = 80;
// sequence3.mid.gain.value = -6;
// sequence3.mid.frequency.value = 500;
// sequence3.treble.gain.value = -2;
// sequence3.treble.frequency.value = 1400;


// //start the lead part immediately
// sequence1.play( when );
// // delay the harmony by 16 beats
// sequence2.play( when + ( 60 / tempo ) * 16 );
// // start the bass part immediately
// sequence3.play( when );
