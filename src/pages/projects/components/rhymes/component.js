import React, { useState, useEffect } from 'react';
import { useVoiceRecording } from './utils/use-voice-recording';
import { useWindowSize, useFocusOnLoad } from '../../../../utils/dom';
import { PageContainer, Paper, BackgroundLayer, OneOfManyRhymes, PaperRedLine, FadeOutDetail, ResetButton, RapTitle, RecordButton, RhymeWordWrapper, RhymeWordInputWrapper, RhymeWordTyping, RhymeWord } from './styles.js';

export function Rhymes() {
  const { triggerRecording, recordedWords, supportsRecording } = useVoiceRecording();
  const [words, setWords] = useState([]);
  const [wordRhymes, setWordRhymes] = useState([]);
  const [typed, setTyped] = useState('');
  const { ref, refFocus } = useFocusOnLoad();
  const { height } = useWindowSize();

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
        });
      }).catch((error) => console.error(error));
  }

  useEffect(() => {
    recordedWords.forEach(queueWord);
  }, [recordedWords]);

  function renderRhyme(word, index) {
    return (
      <OneOfManyRhymes
        key={index}
        onClick={() => queueWord(word)}
      >
        {word}{' '}
      </OneOfManyRhymes>
    );
  }

  function renderWordRhyme(word, index) {
    const rhymesForWord = wordRhymes[word] || [];

    return (
      <RhymeWordWrapper key={index}>
        <RhymeWord>
          {word}
        </RhymeWord>
        {rhymesForWord.map(renderRhyme)}
        <FadeOutDetail />
      </RhymeWordWrapper>
    )
  }

  return (
    <PageContainer style={{ minHeight: height }}>
      <Paper>
        <PaperRedLine />
        <RapTitle>My Sweet Rhymes</RapTitle>
        {renderBackground(40, refFocus)}
        <div>{words.map(renderWordRhyme)}</div>
        <RhymeWordInputWrapper>
          <RhymeWordTyping
            ref={ref}
            value={typed}
            onChange={onInputChange}
            onKeyDown={onInputKeyDown}
            placeholder="..."
          />
          <span>
            {supportsRecording &&
              <>
                <RecordButton onClick={triggerRecording}>record</RecordButton> / {' '}
              </>
            }
            <ResetButton onClick={resetRhymes}>clear</ResetButton>
          </span>
        </RhymeWordInputWrapper>
      </Paper>
    </PageContainer>
  );
}

function renderBackground(size, refFocus) {
  return (
    <BackgroundLayer onClick={refFocus}>
      {
        Array.from(new Array(size)).map((_, index) => (
          <RhymeWordWrapper key={index} isTop={index === 0} isBackground={true} />
        ))
      }
    </BackgroundLayer>
  );
}