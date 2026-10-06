import ResultCard from '../components/result/ResultCard';
import type { GameResult, Topic } from '../types';

type ResultScreenProps = {
  topic: Topic;
  result: GameResult;
  onPlayAgain: () => void;
  onHome: () => void;
};

export default function ResultScreen({ topic, result, onPlayAgain, onHome }: ResultScreenProps) {
  return <main className="result-content">
    <ResultCard topic={topic} result={result} onPlayAgain={onPlayAgain} onHome={onHome} />
  </main>;
}
