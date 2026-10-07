import { useEffect, useRef, useState } from 'react';
import { gameApi } from '../api';
import type { AnswerResult, GameSession, QuestionStep } from '../api';
import { FEEDBACK_MS, SPLASH_MS, TRANSITION_MS } from '../constants';
import { copy } from '../content/copy';
import type { AgeGroup, Feedback, GameResult, Option, Question, Screen, Topic } from '../types';

type Speech = {
  say: (text: string, onEnded?: () => void) => void;
  cancel: () => void;
};

/** A failed call, with what to do when the child (or parent) taps "Try again". */
export type GameError = { message: string; retry: () => void };

const FEEDBACK_OF: Record<AnswerResult, Exclude<Feedback, null>> = {
  CORRECT: 'correct',
  WRONG: 'wrong',
  TIMEOUT: 'timeout',
};

/**
 * Game state and timers of a round. The browser only presents the game: the questions, the right answer, the
 * score, the streak and the final result all come from `gameApi` (the server decides, the UI displays).
 * The countdown starts when the question audio ends (the server is told) and is a visual aid; when it reaches 0 the hook reports a timeout to the API.
 */
export default function useQuizGame({ topics, say, cancel }: Speech & { topics: Topic[] }) {
  const [screen, setScreen] = useState<Screen>('splash');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [selectedAge, setSelectedAge] = useState<AgeGroup | null>(null);
  const [session, setSession] = useState<GameSession | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [index, setIndex] = useState(0);
  const [timeLimit, setTimeLimit] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [correctOptionId, setCorrectOptionId] = useState<string | null>(null);
  const [nextStep, setNextStep] = useState<QuestionStep | null>(null);
  const [result, setResult] = useState<GameResult | null>(null);
  const [starting, setStarting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  /** The countdown only runs once the question audio has ended. */
  const [timerRunning, setTimerRunning] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [error, setError] = useState<GameError | null>(null);
  const locked = useRef(false);
  /** Bumped when a round is abandoned, so a late API response cannot revive it. */
  const round = useRef(0);

  // Until the child picks one, the first topic of the list is selected.
  const topic = topics.find(item => item.id === selectedTopicId) ?? topics[0];

  useEffect(() => { const timeout = setTimeout(() => setScreen('home'), SPLASH_MS); return () => clearTimeout(timeout); }, []);

  /** Reads the question aloud; the countdown starts when the audio ends. Ignored if the round changed meanwhile. */
  function presentQuestion(sessionId: string, questionId: string, text: string, current: number) {
    setTimerRunning(false);
    say(text, () => {
      if (current !== round.current) return;
      setTimerRunning(true);
      gameApi.startTimer(sessionId, questionId).catch(() => {});
    });
  }

  function selectTopic(item: Topic) {
    setSelectedTopicId(item.id);
    say(item.name);
  }

  function selectAge(age: AgeGroup) {
    setSelectedAge(age);
    setScreen('home');
  }

  function goAge() {
    setScreen('age');
  }

  async function start() {
    if (!topic || starting) return;
    if (!selectedAge) { goAge(); return; }
    const current = ++round.current;
    setStarting(true);
    setError(null);
    try {
      const created = await gameApi.createSession(topic.id);
      if (current !== round.current) return;
      setSession(created);
      setQuestion(created.first.question);
      setIndex(created.first.number - 1);
      setTimeLimit(created.first.timeLimitSeconds);
      setSeconds(created.first.timeLimitSeconds);
      setFeedback(null); setSelectedOptionId(null); setCorrectOptionId(null); setNextStep(null); setResult(null);
      locked.current = false; setSubmitting(false); setTransitioning(false); setScreen('quiz');
      presentQuestion(created.id, created.first.question.id, copy.speech.start(created.first.question.text), current);
    } catch {
      if (current === round.current) setError({ message: copy.errors.start, retry: start });
    } finally {
      if (current === round.current) setStarting(false);
    }
  }

  /** `option` is the child's pick, or null when time ran out. */
  async function answer(option: Option | null) {
    if (locked.current || transitioning || !session || !question) return;
    locked.current = true;
    const current = round.current;
    setSubmitting(true);
    setError(null);
    try {
      const outcome = option
        ? await gameApi.submitAnswer(session.id, question.id, option.id)
        : await gameApi.submitTimeout(session.id, question.id);
      if (current !== round.current) return;
      setSelectedOptionId(option?.id ?? null);
      setCorrectOptionId(outcome.correctOptionId);
      setNextStep(outcome.next);
      setFeedback(FEEDBACK_OF[outcome.result]);
      setTimerRunning(false);
      say(outcome.result === 'CORRECT' ? copy.speech.correct : copy.speech.wrong(outcome.correctText));
    } catch {
      if (current === round.current) {
        // Unlock so the child can simply tap again; the retry button repeats the same pick.
        locked.current = false;
        setError({ message: copy.errors.answer, retry: () => answer(option) });
      }
    } finally {
      if (current === round.current) setSubmitting(false);
    }
  }

  function goHome() {
    round.current += 1;
    locked.current = true;
    setScreen('home'); setFeedback(null); setTimerRunning(false); setTransitioning(false); setSubmitting(false); setStarting(false); setError(null);
    cancel();
  }

  function goHomeFromAge() {
    setScreen('home');
  }

  // Countdown: one tick per second while a question is open and no request is in flight.
  useEffect(() => {
    if (screen !== 'quiz' || !timerRunning || feedback || transitioning || submitting) return;
    const interval = setInterval(() => setSeconds(value => Math.max(0, value - 1)), 1000);
    return () => clearInterval(interval);
  }, [screen, index, timerRunning, feedback, transitioning, submitting]);

  // Time is up: report it as a timeout.
  useEffect(() => { if (screen === 'quiz' && timerRunning && seconds === 0 && !feedback && !transitioning && !submitting) answer(null); }, [seconds, screen, timerRunning, feedback, transitioning, submitting]);

  // After the feedback pause: fetch the final result after the last question, otherwise fade the question out.
  useEffect(() => {
    if (!feedback || screen !== 'quiz' || !session) return;
    const current = round.current;
    const timeout = setTimeout(() => {
      if (nextStep) { setTransitioning(true); return; }
      const showResult = () => gameApi.getResult(session.id)
        .then(finalResult => {
          if (current !== round.current) return;
          setError(null); setResult(finalResult); setScreen('result'); say(copy.speech.finished);
        })
        .catch(() => { if (current === round.current) setError({ message: copy.errors.result, retry: showResult }); });
      showResult();
    }, FEEDBACK_MS);
    return () => clearTimeout(timeout);
  }, [feedback, screen, index, session, nextStep]);

  // After the fade-out: show the next question that came with the last answer.
  useEffect(() => {
    if (!transitioning || !nextStep) return;
    const timeout = setTimeout(() => {
      setIndex(nextStep.number - 1); setQuestion(nextStep.question); setTimeLimit(nextStep.timeLimitSeconds); setSeconds(nextStep.timeLimitSeconds);
      setSelectedOptionId(null); setCorrectOptionId(null); setFeedback(null); setNextStep(null); locked.current = false; setTransitioning(false);
      if (session) presentQuestion(session.id, nextStep.question.id, nextStep.question.text, round.current);
    }, TRANSITION_MS);
    return () => clearTimeout(timeout);
  }, [transitioning, nextStep, session]);

  return {
    screen, topic, selectedAge, question, index, total: session?.totalQuestions ?? 0, timeLimit, seconds, feedback,
    selectedOptionId, correctOptionId, result, starting, submitting, transitioning, error,
    selectTopic, selectAge, start, answer, goHome, goHomeFromAge,
  };
}
