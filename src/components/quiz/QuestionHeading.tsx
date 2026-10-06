import type { Feedback } from '../../types';
import SoundButton from '../common/SoundButton';
import Timer from './Timer';

type QuestionHeadingProps = {
  prompt: string;
  seconds: number;
  timeLimit: number;
  feedback: Feedback;
  onSpeak: () => void;
};

export default function QuestionHeading({ prompt, seconds, timeLimit, feedback, onSpeak }: QuestionHeadingProps) {
  return <div className="question-heading">
    <div><span className="eyebrow">LET'S LOOK CLOSELY</span><h1>{prompt} <SoundButton onClick={onSpeak} /></h1></div>
    <Timer seconds={seconds} limit={timeLimit} feedback={feedback} />
  </div>;
}
