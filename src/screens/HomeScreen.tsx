import Button from '../components/common/Button';
import ErrorNotice from '../components/common/ErrorNotice';
import TopicSection from '../components/home/TopicSection';
import WelcomeHero from '../components/home/WelcomeHero';
import Footer from '../components/layout/Footer';
import type { GameError } from '../hooks/useQuizGame';
import type { TopicsStatus } from '../hooks/useTopics';
import type { AgeGroup, Topic } from '../types';

type HomeScreenProps = {
  topicsStatus: TopicsStatus;
  topics: Topic[];
  selectedTopic: Topic | undefined;
  selectedAge: AgeGroup | null;
  starting: boolean;
  error: GameError | null;
  onSelectTopic: (topic: Topic) => void;
  onReloadTopics: () => void;
  onStart: () => void;
  onSpeak?: (text: string) => void;
};

export default function HomeScreen({ topicsStatus, topics, selectedTopic, selectedAge, starting, error, onSelectTopic, onReloadTopics, onStart, onSpeak }: HomeScreenProps) {
  return <main className="home-content">
    <WelcomeHero onPlay={onStart} />

    <div className="info-banner">
      <span className="info-icon">🌟</span>
      <div>
        <strong>No pressure, just exploration!</strong>
        <p>No accounts. No complicated steps. Just a little learning and a lot of fun.</p>
      </div>
      <span className="info-stars">☆ ☆ ☆</span>
    </div>

    <TopicSection
      status={topicsStatus}
      topics={topics}
      selected={selectedTopic}
      onSelect={onSelectTopic}
      onRetry={onReloadTopics}
      onSpeak={onSpeak}
    />
    {error && <div className="home-error"><ErrorNotice message={error.message} onRetry={error.retry} /></div>}
    <Footer variant="home" />

    {selectedTopic && <div className="play-dock">
      <div className="dock-inner">
        <div className="selected-topic">
          <span>{selectedTopic.emoji}</span>
          <div>
            <small>Selected:</small>
            <strong>{selectedTopic.name}</strong>
          </div>
        </div>
        <Button onClick={onStart} disabled={starting} aria-busy={starting || undefined}>
          {selectedAge ? "Let's Play! 🚀" : 'Choose Age 🎈'}
        </Button>
      </div>
    </div>}
  </main>;
}
