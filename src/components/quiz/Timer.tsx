import { TIMER_CIRCUMFERENCE } from '../../constants';
import type { Feedback } from '../../types';

type TimerProps = {
  seconds: number;
  /** Seconds the question started with (from the server), so the ring empties from full to zero. */
  limit: number;
  feedback: Feedback;
};

/** Countdown ring. Display only: the server decides whether an answer arrived in time. */
export default function Timer({ seconds, limit, feedback }: TimerProps) {
  const filled = limit > 0 ? seconds / limit * TIMER_CIRCUMFERENCE : 0;
  return <div className={`timer ${seconds <= 2 && !feedback ? 'warning' : ''}`} aria-label={`${seconds} seconds remaining`}>
    <svg viewBox="0 0 72 72"><circle cx="36" cy="36" r="30" className="timer-track" /><circle cx="36" cy="36" r="30" className="timer-ring" strokeDasharray={`${filled} ${TIMER_CIRCUMFERENCE}`} /></svg>
    <span>{seconds}</span>
    <small>seconds</small>
  </div>;
}
