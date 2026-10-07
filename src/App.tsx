import Scenery from './components/common/Scenery';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import useQuizGame from './hooks/useQuizGame';
import useSpeech from './hooks/useSpeech';
import useTopics from './hooks/useTopics';
import AgeScreen from './screens/AgeScreen';
import HomeScreen from './screens/HomeScreen';
import QuizScreen from './screens/QuizScreen';
import ResultScreen from './screens/ResultScreen';
import SplashScreen from './screens/SplashScreen';

export default function App() {
  const { muted, say, cancel, toggleMute } = useSpeech();
  const { status: topicsStatus, topics, reload: reloadTopics } = useTopics();
  const game = useQuizGame({ topics, say, cancel });
  const { screen, topic, selectedAge, question, result } = game;

  return <div className={`app ${screen}`}>
    <Scenery />
    {screen !== 'splash' && <Header topic={screen === 'quiz' ? topic : undefined} muted={muted} onHome={game.goHome} onToggleMute={toggleMute} />}

    {screen === 'splash' && <SplashScreen />}
    {screen === 'home' && <HomeScreen topicsStatus={topicsStatus} topics={topics} selectedTopic={topic} selectedAge={selectedAge} starting={game.starting} error={game.error} onSelectTopic={game.selectTopic} onReloadTopics={reloadTopics} onStart={game.start} onSpeak={say} />}
    {screen === 'age' && <AgeScreen onSelectAge={game.selectAge} onBack={game.goHomeFromAge} />}
    {screen === 'quiz' && question && <QuizScreen question={question} index={game.index} total={game.total} seconds={game.seconds} timeLimit={game.timeLimit} feedback={game.feedback} selectedOptionId={game.selectedOptionId} correctOptionId={game.correctOptionId} transitioning={game.transitioning} submitting={game.submitting} error={game.error} onAnswer={game.answer} onHome={game.goHome} onSpeak={say} />}
    {screen === 'result' && topic && result && <ResultScreen topic={topic} result={result} onPlayAgain={game.start} onHome={game.goHome} />}

    {screen !== 'home' && screen !== 'age' && screen !== 'splash' && <Footer variant="game" />}
  </div>;
}
