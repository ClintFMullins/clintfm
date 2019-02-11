import React, { useState, useReducer } from 'react';
import styled from 'styled-components';
import { randomInRange } from '../creature/utils/random';
import { useInterval } from '../../utils/render-interval';
import { STORIES } from './utils/stories';
import { getRandomFromList } from '../../utils/numbers';

const SATURATION_MIN = 20;
const SATURATION_MAX = 100;

const WordWrapper = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${props => props.zIndex};
`;

const Word = styled.div`
  cursor: pointer;
  color: hsl(${props => props.hue}, ${props => props.saturation}%, 50%);
  background-color: hsl(${props => props.hue}, ${props => props.saturation}%, 90%);
  line-height: 80px;
  width: 300px;
  height: 80px;
  text-align: center;
  border-radius: 20px;
  transition: 1s linear all;
  font-size: 40px;
  font-weight: 600;

  ${props => props.isFading && `
    top: 0;
    left: 0;
    width: 100%;
    border-radius: 0;
    height: 100%;
    font-size: 12px;
    color: white;
    background-color: white;
  `}
`;

const ACTION_NEXT_WORD = 'ACTION_NEXT_WORD';

function getInitialState(rawStory) {
  const story = rawStory.split(' ');

  return {
    story,
    wordIndex: 0,
    words: [
      {
        word: story[0],
        hue: 0,
        queueTime: Date.now(),
      }
    ],
    saturation: SATURATION_MIN,
  };
}

export function wordReducer(state, action) {
  switch (action.type) {
    case ACTION_NEXT_WORD: {
      const timeNow = Date.now();

      let words = state.words.filter(({ queueTime }, index) => {
        return index < 2 || queueTime + 2000 > timeNow;
      });

      let nextWordIndex = state.wordIndex + 1;
      if (nextWordIndex > state.story.length - 1) {
        nextWordIndex = 0;
      }

      let newSaturation = state.saturation + 2;
      if (newSaturation > SATURATION_MAX) {
        newSaturation = SATURATION_MIN;
      }

      const nextWord = {
        word: state.story[nextWordIndex],
        hue: randomInRange(0, 360),
        queueTime: Date.now(),
      }

      return {
        ...state,
        wordIndex: nextWordIndex,
        words: [nextWord, ...words],
        saturation: newSaturation,
      };
    }
    default: {
      return state;
    }
  }
}

export function StoryTime() {
  const [{ words, saturation }, dispatch] = useReducer(wordReducer, getInitialState(getRandomFromList(STORIES)));
  const [isAutoplay, setIsAutoplay] = useState(false);

  useInterval(() => {
    dispatch({ type: ACTION_NEXT_WORD })
  }, isAutoplay ? 350 : null);

  return (
    <div onClick={() => setIsAutoplay((prevAutoplay) => !prevAutoplay)}>
      {words.map(({ word, hue }, index) => {
        return (
          <WordWrapper key={`${word}${hue}`} zIndex={words.length - index}>
            <Word hue={hue} saturation={saturation} isFading={index !== 0}>{word}</Word>
          </WordWrapper>
        )
      })}
    </div>
  );
}