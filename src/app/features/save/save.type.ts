import type { SavedResources } from '../resource/resource.type';
import type { SavedStats } from '../stat/stat.type';
import type { SavedTree } from '../tree/tree.type';
import type { SavedUpgrades } from '../upgrade/upgrade.type';

export interface SaveData {
  version: number;
  savedAt: number;
  resources: SavedResources;
  upgrades: SavedUpgrades;
  stats: SavedStats;
  tree: SavedTree;
}
