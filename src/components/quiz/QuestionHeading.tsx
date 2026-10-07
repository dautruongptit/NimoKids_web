import type { Feedback } from '../../types';
import Timer from './Timer';

type QuestionHeadingProps = {
  prompt: string;
  index: number;
  total: number;
  seconds: number;
  timeLimit: number;
  feedback: Feedback;
  onSpeak: () => void;
};

export default function QuestionHeading({ prompt, index, total, seconds, timeLimit, feedback, onSpeak }: QuestionHeadingProps) {
  return <div className="question-heading">
    <div className="question-heading-left">
      <div className="question-number">
        <span className="qn-star">⭐</span>
        <span>Question {index + 1} / {total}</span>
      </div>
      <div className="question-prompt-row">
        <span className="question-mark">?</span>
        <h1>{prompt}</h1>
        <button className="tap-to-hear" onClick={onSpeak} type="button">
          🔊 Tap to Hear
        </button>
      </div>
    </div>
    <Timer seconds={seconds} limit={timeLimit} feedback={feedback} />
  </div>;
}
