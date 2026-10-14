import type { ExponentNumberLike } from 'exponential-number';

import type { STAT_DATA } from './stat.const';

export type StatKey = keyof typeof STAT_DATA;

export type StatFormat = 'duration' | 'number';

export interface StatData {
  name: string;
  format: StatFormat;
  isResetOnPrestige: boolean;
}

export type SavedStatValues = Partial<Record<string, ExponentNumberLike>>;

export interface SavedStats {
  startedAt: number | null;
  counters: SavedStatValues;
  resourcesEarned: SavedStatValues;
  resourcesSpent: SavedStatValues;
}
