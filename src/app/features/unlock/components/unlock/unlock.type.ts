import { UnlockKey } from 'src/app/features/unlock/unlock.type';
import { ResourceInputData } from 'src/app/features/resource/components/resource/resource.type';

export type UnlockInputData = {
  key: UnlockKey;
  name: string;
  description: string;
  size: number;
  offset: number;
  isUnlocked: boolean;
  isCanBuy: boolean;
  isResetOnPrestige: boolean;
  requiredUnlocks: UnlockKey[];
  icon: string;
  costs: ResourceInputData[];
  x: number;
  y: number;
};
