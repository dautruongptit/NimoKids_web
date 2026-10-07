import ProgressStars from './ProgressStars';

type QuizTopBarProps = {
  index: number;
  total: number;
  onHome: () => void;
};

export default function QuizTopBar({ index, total, onHome }: QuizTopBarProps) {
  return <div className="quiz-top">
    <button className="back-home" onClick={onHome} aria-label="Return home">
      <span className="quiz-logo">guessGame</span>
      <small>PLAY &amp; LEARN</small>
    </button>
    <ProgressStars index={index} total={total} />
    <span className="question-count">⭐ <strong>{index + 1}</strong> / {total}</span>
  </div>;
}
