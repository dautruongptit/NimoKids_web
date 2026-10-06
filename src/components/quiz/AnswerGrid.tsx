import type { Feedback, Option, Question } from '../../types';
import AnswerCard from './AnswerCard';

const CARD_COLORS = ['peach', 'blue', 'lavender', 'mint'];

type AnswerGridProps = {
  question: Question;
  /** Zero-based question index, used to give every card a fresh key per question. */
  index: number;
  feedback: Feedback;
  selectedOptionId: string | null;
  /** Known only after the server has answered. */
  correctOptionId: string | null;
  /** A request is running or the question is fading out: nothing can be tapped. */
  locked: boolean;
  onAnswer: (option: Option) => void;
};

export default function AnswerGrid({ question, index, feedback, selectedOptionId, correctOptionId, locked, onAnswer }: AnswerGridProps) {
  return <div className="answers">
    {question.options.map((option, position) => {
      const correct = !!feedback && option.id === correctOptionId;
      const wrong = !!feedback && selectedOptionId === option.id && !correct;
      return <AnswerCard
        key={`${index}-${option.id}`}
        option={option}
        color={CARD_COLORS[position]}
        disabled={!!feedback || locked}
        correct={correct}
        wrong={wrong}
        dimmed={!!feedback && !correct && !wrong}
        onClick={() => onAnswer(option)}
      />;
    })}
  </div>;
}
