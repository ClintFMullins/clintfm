import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useVoiceRecording } from './utils/use-voice-recording';
import './styles.css';

function useSmoothScrollToBottom() {
  useLayoutEffect(() => {
    window.scroll({
      top: document.body.clientHeight, 
      left: 0,
      behavior: 'smooth',
    });
  });
}

const initialWordsState = ['click', 'and', 'speak'];
const initialRhymesState = {
  click: ['see'],
  and: ['rhyming'],
  speak: ['words'],
};

export function Rhymes() {
  const { triggerRecording, recordedWords, isRecording } = useVoiceRecording();
  const [hasClearedScreen, setHasClearedScreen] = useState(false);
  const [words, setWords] = useState(initialWordsState);
  const [wordRhymes, setWordRhymes] = useState(initialRhymesState);
  useSmoothScrollToBottom();

  function resetRhymes() {
    setWords([]);
    setWordRhymes({});
  }

  function firstReset() {
    if (!hasClearedScreen) {
      setHasClearedScreen(true);
      resetRhymes();
    }
  }

  function queueWord(word) {
    firstReset();
    setWords(prevState => [...prevState, word]);

    fetch(`https://api.datamuse.com/words?rel_rhy=${word}`)
      .then(response => {
        response.json().then((responseWords) => {
          const subsetOfRhymes = responseWords.map((resp) => resp.word).slice(0, 20);

          setWordRhymes((prevWordRhymes) => (
            { ...prevWordRhymes, [word]: subsetOfRhymes }
          ));
        });
      }).catch((error) => console.error(error));
  }

  useEffect(() => {
    recordedWords.forEach(queueWord);
  }, recordedWords);

  function renderRhyme(word, index) {
    return (
      <span
        key={index}
        className="one-of-many-rhymes"
        onClick={() => queueWord(word)}
      >
        {word}{' '}
      </span>
    );
  }

  function renderWordRhyme(word, index) {
    const rhymesForWord = wordRhymes[word] || [];

    return (
      <div key={index} className="rhyme-word-wrapper">
        <span className="rhyme-word">
          {word}
        </span>
        {rhymesForWord.map(renderRhyme)}
      </div>
    )
  }

  return (
    <>
      <div>{words.map(renderWordRhyme)}</div>
      <button
        className="rhyming-button rhyming-trigger"
        onClick={triggerRecording}
        disabled={isRecording}
      >
        DJ, spin that shit.
      </button>
      <button
        className="rhyming-button rhyming-reset"
        onClick={resetRhymes}
      >
        Shit's wack, yo
      </button>
    </>
  );
}