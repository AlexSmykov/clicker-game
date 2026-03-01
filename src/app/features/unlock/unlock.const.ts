import { RESOURCE_KEYS } from 'src/app/features/resource/resource.const';
import { ExponentNumber } from 'exponential-number';
import { UnlockCurrentData, UnlockData, UnlockKey } from 'src/app/features/unlock/unlock.type';
import { UpgradeService } from 'src/app/features/upgrade/upgrade.service';
import { ParamService } from 'src/app/features/param/param.service';
import { ResourceService } from 'src/app/features/resource/resource.service';
import { UPGRADE_KEYS } from 'src/app/features/upgrade/upgrade.const';
import { PARAM_KEYS } from 'src/app/features/param/param.const';

export const UNLOCK_ICON_DIR_PATH = 'assets/icons/unlocks/';

export const UNLOCK_KEYS = {
  baseUnlock: 'baseUnlock',
  prestige: 'prestige',
  crystals: 'crystals',
  statistics: 'statistics',
} as const;

export const UNLOCK_DATA: Record<UnlockKey, UnlockData> = {
  [UNLOCK_KEYS.baseUnlock]: {
    name: 'Base unlock',
    description: 'Basic unlock to open next routes',
    iconPath: `base.svg`,
    position: {
      x: 0,
      y: 0,
    },
    requiredUnlocks: [],
    costs: [
      {
        resourceKey: RESOURCE_KEYS.money,
        value: new ExponentNumber(0, 10),
      },
    ],
    effect: () => {},
  },
  [UNLOCK_KEYS.prestige]: {
    name: 'Prestige reset layer',
    description: 'You can prestige, to gain special resource',
    iconPath: `prestige.svg`,
    position: {
      x: -1,
      y: 1,
    },
    requiredUnlocks: [UNLOCK_KEYS.baseUnlock],
    costs: [
      {
        resourceKey: RESOURCE_KEYS.money,
        value: new ExponentNumber(0, 10000000),
      },
    ],
    effect: () => {},
  },
  [UNLOCK_KEYS.crystals]: {
    name: 'Cristal resource',
    description: 'New resource - crystals. Can be gained on click with some chance',
    iconPath: `crystals.svg`,
    position: {
      x: 1,
      y: 1,
    },
    requiredUnlocks: [UNLOCK_KEYS.baseUnlock],
    costs: [
      {
        resourceKey: RESOURCE_KEYS.money,
        value: new ExponentNumber(0, 2500),
      },
    ],
    effect: (
      upgradeService: UpgradeService,
      paramService: ParamService,
      resourceService: ResourceService,
    ) => {
      upgradeService.updateUpgrade(UPGRADE_KEYS.crystalChance, {
        isUnlocked: true,
      });

      upgradeService.updateUpgrade(UPGRADE_KEYS.crystalMultiplier, {
        isUnlocked: true,
      });

      resourceService.updateResource(RESOURCE_KEYS.crystal, {
        isUnlocked: true,
      });

      paramService.updateParam(PARAM_KEYS.baseCrystalChance, {
        value: new ExponentNumber(0, 100000),
      });
    },
  },
  [UNLOCK_KEYS.statistics]: {
    name: 'Statistics tab',
    description: 'New tap to observe all your stats',
    iconPath: `statistics.svg`,
    position: {
      x: 1,
      y: 2,
    },
    requiredUnlocks: [UNLOCK_KEYS.crystals],
    costs: [
      {
        resourceKey: RESOURCE_KEYS.crystal,
        value: new ExponentNumber(0, 10),
      },
    ],
    effect: () => {},
  },
};

export const UNLOCK_CURRENT_DATA: Record<UnlockKey, UnlockCurrentData> = {
  [UNLOCK_KEYS.baseUnlock]: {
    isUnlocked: false,
    isResetOnPrestige: false,
  },
  [UNLOCK_KEYS.prestige]: {
    isUnlocked: false,
    isResetOnPrestige: false,
  },
  [UNLOCK_KEYS.crystals]: {
    isUnlocked: false,
    isResetOnPrestige: false,
  },
  [UNLOCK_KEYS.statistics]: {
    isUnlocked: false,
    isResetOnPrestige: false,
  },
};
