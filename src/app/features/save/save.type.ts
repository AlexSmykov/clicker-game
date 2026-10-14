import type { ModifierKey, SavedModifiers } from '../modifier/modifier.type';
import type { ResourceKey, SavedResources } from '../resource/resource.type';
import type { SavedStats } from '../stat/stat.type';
import type { SavedTree, TreeNodeKey } from '../tree/tree.type';
import type { SavedUpgrades, UpgradeKey } from '../upgrade/upgrade.type';

export interface SaveData {
  version: number;
  savedAt: number;
  resources: SavedResources;
  upgrades: SavedUpgrades;
  stats: SavedStats;
  tree: SavedTree;
  modifiers: SavedModifiers;
}

export interface DevSaveState {
  resources?: Partial<Record<ResourceKey, number | string>>;
  upgrades?: Partial<Record<UpgradeKey, number>>;
  tree?: TreeNodeKey[];
  prestiges?: number;
  modifiers?: Partial<Record<ModifierKey, number>>;
}

export interface DevSave {
  name: string;
  description: string;
  state: DevSaveState;
}
