/**
 * Data the UI works with. The UI never sees raw backend DTOs: a (future) HTTP client maps them to these types.
 *
 * CONTRACT GAPS to settle when connecting the Java backend (project_master_context.md is the source of truth):
 * - Topic: the backend has no `emoji` / `color`; derive them on the client from `code` or add fields.
 * - Question: the backend has `questionText` but NO question picture; `image` stays null until it has one.
 * - Option: the backend sends `image` (URL) and `voice`; the UI also needs an emoji fallback when `image` is null.
 */

/** Something to draw: an emoji for now, an image URL once the backend provides pictures. */
export type Visual = { name: string; emoji?: string; imageUrl?: string };

export type Topic = { id: string; code: string; name: string; emoji: string; color: string; parentId?: string | null };

export type Option = { id: string; text: string; visual: Visual };

export type Question = {
  id: string;
  /** Prompt shown to the child, e.g. "What is this?" */
  text: string;
  /** Big picture of the question, or null when the question has none. */
  image: Visual | null;
  options: Option[];
};

/** One step of a game: which question number it is and how long the child has. */
export type QuestionStep = { number: number; timeLimitSeconds: number; question: Question };

export type GameSession = { id: string; totalQuestions: number; first: QuestionStep };

export type AnswerResult = 'CORRECT' | 'WRONG' | 'TIMEOUT';

/** Everything the server decided about one answer (or timeout). The UI only displays it. */
export type AnswerOutcome = {
  result: AnswerResult;
  score: number;
  currentStreak: number;
  correctOptionId: string;
  correctText: string;
  /** The next question, or null after the last one. */
  next: QuestionStep | null;
};

export type GameResult = {
  totalQuestions: number;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  timeoutAnswers: number;
  /** Percentage 0-100. */
  accuracy: number;
  maxStreak: number;
};
