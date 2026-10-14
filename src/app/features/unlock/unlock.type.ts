import type { ResourceKey } from '../resource/resource.type';
import type { StatKey } from '../stat/stat.type';
import type { TreeNodeKey } from '../tree/tree.type';

export interface ResourceUnlockCondition {
  type: 'resource';
  resource: ResourceKey;
  amount: number | string;
}

export interface ResourceEarnedUnlockCondition {
  type: 'resourceEarned';
  resource: ResourceKey;
  amount: number | string;
}

export interface StatUnlockCondition {
  type: 'stat';
  stat: StatKey;
  amount: number | string;
}

export type AchievementCondition = ResourceEarnedUnlockCondition | StatUnlockCondition;

export interface TreeNodeUnlockCondition {
  type: 'treeNode';
  node: TreeNodeKey;
}

export interface UpgradeLevelUnlockCondition<UpgradeKey extends string> {
  type: 'upgradeLevel';
  upgrade: UpgradeKey;
  level: number;
}

export type UnlockCondition<UpgradeKey extends string> =
  | ResourceEarnedUnlockCondition
  | ResourceUnlockCondition
  | StatUnlockCondition
  | TreeNodeUnlockCondition
  | UpgradeLevelUnlockCondition<UpgradeKey>;
