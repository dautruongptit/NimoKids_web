import { useState } from 'react';
import { AUDIO_FALLBACK_MS } from '../constants';

/** Text-to-speech through the browser, plus the on/off switch used by the header sound button. */
export default function useSpeech() {
  const [muted, setMuted] = useState(false);

  /** Speaks `text`. `onEnded` runs exactly once when the audio ends, or at once when nothing will be spoken. */
  function say(text: string, onEnded?: () => void) {
    if (muted || !('speechSynthesis' in window)) {
      onEnded?.();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = .85;
    utterance.pitch = 1.25;
    if (onEnded) {
      let done = false;
      const finish = () => { if (!done) { done = true; onEnded(); } };
      utterance.onend = finish;
      utterance.onerror = finish;
      setTimeout(finish, AUDIO_FALLBACK_MS);
    }
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
