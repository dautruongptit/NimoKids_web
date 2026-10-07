import { useState } from 'react';
import { copy } from '../../content/copy';
import type { TopicsStatus } from '../../hooks/useTopics';
import type { Topic } from '../../types';
import ErrorNotice from '../common/ErrorNotice';
import TopicCard from './TopicCard';

const INITIAL_VISIBLE = 10;

type TopicSectionProps = {
  status: TopicsStatus;
  topics: Topic[];
  selected: Topic | undefined;
  onSelect: (topic: Topic) => void;
  onRetry: () => void;
  onSpeak?: (text: string) => void;
};

export default function TopicSection({ status, topics, selected, onSelect, onRetry, onSpeak }: TopicSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? topics : topics.slice(0, INITIAL_VISIBLE);

  return <section className="topic-section" aria-labelledby="topic-title">
    <div className="prompt-banner">
      {onSpeak && <button
        className="prompt-speaker"
        aria-label="Listen to topic guide"
        onClick={() => onSpeak('Choose a topic! What do you want to learn today?')}
      >
        🔊
      </button>}
      <div>
        <h1 id="topic-title">Choose a Topic! 🎯</h1>
        <p>What do you want to learn today? Tap a card and let's explore!</p>
      </div>
      <span className="preschool-pill">🎓 Preschool Safe •<br />100% Fun</span>
    </div>

    {status === 'loading' && <p className="topic-status" role="status">{copy.loadingTopics}</p>}
    {status === 'error' && <ErrorNotice message={copy.errors.topics} onRetry={onRetry} />}
    {status === 'ready' && <>
      <div className="topic-tiles">
        {visible.map(topic => <TopicCard
          key={topic.id}
          topic={topic}
          selected={selected?.id === topic.id}
          onSelect={onSelect}
          onSpeak={onSpeak}
        />)}
      </div>
      {topics.length > INITIAL_VISIBLE && <button
        className="more-topics-btn"
        onClick={() => setExpanded(v => !v)}
      >
        {expanded ? 'Fewer little worlds ↑' : 'More little worlds ↓'}
      </button>}
    </>}
  </section>;
}
