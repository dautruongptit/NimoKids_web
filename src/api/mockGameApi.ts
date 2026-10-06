import { QUESTIONS_PER_GAME, SECONDS_PER_QUESTION } from '../constants';
import questionBank from '../mocks/questionBank.json';
import topicsJson from '../mocks/topics.json';
import { ApiError, type GameApi } from './GameApi';
import type { AnswerOutcome, AnswerResult, GameResult, GameSession, Question, QuestionStep, Topic } from './types';

/**
 * A fake backend that lives in the browser, for developing the UI without the Java API.
 * It plays the server's role: it creates the questions, keeps the correct answers to itself, validates every
 * request with the same error codes as the real API and computes score, streak and the final result.
 *
 * Dev switches (Vite env, e.g. in a .env file):
 *   VITE_MOCK_LATENCY_MS  fake network delay, default 150. Use 0 for instant responses (tests).
 *   VITE_MOCK_FAIL        topics | session | answer | result: make that call fail, to see the error UI.
 */
const LATENCY_MS = Number(import.meta.env.VITE_MOCK_LATENCY_MS ?? 150);
const FAIL = String(import.meta.env.VITE_MOCK_FAIL ?? '');

type BankItem = { name: string; emoji: string };
type Bank = Record<string, { prompt: string; items: BankItem[] }>;

type ServerQuestion = { question: Question; correctOptionId: string; answered: boolean };
type ServerSession = {
  id: string;
  questions: ServerQuestion[];
  current: number;
  correct: number;
  wrong: number;
  timeout: number;
  streak: number;
  maxStreak: number;
  completed: boolean;
};

const sessions = new Map<string, ServerSession>();
let sequence = 0;
// Not crypto.randomUUID(): it does not exist on plain-http pages (e.g. a phone opening the LAN address).
const nextId = (prefix: string) => `${prefix}-${++sequence}`;

const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - .5);
const wait = () => (LATENCY_MS > 0 ? new Promise<void>(resolve => setTimeout(resolve, LATENCY_MS)) : Promise.resolve());

function failIf(call: string) {
  if (FAIL === call) throw new ApiError('INTERNAL_SERVER_ERROR', `Mock failure for "${call}"`);
}

function buildQuestions(code: string): ServerQuestion[] {
  const bank = (questionBank as Bank)[code];
  const answers = shuffle(bank.items).slice(0, QUESTIONS_PER_GAME);
  return answers.map(answer => {
    const choices = shuffle([answer, ...shuffle(bank.items.filter(item => item.name !== answer.name)).slice(0, 3)]);
    const options = choices.map(item => ({ id: nextId('option'), text: item.name, visual: { name: item.name, emoji: item.emoji } }));
    return {
      question: { id: nextId('question'), text: bank.prompt, image: { name: answer.name, emoji: answer.emoji }, options },
      correctOptionId: options[choices.indexOf(answer)].id,
      answered: false,
    };
  });
}

function stepOf(session: ServerSession, position: number): QuestionStep {
  return { number: position + 1, timeLimitSeconds: SECONDS_PER_QUESTION, question: session.questions[position].question };
}

/** Same checks as GameSessionServiceImpl: ownership is implicit here, state and question are validated. */
function openQuestion(sessionId: string, questionId: string) {
  const session = sessions.get(sessionId);
  if (!session) throw new ApiError('SESSION_NOT_FOUND', 'Game session not found');
  if (session.completed) throw new ApiError('SESSION_ALREADY_COMPLETED', 'Game session has already been completed');
  const current = session.questions[session.current];
  const known = session.questions.find(entry => entry.question.id === questionId);
  if (!known) throw new ApiError('QUESTION_NOT_FOUND', 'Question not found');
  if (known.answered) throw new ApiError('QUESTION_ALREADY_ANSWERED', 'Question has already been answered');
  if (known !== current) throw new ApiError('QUESTION_NOT_FOUND', 'Question is not the current question of this session');
  return { session, current };
}

function settle(session: ServerSession, current: ServerQuestion, result: AnswerResult): AnswerOutcome {
  current.answered = true;
  if (result === 'CORRECT') {
    session.correct += 1;
    session.streak += 1;
    session.maxStreak = Math.max(session.maxStreak, session.streak);
  } else {
    if (result === 'WRONG') session.wrong += 1; else session.timeout += 1;
    session.streak = 0;
  }
  const hasNext = session.current < session.questions.length - 1;
  if (hasNext) session.current += 1; else session.completed = true;
  const correctOption = current.question.options.find(option => option.id === current.correctOptionId)!;
  return {
    result,
    score: session.correct,
    currentStreak: session.streak,
    correctOptionId: correctOption.id,
    correctText: correctOption.text,
    next: hasNext ? stepOf(session, session.current) : null,
  };
}

export const mockGameApi: GameApi = {
  async getTopics() {
    await wait();
    failIf('topics');
    return topicsJson as Topic[];
  },

  async createSession(topicId): Promise<GameSession> {
    await wait();
    failIf('session');
    const topic = (topicsJson as Topic[]).find(entry => entry.id === topicId);
    if (!topic) throw new ApiError('RESOURCE_NOT_FOUND', `Topic not found: ${topicId}`);
    const session: ServerSession = {
      id: nextId('session'), questions: buildQuestions(topic.code), current: 0,
      correct: 0, wrong: 0, timeout: 0, streak: 0, maxStreak: 0, completed: false,
    };
    sessions.set(session.id, session);
    return { id: session.id, totalQuestions: session.questions.length, first: stepOf(session, 0) };
  },

  async startTimer(sessionId, questionId) {
    await wait();
    openQuestion(sessionId, questionId);
  },

  async submitAnswer(sessionId, questionId, optionId) {
    await wait();
    failIf('answer');
    const { session, current } = openQuestion(sessionId, questionId);
    const picked = current.question.options.find(option => option.id === optionId);
    if (!picked) throw new ApiError('INVALID_OPTION', 'Invalid option');
    return settle(session, current, picked.id === current.correctOptionId ? 'CORRECT' : 'WRONG');
  },

  async submitTimeout(sessionId, questionId) {
    await wait();
    failIf('answer');
    const { session, current } = openQuestion(sessionId, questionId);
    return settle(session, current, 'TIMEOUT');
  },

  async getResult(sessionId): Promise<GameResult> {
    await wait();
    failIf('result');
    const session = sessions.get(sessionId);
    if (!session) throw new ApiError('SESSION_NOT_FOUND', 'Game session not found');
    if (!session.completed) throw new ApiError('SESSION_NOT_ACTIVE', 'Session is not completed');
    const total = session.questions.length;
    return {
      totalQuestions: total,
      score: session.correct,
      correctAnswers: session.correct,
      wrongAnswers: session.wrong,
      timeoutAnswers: session.timeout,
      accuracy: Math.round(session.correct * 10000 / total) / 100,
      maxStreak: session.maxStreak,
    };
  },
};
