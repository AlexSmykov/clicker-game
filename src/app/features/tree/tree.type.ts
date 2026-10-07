import type { Effect } from '../param/param.type';
import type { ResourceKey } from '../resource/resource.type';
import type { TREE_NODE_DATA } from './tree.const';

export type TreeNodeKey = keyof typeof TREE_NODE_DATA;

export type TreeNodeData = TreeNodeDefinition<TreeNodeKey>;

export type TreeNodeStatus = 'available' | 'connected' | 'disconnected' | 'locked';

export interface TreeNodePosition {
  x: number;
  y: number;
}

export interface TreeNodeCost {
  resource: ResourceKey;
  amount: number | string;
}

export interface TreeNodeDefinition<Key extends string> {
  name: string;
  description: string;
  iconPath: string;
  position: TreeNodePosition;
  requires: Key[];
  costs: TreeNodeCost[];
  isResetOnPrestige: boolean;
  effects: Effect[];
}

export type SavedTree = Partial<Record<string, boolean>>;
