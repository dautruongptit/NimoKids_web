import type { GameApi } from './GameApi';
import { mockGameApi } from './mockGameApi';

/**
 * The one place that decides where game data comes from.
 * To use the Java backend, add an HTTP implementation of GameApi (map the /api/v1 DTOs to ./types and send the
 * X-Anonymous-Id header) and export it here instead of the mock. Nothing else in the app has to change.
 */
export const gameApi: GameApi = mockGameApi;

export { ApiError } from './GameApi';
export type { GameApi } from './GameApi';
export * from './types';
