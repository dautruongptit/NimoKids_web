import type { Topic } from '../../types';

type TopicCardProps = {
  topic: Topic;
  selected: boolean;
  onSelect: (topic: Topic) => void;
};

export default function TopicCard({ topic, selected, onSelect }: TopicCardProps) {
  return <button className={`topic-card ${topic.color} ${selected ? 'chosen' : ''}`} onClick={() => onSelect(topic)} aria-pressed={selected}>
    <span className="topic-illustration">{topic.emoji}</span>
    <span className="topic-name">{topic.name}</span>
    {selected && <span className="selected-check">✓</span>}
    <span className="topic-sparkle" aria-hidden="true">✧</span>
  </button>;
}
