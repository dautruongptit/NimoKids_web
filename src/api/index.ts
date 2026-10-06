import type { GameApi } from './GameApi';
import { httpGameApi } from './httpGameApi';
import { mockGameApi } from './mockGameApi';

/**
 * The one place that decides where game data comes from.
 * VITE_USE_MOCK=true  → in-browser mock (no backend needed, good for UI-only work)
 * default             → real HTTP client talking to the Java backend at /api/v1
 */
const useMock = import.meta.env.VITE_USE_MOCK === 'true';
export const gameApi: GameApi = useMock ? mockGameApi : httpGameApi;

export { ApiError } from './GameApi';
export type { GameApi } from './GameApi';
export * from './types';
