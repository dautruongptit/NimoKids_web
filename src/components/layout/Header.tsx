import type { Topic } from '../../types';
import Bear from '../common/Bear';
import SoundButton from '../common/SoundButton';

type HeaderProps = {
  topic?: Topic;
  muted: boolean;
  onHome: () => void;
  onToggleMute: () => void;
};

export default function Header({ topic, muted, onHome, onToggleMute }: HeaderProps) {
  return <header className="header">
    <button className="brand" onClick={onHome} aria-label="NimoKids home">
      <Bear />
      <span>Nimo<span>Kids</span></span>
    </button>
    <nav className="play-nav" aria-label="Main navigation">
      <button onClick={onHome}>Play</button>
      <button onClick={onHome}>Adventures</button>
      <span className="safe-tag">🛡 Toddler Safe</span>
    </nav>
    <div className="header-right">
      {topic && <span className="topic-badge">{topic.emoji} {topic.name}</span>}
      <SoundButton muted={muted} onClick={onToggleMute} />
    </div>
  </header>;
}
