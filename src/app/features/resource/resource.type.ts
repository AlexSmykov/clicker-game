import type { ExponentNumber, ExponentNumberLike } from 'exponential-number';

import type { RESOURCE_DATA } from './resource.const';

export type ResourceKey = keyof typeof RESOURCE_DATA;

export interface ResourceData {
  name: string;
  iconPath: string;
  color: string;
  isDefaultUnlocked: boolean;
  isResetOnPrestige: boolean;
}

export interface SavedResource {
  isUnlocked: boolean;
  value: ExponentNumberLike;
}

export type SavedResources = Partial<Record<string, SavedResource>>;

export interface ResourceCurrentData {
  isUnlocked: boolean;
  value: ExponentNumber;
}
