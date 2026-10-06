/**
 * Real HTTP client for the Java backend (/api/v1).
 * Maps backend DTOs → frontend types. Sends X-Anonymous-Id header on every request.
 * Anonymous player UUID is generated once per browser and persisted in localStorage.
 */
import { ApiError, type GameApi } from './GameApi';
import type { AnswerOutcome, GameResult, GameSession, Topic } from './types';

// --------------------------------------------------------------------------
// Anonymous identity
// --------------------------------------------------------------------------

function getOrCreateAnonymousId(): string {
  const KEY = 'nimokids_anonymous_id';
  try {
    const stored = localStorage.getItem(KEY);
    if (stored) return stored;
  } catch {
    // Private browsing / blocked storage — use a session-only ID.
  }
  const id = crypto.randomUUID();
  try {
    localStorage.setItem(KEY, id);
  } catch {
    /* ignore */
  }
  return id;
}

const anonymousId = getOrCreateAnonymousId();

// --------------------------------------------------------------------------
// HTTP helpers
// --------------------------------------------------------------------------

const BASE = '/api/v1';

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Anonymous-Id': anonymousId,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const json = await res.json().catch(() => null);

  if (!res.ok || json?.status === 'ERROR') {
    const code = json?.error?.code ?? 'INTERNAL_SERVER_ERROR';
    const message = json?.message ?? `HTTP ${res.status}`;
    throw new ApiError(code, message);
  }

  return json.data as T;
}

const get  = <T>(path: string)              => request<T>('GET',  path);
const post = <T>(path: string, body?: unknown) => request<T>('POST', path, body ?? {});

// --------------------------------------------------------------------------
// Backend DTO shapes (only the fields we actually use)
// --------------------------------------------------------------------------

type BackendOption = { id: string; text: string; image: string | null; voice: string | null };
type BackendQuestion = { id: string; questionText: string; questionImage: string | null; options: BackendOption[] };
type BackendQuestionStep = { questionNumber: number; timeLimitSeconds: number; question: BackendQuestion };
type BackendSession = {
  sessionId: string;
  totalQuestions: number;
  currentQuestionNumber: number;
  timeLimitSeconds: number;
  question: BackendQuestion;
};
type BackendAnswerData = {
  result: string;
  score: number;
  currentStreak: number;
  correctAnswer: { id: string; text: string };
  hasNextQuestion: boolean;
  nextQuestion: BackendQuestionStep | null;
};
type BackendResult = {
  totalQuestions: number;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  timeoutAnswers: number;
  accuracy: number;
  maxStreak: number;
};
type BackendTopic = {
  id: string;
  code: string;
  name: string;
  parentId: string | null;
};

// --------------------------------------------------------------------------
// Emoji + color derived from topic code (backend has no emoji/color fields yet)
// --------------------------------------------------------------------------

const TOPIC_META: Record<string, { emoji: string; color: string }> = {
  ANIMALS:     { emoji: '🐶', color: 'peach' },
  FRUITS:      { emoji: '🍎', color: 'pink' },
  VEHICLES:    { emoji: '🚙', color: 'blue' },
  COLORS:      { emoji: '🌈', color: 'lavender' },
  SHAPES:      { emoji: '🔷', color: 'lavender' },
  NUMBERS:     { emoji: '🔢', color: 'yellow' },
  ALPHABET:    { emoji: '🔤', color: 'mint' },
  FOOD:        { emoji: '🍕', color: 'peach' },
  TOYS:        { emoji: '🧸', color: 'yellow' },
  CLOTHES:     { emoji: '👕', color: 'pink' },
  HOME:        { emoji: '🏠', color: 'peach' },
  NATURE:      { emoji: '🌳', color: 'mint' },
  SEA_ANIMALS: { emoji: '🐠', color: 'blue' },
  FARM_ANIMALS:{ emoji: '🐄', color: 'mint' },
};

function mapTopic(t: BackendTopic): Topic {
  const meta = TOPIC_META[t.code] ?? { emoji: '📚', color: 'peach' };
  return { id: t.id, code: t.code, name: t.name, parentId: t.parentId, ...meta };
}

// --------------------------------------------------------------------------
// Mapping helpers
// --------------------------------------------------------------------------

function mapQuestion(q: BackendQuestion) {
  return {
    id: q.id,
    text: q.questionText,
    image: q.questionImage ? { name: q.questionText, emoji: q.questionImage } : null,
    options: q.options.map(o => ({
      id: o.id,
      text: o.text,
      visual: { name: o.text },
    })),
  };
}

function mapStep(step: BackendQuestionStep) {
  return {
    number: step.questionNumber,
    timeLimitSeconds: step.timeLimitSeconds,
    question: mapQuestion(step.question),
  };
}

function mapAnswer(data: BackendAnswerData): AnswerOutcome {
  return {
    result: data.result as AnswerOutcome['result'],
    score: data.score,
    currentStreak: data.currentStreak,
    correctOptionId: data.correctAnswer.id,
    correctText: data.correctAnswer.text,
    next: data.hasNextQuestion && data.nextQuestion ? mapStep(data.nextQuestion) : null,
  };
}

// --------------------------------------------------------------------------
// The game mode is fixed for now — the backend requires it but the UI doesn't expose it.
// --------------------------------------------------------------------------

let cachedModeId: string | null = null;
async function getGuessModeId(): Promise<string> {
  if (cachedModeId) return cachedModeId;
  type ModeDto = { id: string; code: string };
  const modes = await get<ModeDto[]>('/game-modes');
  const guess = modes.find(m => m.code === 'GUESS') ?? modes[0];
  if (!guess) throw new ApiError('INTERNAL_SERVER_ERROR', 'No game mode available');
  cachedModeId = guess.id;
  return cachedModeId;
}

// --------------------------------------------------------------------------
// Implementation
// --------------------------------------------------------------------------

export const httpGameApi: GameApi = {
  async getTopics(): Promise<Topic[]> {
    const topics = await get<BackendTopic[]>('/topics');
    return topics.map(mapTopic);
  },

  async createSession(topicId): Promise<GameSession> {
    const gameModeId = await getGuessModeId();
    const data = await post<BackendSession>('/game-sessions', { topicId, gameModeId });
    return {
      id: data.sessionId,
      totalQuestions: data.totalQuestions,
      first: {
        number: data.currentQuestionNumber,
        timeLimitSeconds: data.timeLimitSeconds,
        question: mapQuestion(data.question),
      },
    };
  },

  async startTimer(sessionId, questionId): Promise<void> {
    await post(`/game-sessions/${sessionId}/timer-start`, { questionId });
  },

  async submitAnswer(sessionId, questionId, optionId): Promise<AnswerOutcome> {
    const data = await post<BackendAnswerData>(
      `/game-sessions/${sessionId}/submit-answer`,
      { questionId, selectedOptionId: optionId },
    );
    return mapAnswer(data);
  },

  async submitTimeout(sessionId, questionId): Promise<AnswerOutcome> {
    const data = await post<BackendAnswerData>(
      `/game-sessions/${sessionId}/timeout`,
      { questionId },
    );
    return mapAnswer(data);
  },

  async getResult(sessionId): Promise<GameResult> {
    return await get<BackendResult>(`/game-sessions/${sessionId}/result`);
  },
};
