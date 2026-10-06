import type { ExponentNumber } from 'exponential-number';

import type { Effect, ParamKey } from '../param/param.type';
import type { ResourceKey } from '../resource/resource.type';
import type { TagKey } from '../tag/tag.type';
import type { UPGRADE_DATA } from './upgrade.const';

export type UpgradeKey = keyof typeof UPGRADE_DATA;

export type UpgradeData = UpgradeDefinition<UpgradeKey>;

export type CostGrowth = 'multiply' | 'power';

export interface CostFormula {
  resource: ResourceKey;
  baseValue?: number | string;
  growth: CostGrowth;
  growthValue: number | string;
}

export interface CostTier {
  levels: number;
  costs: CostFormula[];
}

export interface ResolvedCostFormula {
  resource: ResourceKey;
  baseValue: ExponentNumber;
  growth: CostGrowth;
  growthValue: ExponentNumber;
}

export interface ResolvedCostTier {
  fromLevel: number;
  levels: number;
  costs: ResolvedCostFormula[];
}

export interface ResourceUnlockCondition {
  type: 'resource';
  resource: ResourceKey;
  amount: number | string;
}

export interface UpgradeLevelUnlockCondition<Key extends string> {
  type: 'upgradeLevel';
  upgrade: Key;
  level: number;
}

export type UnlockCondition<Key extends string> =
  ResourceUnlockCondition | UpgradeLevelUnlockCondition<Key>;

export interface UpgradeDefinition<Key extends string> {
  name: string;
  description: string;
  isResetOnPrestige: boolean;
  tags: TagKey[];
  unlockConditions: UnlockCondition<Key>[];
  costDividers: ParamKey[];
  costTiers: CostTier[];
  effects: Effect[];
}

export interface SavedUpgrade {
  level: number;
  isUnlocked: boolean;
}

export type SavedUpgrades = Partial<Record<string, SavedUpgrade>>;

export interface UpgradeCurrentCost {
  resource: ResourceKey;
  value: ExponentNumber;
}
