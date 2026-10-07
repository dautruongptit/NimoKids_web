export type { GameResult, Option, Question, Topic, Visual } from './api/types';

export type Screen = 'splash' | 'home' | 'age' | 'quiz' | 'result';

export type AgeGroup = '1-3' | '4-5';

/** What the quiz screen shows after an answer. null means the question is still open. */
export type Feedback = 'correct' | 'wrong' | 'timeout' | null;
