import type { AnswerOutcome, GameResult, GameSession, Topic } from './types';

/**
 * Everything the game needs from "the server". Two implementations are planned:
 * - mockGameApi: in-memory, reads src/mocks/*.json (used today)
 * - an HTTP client for the Java backend (/api/v1/...), sending the X-Anonymous-Id header
 *
 * The server decides correctness, score, streak and timeout. The UI must never compute them.
 */
export interface GameApi {
  getTopics(): Promise<Topic[]>;
  createSession(topicId: string): Promise<GameSession>;
  /** Tells the server the question audio has ended and the countdown has started (the server still enforces the deadline). */
  startTimer(sessionId: string, questionId: string): Promise<void>;
  submitAnswer(sessionId: string, questionId: string, optionId: string): Promise<AnswerOutcome>;
  submitTimeout(sessionId: string, questionId: string): Promise<AnswerOutcome>;
  getResult(sessionId: string): Promise<GameResult>;
}

/** Same stable codes as the backend error envelope (VALIDATION_ERROR, SESSION_NOT_FOUND, ...). */
export class ApiError extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
  }
}
