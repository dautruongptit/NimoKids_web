import { copy } from '../../content/copy';
import type { TopicsStatus } from '../../hooks/useTopics';
import type { Topic } from '../../types';
import ErrorNotice from '../common/ErrorNotice';
import TopicCard from './TopicCard';

type TopicSectionProps = {
  status: TopicsStatus;
  topics: Topic[];
  selected: Topic | undefined;
  onSelect: (topic: Topic) => void;
  onRetry: () => void;
};

export default function TopicSection({ status, topics, selected, onSelect, onRetry }: TopicSectionProps) {
  return <section className="topic-section" aria-labelledby="topic-title">
    <div className="section-heading"><h2 id="topic-title">Pick your little adventure <span>↴</span></h2>{status === 'ready' && <span>{topics.length} worlds to explore</span>}</div>
    {status === 'loading' && <p className="topic-status" role="status">{copy.loadingTopics}</p>}
    {status === 'error' && <ErrorNotice message={copy.errors.topics} onRetry={onRetry} />}
    {status === 'ready' && <div className="topic-grid">
      {topics.map(topic => <TopicCard key={topic.id} topic={topic} selected={selected?.id === topic.id} onSelect={onSelect} />)}
    </div>}
  </section>;
}
