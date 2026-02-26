import { ParamKey } from 'src/app/features/param/param.type';
import { ValueChange } from 'src/app/core/types/value-change.type';
import { ObjectType } from 'src/app/core/types/common.type';
import { UPGRADE_KEYS } from 'src/app/features/upgrade/upgrade.const';
import { ResourceKey } from 'src/app/features/resource/resource.type';
import { ExponentNumber } from 'exponential-number';

export type UpgradeKey = ObjectType<typeof UPGRADE_KEYS>;

export type Upgrade = {
  name: string;
  description: string;
  effects: UpgradeEffect[];
  costs: UpgradeCost[];
};

export type UpgradeEffect = {
  paramKey: ParamKey;
  change: ValueChange;
};

export type UpgradeCost = {
  startAtLevel: number;
  resources: UpgradeResourceCost[];
};

export type UpgradeResourceCost = {
  defaultValue: ExponentNumber;
  resource: ResourceKey;
  change: ValueChange;
};

export type UpgradeCurrentData = {
  costs: UpgradeCurrentCost[];
  level: number;
};

export type UpgradeCurrentCost = {
  value: ExponentNumber;
  resource: ResourceKey;
};
