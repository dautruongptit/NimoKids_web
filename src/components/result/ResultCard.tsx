import { copy } from '../../content/copy';
import type { GameResult, Topic } from '../../types';
import Bear from '../common/Bear';
import Button from '../common/Button';

type ResultCardProps = {
  topic: Topic;
  /** Final numbers as reported by the server. */
  result: GameResult;
  onPlayAgain: () => void;
  onHome: () => void;
};

export default function ResultCard({ topic, result, onPlayAgain, onHome }: ResultCardProps) {
  const { score, totalQuestions, maxStreak, accuracy } = result;
  return <div className="result-card">
    <span className="eyebrow">A LITTLE ADVENTURE, A BIG HIGH FIVE!</span>
    <div className="result-bear"><span>✦</span><Bear mood="celebrating" /><span>✦</span></div>
    <h1>{score >= copy.result.greatFromScore ? copy.result.great : copy.result.encourage}</h1>
    <p>Every little discovery deserves a celebration.</p>
    <div className="result-stars" aria-label={`${score} stars earned`}>
      {Array.from({ length: totalQuestions }, (_, position) => <span className={position < score ? 'earned' : ''} key={position}>★</span>)}
    </div>
    <div className="result-score"><strong>{score}</strong> / {totalQuestions} little discoveries</div>
    <div className="result-stats"><span>🔥 <strong>{maxStreak}</strong> best streak</span><span>🎯 <strong>{Math.round(accuracy)}%</strong> accuracy</span></div>
    <Button onClick={onPlayAgain}>↻ &nbsp; Play again!</Button>
    <Button variant="secondary" onClick={onHome}>⌂ &nbsp; Pick a new adventure</Button>
    <span className="result-topic">{topic.emoji} More fun with {topic.name.toLowerCase()}</span>
  </div>;
}
