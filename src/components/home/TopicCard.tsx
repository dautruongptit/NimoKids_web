import type { Topic } from '../../types';

type TopicCardProps = {
  topic: Topic;
  selected: boolean;
  onSelect: (topic: Topic) => void;
  onSpeak?: (name: string) => void;
};

export default function TopicCard({ topic, selected, onSelect, onSpeak }: TopicCardProps) {
  return <article className={`topic-tile ${selected ? 'topic-selected' : ''}`}>
    <button
      className="topic-select"
      aria-pressed={selected}
      onClick={() => onSelect(topic)}
    >
      <span className="question-pill">5 Questions</span>
      <div className={`topic-picture ${topic.color}`}>
        <span role="img" aria-label={topic.name}>{topic.emoji}</span>
      </div>
      <div className="topic-copy">
        <h2>{topic.emoji} {topic.name}</h2>
      </div>
      {selected && <span className="topic-check" aria-label="Selected">✓</span>}
    </button>
    {onSpeak && <button
      className="topic-speaker"
      aria-label={`Hear ${topic.name}`}
      onClick={() => onSpeak(topic.name)}
    >🔊</button>}
  </article>;
}
