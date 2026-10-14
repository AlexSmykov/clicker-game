import type { ExponentNumber } from 'exponential-number';

import type { Effect, ParamKey } from '../param/param.type';
import type { ResourceKey } from '../resource/resource.type';
import type { TagKey } from '../tag/tag.type';
import type { UnlockCondition } from '../unlock/unlock.type';
import type { UPGRADE_DATA } from './upgrade.const';

export type UpgradeKey = keyof typeof UPGRADE_DATA;

export type UpgradeData = UpgradeDefinition<UpgradeKey>;

export type CostGrowth = 'add' | 'multiply' | 'power';

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
  startValue: ExponentNumber;
  growth: CostGrowth;
  growthValue: ExponentNumber;
}

export interface CostModifiers {
  divider: ExponentNumber;
  power: ExponentNumber;
  moneyStartPower: ExponentNumber;
  otherStartMultiplier: ExponentNumber;
}

export interface ResolvedCostTier {
  fromLevel: number;
  levels: number;
  costs: ResolvedCostFormula[];
}

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

export interface UpgradeSoftcap {
  index: number;
  levelCap: number;
}

export interface SavedUpgrade {
  level: number;
}

export type SavedUpgrades = Partial<Record<string, SavedUpgrade>>;

export interface UpgradeCurrentCost {
  resource: ResourceKey;
  value: ExponentNumber;
}
