import React, { useReducer } from 'react';
import { getAngryPhrase, getHappyPhrase } from './utils/phrases';
import './styles.css';

function getRandomClampedPercent() {
  return `${(Math.random() * 60) + 15}%`;
}

const ACTION_ANGER = 'anger';
const ACTION_HAPPY = 'happy';
const ACTION_MOVE = 'move';

function reducer(state, action) {
  switch (action.type) {
    case ACTION_ANGER:
      return {
        ...state,
        isDisabled: true,
        phrase: getAngryPhrase(),
      };
    case ACTION_HAPPY:
      return {
        ...state,
        isDisabled: false,
        phrase: getHappyPhrase(),
      };
    case ACTION_MOVE:
      return {
        ...state,
        top: getRandomClampedPercent(),
        left: getRandomClampedPercent(),
      };
    default:
      return state;
  }
}

const initialState = {
  isDisabled: false,
  phrase: "Let's get started!",
  top: '50%',
  left: '50%',
};

export function CTA() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { top, left, isDisabled, phrase } = state;

  function makeButtonAngry() {
    if (isDisabled) {
      return;
    }
  
    dispatch({type: ACTION_ANGER})

    setTimeout(() => {
      dispatch({type: ACTION_MOVE})

      setTimeout(() => {
        dispatch({type: ACTION_HAPPY})
      }, 1500);
    }, 2000);
  }

  const wrapperStyle = {
    backgroundColor: isDisabled ? 'black' : 'LightYellow',
  }

  return (
    <div className="the-rest" style={wrapperStyle}>
      <button
        className="the-button"
        disabled={isDisabled}
        onMouseEnter={makeButtonAngry}
        onClick={makeButtonAngry}
        style={{ top, left }}
      >
        {phrase}
      </button>
    </div> 
  );
}