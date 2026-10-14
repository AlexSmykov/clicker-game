import type { ExponentNumber } from 'exponential-number';

import type { ResourceKey } from '../resource/resource.type';
import type { TreeNodeKey } from '../tree/tree.type';
import type { UpgradeKey } from '../upgrade/upgrade.type';

export interface GameEvents {
  click: { money: ExponentNumber; isCrit: boolean };
  resourceGained: { resource: ResourceKey; amount: ExponentNumber };
  resourceSpent: { resource: ResourceKey; amount: ExponentNumber };
  upgradeBought: { upgrade: UpgradeKey };
  treeNodeBought: { node: TreeNodeKey };
  prestige: { prestigePoints: ExponentNumber };
  restart: Record<string, never>;
  clickMissed: Record<string, never>;
  tick: { seconds: number; isVisible: boolean };
}

export type GameEventType = keyof GameEvents;

export type GameEvent = {
  [Type in GameEventType]: { type: Type; payload: GameEvents[Type] };
}[GameEventType];
