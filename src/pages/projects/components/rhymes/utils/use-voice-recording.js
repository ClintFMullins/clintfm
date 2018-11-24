import { useState, useEffect } from 'react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

export function useVoiceRecording() {
  const [recordedWords, setRecordedWords] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.onresult = (event) => {
      const transcript = event.results[event.resultIndex][0].transcript;
      const eachWordRecorded = transcript.split(' ');
      setRecordedWords(eachWordRecorded);
      setIsRecording(false);
    };
  }, []);

  function triggerRecording() {
    recognition.start();
    setIsRecording(true);
  }

  return {triggerRecording, recordedWords, isRecording};
}