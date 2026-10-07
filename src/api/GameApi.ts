import type { AnswerOutcome, GameResult, GameSession, Topic } from './types';

/** Backend age-group enum values. */
export type BackendAgeGroup = 'AGE_1_3' | 'AGE_4_5';

export type CreateSessionParams = {
  /** null = MIX mode (all topics). */
  topicId: string | null;
  ageGroup: BackendAgeGroup;
};

/**
 * Everything the game needs from "the server".
 * The server decides correctness, score, streak and timeout. The UI must never compute them.
 */
export interface GameApi {
  getTopics(): Promise<Topic[]>;
  createSession(params: CreateSessionParams): Promise<GameSession>;
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
