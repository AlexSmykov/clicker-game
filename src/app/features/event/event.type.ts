import type { ExponentNumber } from 'exponential-number';

import type { ResourceKey } from '../resource/resource.type';
import type { UpgradeKey } from '../upgrade/upgrade.type';

export interface GameEvents {
  click: { money: ExponentNumber };
  resourceGained: { resource: ResourceKey; amount: ExponentNumber };
  resourceSpent: { resource: ResourceKey; amount: ExponentNumber };
  upgradeBought: { upgrade: UpgradeKey };
  tick: { seconds: number };
}

export type GameEventType = keyof GameEvents;

export type GameEvent = {
  [Type in GameEventType]: { type: Type; payload: GameEvents[Type] };
}[GameEventType];
