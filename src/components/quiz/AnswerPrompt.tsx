import { copy } from '../../content/copy';
import type { Feedback } from '../../types';

type AnswerPromptProps = {
  feedback: Feedback;
};

export default function AnswerPrompt({ feedback }: AnswerPromptProps) {
  return <div className="answer-prompt">
    {feedback ? <span className={`feedback-text ${feedback}`} role="status">{copy.feedback[feedback]}</span> : <>Tap your answer <span>↓</span></>}
  </div>;
}
