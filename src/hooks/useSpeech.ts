import { useState } from 'react';

/** Text-to-speech through the browser, plus the on/off switch used by the header sound button. */
export default function useSpeech() {
  const [muted, setMuted] = useState(false);

  function say(text: string) {
    if (muted || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = .85;
    utterance.pitch = 1.25;
    window.speechSynthesis.speak(utterance);
  }

  function cancel() {
    window.speechSynthesis?.cancel();
  }

  function toggleMute() {
    setMuted(value => !value);
    cancel();
  }

  return { muted, say, cancel, toggleMute };
}
