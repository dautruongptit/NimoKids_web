import { useCallback, useEffect, useState } from 'react';
import { gameApi } from '../api';
import type { Topic } from '../types';

export type TopicsStatus = 'loading' | 'ready' | 'error';

/** Loads the topic list from the API once, and again on demand (the "Try again" button). */
export default function useTopics() {
  const [status, setStatus] = useState<TopicsStatus>('loading');
  const [topics, setTopics] = useState<Topic[]>([]);

  const load = useCallback(() => {
    let cancelled = false;
    setStatus('loading');
    gameApi.getTopics()
      .then(result => { if (!cancelled) { setTopics(result); setStatus('ready'); } })
      .catch(() => { if (!cancelled) setStatus('error'); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => load(), [load]);

  return { status, topics, reload: load };
}
