import type { Option } from '../../types';

type AnswerCardProps = {
  option: Option;
  /** Colour class: peach, blue, lavender or mint. */
  color: string;
  disabled: boolean;
  /** This card is the right answer (shown after the question is answered). */
  correct: boolean;
  /** This card is the child's wrong pick. */
  wrong: boolean;
  /** Another card was picked or time ran out, so this one is dimmed. */
  dimmed: boolean;
  onClick: () => void;
};

export default function AnswerCard({ option, color, disabled, correct, wrong, dimmed, onClick }: AnswerCardProps) {
  const className = ['answer-card', color, correct && 'correct', wrong && 'wrong', dimmed && 'unselected'].filter(Boolean).join(' ');
  return <button disabled={disabled} onClick={onClick} className={className}>
    <span>{option.text}</span>
    <span className="answer-marker">{correct ? '✓' : wrong ? '×' : ''}</span>
  </button>;
}
