import { useState } from 'react';
import type { Topic } from '../../types';
import Bear from '../common/Bear';
import SignInModal from '../common/SignInModal';
import SoundButton from '../common/SoundButton';

type HeaderProps = {
  topic?: Topic;
  muted: boolean;
  onHome: () => void;
  onToggleMute: () => void;
};

export default function Header({ topic, muted, onHome, onToggleMute }: HeaderProps) {
  const [showSignIn, setShowSignIn] = useState(false);

  return <>
    <header className="header">
      <button className="brand" onClick={onHome} aria-label="NimoKids home">
        <Bear />
        <span>Nimo<span>Kids</span></span>
      </button>
      <nav className="play-nav" aria-label="Main navigation">
        <button className="active" onClick={onHome}>Play</button>
        <button onClick={onHome}>Adventures</button>
        <span className="safe-tag">🛡 Toddler Safe</span>
      </nav>
      <div className="header-right">
        {topic && <span className="topic-badge">{topic.emoji} {topic.name}</span>}
        <SoundButton muted={muted} onClick={onToggleMute} />
        <button type="button" className="squishy-btn lavender-btn sign-in-btn" onClick={() => setShowSignIn(true)}>
          <span className="sign-in-icon">👤</span> Sign in
        </button>
      </div>
    </header>
    <SignInModal open={showSignIn} onClose={() => setShowSignIn(false)} />
  </>;
}
