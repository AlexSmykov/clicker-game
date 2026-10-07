import type { ExponentNumber, ExponentNumberLike } from 'exponential-number';

import type { UnlockCondition } from '../unlock/unlock.type';
import type { UpgradeKey } from '../upgrade/upgrade.type';
import type { RESOURCE_KEYS } from './resource.const';

export type ResourceKey = (typeof RESOURCE_KEYS)[number];

export interface ResourceData {
  name: string;
  iconPath: string;
  color: string;
  isResetOnPrestige: boolean;
  unlockConditions: UnlockCondition<UpgradeKey>[];
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
