import { ObjectType } from 'src/app/core/types/common.type';
import { ExponentNumber } from 'exponential-number';
import { ResourceKey } from 'src/app/features/resource/resource.type';
import { UNLOCK_KEYS } from 'src/app/features/unlock/unlock.const';
import { UpgradeService } from 'src/app/features/upgrade/upgrade.service';
import { ParamService } from 'src/app/features/param/param.service';
import { ResourceService } from 'src/app/features/resource/resource.service';

export type UnlockKey = ObjectType<typeof UNLOCK_KEYS>;

export type UnlockData = {
  name: string;
  description: string;
  iconPath: string;
  position: UnlockPosition;
  requiredUnlocks: UnlockKey[];
  costs: UnlockCost[];
  effect: (
    upgradeService: UpgradeService,
    paramService: ParamService,
    resourceService: ResourceService,
  ) => void;
};

export type UnlockCurrentData = {
  isUnlocked: boolean;
  isResetOnPrestige: boolean;
};

export type UnlockPosition = {
  x: number;
  y: number;
};

export type UnlockCost = {
  resourceKey: ResourceKey;
  value: ExponentNumber;
};
