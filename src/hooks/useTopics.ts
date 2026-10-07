import { useCallback, useEffect, useState } from 'react';
import { gameApi } from '../api';
import type { Topic } from '../types';

export type TopicsStatus = 'loading' | 'ready' | 'error';

const MIX_TOPIC: Topic = { id: 'MIX', code: 'MIX', name: 'All Topics', description: 'Little surprises from all our friendly worlds!', emoji: '🌈', color: 'lavender' };

/** Loads the topic list from the API once, and again on demand (the "Try again" button). */
export default function useTopics() {
  const [status, setStatus] = useState<TopicsStatus>('loading');
  const [topics, setTopics] = useState<Topic[]>([]);

  const load = useCallback(() => {
    let cancelled = false;
    setStatus('loading');
    gameApi.getTopics()
      .then(result => { if (!cancelled) { setTopics([MIX_TOPIC, ...result]); setStatus('ready'); } })
      .catch(() => { if (!cancelled) setStatus('error'); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => load(), [load]);

  return { status, topics, reload: load };
}
