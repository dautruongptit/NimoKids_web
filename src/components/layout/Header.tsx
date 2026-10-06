import type { Topic } from '../../types';
import Bear from '../common/Bear';
import SoundButton from '../common/SoundButton';

type HeaderProps = {
  /** When given (during the quiz), the topic badge replaces the tagline. */
  topic?: Topic;
  muted: boolean;
  onHome: () => void;
  onToggleMute: () => void;
};

export default function Header({ topic, muted, onHome, onToggleMute }: HeaderProps) {
  return <header className="header">
    <button className="brand" onClick={onHome} aria-label="guessGame home"><Bear /><span>guess<span>Game</span><i>✦</i></span></button>
    <div className="header-right">
      {topic ? <span className="topic-badge">{topic.emoji} {topic.name}</span> : <span className="little-tag"><span>✦</span> Little minds. Big discoveries.</span>}
      <SoundButton muted={muted} onClick={onToggleMute} />
    </div>
  </header>;
}
