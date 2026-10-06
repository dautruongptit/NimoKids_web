import { copy } from '../../content/copy';
import type { Feedback } from '../../types';
import Bear from '../common/Bear';

type QuizBuddyProps = {
  feedback: Feedback;
};

/** The bear that cheers the child on; its face and words follow the latest feedback. */
export default function QuizBuddy({ feedback }: QuizBuddyProps) {
  const mood = feedback === 'correct' ? 'celebrating' : feedback === 'timeout' ? 'surprised' : 'happy';
  const headline = feedback === 'correct' ? copy.buddy.correct : feedback ? copy.buddy.answered : copy.buddy.open;
  const subline = feedback ? copy.buddy.comingNext : copy.buddy.cheering;
  return <div className="quiz-buddy">
    <Bear mood={mood} />
    <div><strong>{headline}</strong><span>{subline}</span></div>
    <span className="buddy-heart">♡</span>
  </div>;
}
