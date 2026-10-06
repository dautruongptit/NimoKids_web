export type { GameResult, Option, Question, Topic, Visual } from './api/types';

export type Screen = 'splash' | 'home' | 'quiz' | 'result';

/** What the quiz screen shows after an answer. null means the question is still open. */
export type Feedback = 'correct' | 'wrong' | 'timeout' | null;
