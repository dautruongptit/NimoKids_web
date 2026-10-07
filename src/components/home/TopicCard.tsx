import type { Topic } from '../../types';

type TopicCardProps = {
  topic: Topic;
  selected: boolean;
  onSelect: (topic: Topic) => void;
  onSpeak?: (name: string) => void;
};

export default function TopicCard({ topic, selected, onSelect, onSpeak }: TopicCardProps) {
  const isMix = topic.code === 'MIX';

  return <article className={`topic-tile${selected ? ' topic-selected' : ''}${isMix ? ' topic-mix' : ''}`}>
    <button
      className="topic-select"
      aria-pressed={selected}
      onClick={() => onSelect(topic)}
    >
      <div className="topic-top-row">
        <span className="question-pill">5 Questions</span>
        {onSpeak && <button
          className="topic-speaker"
          aria-label={`Hear ${topic.name}`}
          onClick={e => { e.stopPropagation(); onSpeak(topic.name); }}
        >🔊</button>}
      </div>
      <div className={`topic-picture ${topic.color}`}>
        <span role="img" aria-label={topic.name}>{topic.emoji}</span>
      </div>
      <div className="topic-copy">
        <h2>{topic.emoji} {topic.name}</h2>
        {topic.description && <p>{topic.description}</p>}
      </div>
      {selected && <span className="topic-check" aria-label="Selected">✓</span>}
    </button>
  </article>;
}
