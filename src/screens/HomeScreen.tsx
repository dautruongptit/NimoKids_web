import Button from '../components/common/Button';
import ErrorNotice from '../components/common/ErrorNotice';
import TopicSection from '../components/home/TopicSection';
import WelcomeHero from '../components/home/WelcomeHero';
import Footer from '../components/layout/Footer';
import type { GameError } from '../hooks/useQuizGame';
import type { TopicsStatus } from '../hooks/useTopics';
import type { Topic } from '../types';

type HomeScreenProps = {
  topicsStatus: TopicsStatus;
  topics: Topic[];
  selectedTopic: Topic | undefined;
  /** True while the new game is being created on the server. */
  starting: boolean;
  /** Failure to start the game, if any. */
  error: GameError | null;
  onSelectTopic: (topic: Topic) => void;
  onReloadTopics: () => void;
  onStart: () => void;
};

export default function HomeScreen({ topicsStatus, topics, selectedTopic, starting, error, onSelectTopic, onReloadTopics, onStart }: HomeScreenProps) {
  return <main className="home-content">
    <WelcomeHero />
    <TopicSection status={topicsStatus} topics={topics} selected={selectedTopic} onSelect={onSelectTopic} onRetry={onReloadTopics} />
    <div className="play-area">
      <Button className="play-button" onClick={onStart} disabled={!selectedTopic || starting} aria-busy={starting || undefined}><span className="play-icon">▶</span> Let's play! <span className="button-sparkle">✦</span></Button>
      {error && <ErrorNotice message={error.message} onRetry={error.retry} />}
      <p>5 little questions. So much fun!</p>
    </div>
    <Footer variant="home" />
  </main>;
}
