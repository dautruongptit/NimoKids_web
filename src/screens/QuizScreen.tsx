import ErrorNotice from '../components/common/ErrorNotice';
import AnswerGrid from '../components/quiz/AnswerGrid';
import AnswerPrompt from '../components/quiz/AnswerPrompt';
import Confetti from '../components/quiz/Confetti';
import QuestionHeading from '../components/quiz/QuestionHeading';
import QuestionImage from '../components/quiz/QuestionImage';
import QuizBuddy from '../components/quiz/QuizBuddy';
import QuizTopBar from '../components/quiz/QuizTopBar';
import type { GameError } from '../hooks/useQuizGame';
import type { Feedback, Option, Question } from '../types';

type QuizScreenProps = {
  question: Question;
  /** Zero-based index of the current question. */
  index: number;
  total: number;
  seconds: number;
  timeLimit: number;
  feedback: Feedback;
  selectedOptionId: string | null;
  correctOptionId: string | null;
  /** The question is fading out to make room for the next one. */
  transitioning: boolean;
  /** An answer is being sent to the server. */
  submitting: boolean;
  error: GameError | null;
  onAnswer: (option: Option) => void;
  onHome: () => void;
  onSpeak: (text: string) => void;
};

export default function QuizScreen({ question, index, total, seconds, timeLimit, feedback, selectedOptionId, correctOptionId, transitioning, submitting, error, onAnswer, onHome, onSpeak }: QuizScreenProps) {
  return <main className="quiz-content">
    <QuizTopBar index={index} total={total} onHome={onHome} />
    <section className={`question-card ${transitioning ? 'transitioning' : ''}`}>
      <QuestionHeading prompt={question.text} index={index} total={total} seconds={seconds} timeLimit={timeLimit} feedback={feedback} onSpeak={() => onSpeak(question.text)} />
      {question.image && <QuestionImage key={index} image={question.image} />}
      <AnswerPrompt feedback={feedback} />
      <AnswerGrid question={question} index={index} feedback={feedback} selectedOptionId={selectedOptionId} correctOptionId={correctOptionId} locked={transitioning || submitting} onAnswer={onAnswer} />
      {error && <ErrorNotice message={error.message} onRetry={error.retry} />}
      {feedback === 'correct' && <Confetti />}
    </section>
    <QuizBuddy feedback={feedback} />
  </main>;
}
