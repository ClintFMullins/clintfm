import { useState, useEffect } from 'react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;

try {
  recognition = new SpeechRecognition();
} catch {
  console.warn('Speech is only supported in Chrome');
}

export function useVoiceRecording() {
  const [recordedWords, setRecordedWords] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (!recognition) {
      return;
    }

    recognition.onresult = (event) => {
      const transcript = event.results[event.resultIndex][0].transcript;
      const eachWordRecorded = transcript.split(' ');
      setRecordedWords(eachWordRecorded);
      setIsRecording(false);
    };
  }, []);

  function triggerRecording() {
    if (!recognition) {
      return;
    }

    recognition.start();
    setIsRecording(true);
  }

  return {triggerRecording, recordedWords, isRecording, supportsRecording: !!recognition};
}