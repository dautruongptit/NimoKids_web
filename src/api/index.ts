import { httpGameApi } from './httpGameApi';

export const gameApi = httpGameApi;

export { ApiError } from './GameApi';
export type { BackendAgeGroup, CreateSessionParams, GameApi } from './GameApi';
export * from './types';
