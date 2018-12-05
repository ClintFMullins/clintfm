import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { useVoiceRecording } from './utils/use-voice-recording';
import './styles.css';

function smoothScrollToBottom() {
  window.scroll({
    top: document.body.clientHeight, 
    left: 0,
    behavior: 'smooth',
  });
}

export function Rhymes() {
  const { triggerRecording, recordedWords } = useVoiceRecording();
  const [words, setWords] = useState([]);
  const [wordRhymes, setWordRhymes] = useState([]);
  const [typed, setTyped] = useState('');
  const { ref, refFocus } = useFocusOnLoad();

  function submitTyped(word) {
    if (word.trim() === '') {
      return;
    }

    queueWord(word);
    setTyped('');
  }

  function onInputChange(event) {
    const value = event.currentTarget.value;

    if (value.includes(' ')) {
      submitTyped(value);
    } else {
      setTyped(value);
    }
  }

  function onInputKeyDown(event) {
    if (event.keyCode === 13) {
      submitTyped(typed);
    }
  }

  function resetRhymes() {
    setWords([]);
    setWordRhymes({});
  }

  function queueWord(word) {
    setWords(prevState => [...prevState, word]);

    fetch(`https://api.datamuse.com/words?rel_rhy=${word}`)
      .then(response => {
        response.json().then((responseWords) => {
          const subsetOfRhymes = responseWords.map((resp) => resp.word).slice(0, 20);

          setWordRhymes((prevWordRhymes) => (
            { ...prevWordRhymes, [word]: subsetOfRhymes }
          ));

          smoothScrollToBottom();
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
      <div key={index} className="rhyme-word-wrapper-shared rhyme-word-wrapper">
        <span className="rhyme-word">
          {word}
        </span>
        {rhymesForWord.map(renderRhyme)}
        <div className="fade-out-detail" />
      </div>
    )
  }

  return (
    <div className="rhyming-page-container">
      <div className="rhyming-page-wrapper">
        <div className="red-detail" />
        <div className="rap-title">My Sweet Rhymes</div>
        {renderBackground(15, refFocus)}
        <div>{words.map(renderWordRhyme)}</div>
        <div className="rhyme-word-wrapper-shared rhyme-word-wrapper rhyme-word-input-wrapper">
          <input
            ref={ref}
            className="rhyme-word rhyme-word-typing"
            value={typed}
            onChange={onInputChange}
            onKeyDown={onInputKeyDown}
            placeholder="..."
          />
          <span>
            <span className="trigger-record" onClick={triggerRecording}>record</span> / {' '}
            <span className="trigger-reset" onClick={resetRhymes}>clear</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function renderBackground(size, refFocus) {
  return (
    <div className="background-layer" onClick={refFocus}>
      {
        Array.from(new Array(size)).map((_, index) => (
          <div
            key={index}
            className={`${index === 0 ? 'rhyme-word-wrapper-top' : ''} rhyme-word-wrapper-shared background-rhyme-word-wrapper`}
          />
        ))
      }
    </div>
  );
}

function useFocusOnLoad() {
  const ref = useRef();

  function refFocus() {
    if (ref && ref.current && ref.current.focus) {
      ref.current.focus();
    }
  }

  useLayoutEffect(refFocus);

  return { ref, refFocus };
}