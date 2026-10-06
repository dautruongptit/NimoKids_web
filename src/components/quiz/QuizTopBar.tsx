import ProgressStars from './ProgressStars';

type QuizTopBarProps = {
  /** Zero-based index of the current question. */
  index: number;
  total: number;
  onHome: () => void;
};

export default function QuizTopBar({ index, total, onHome }: QuizTopBarProps) {
  return <div className="quiz-top">
    <button className="back-home" onClick={onHome} aria-label="Return home">⌂ <span>Home</span></button>
    <ProgressStars index={index} total={total} />
    <span className="question-count">⭐ <strong>{index + 1}</strong> / {total}</span>
  </div>;
}
