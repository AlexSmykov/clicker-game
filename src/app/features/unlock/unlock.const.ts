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
  rubies: 'rubies',
  statistics: 'statistics',
  bonusCrystalChance: 'bonusCrystalChance',
  moneyCrystalChance: 'moneyCrystalChance',
  logarithms: 'logarithms',
  moneyLog: 'moneyLog',
  crystalLog: 'crystalLog',
  prestigeLog: 'prestigeLog',
  rubyLog: 'rubyLog',
} as const;

export const UNLOCK_DATA: Record<UnlockKey, UnlockData> = {
  [UNLOCK_KEYS.baseUnlock]: {
    name: 'Start here',
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
    name: 'First reset layer',
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
    name: 'Second resource',
    description: 'New resource - crystals. Can be gained with some chance on click',
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
  [UNLOCK_KEYS.rubies]: {
    name: 'Rubies',
    description: 'Red crystals for you! Can be gained with small chance on crystal gain',
    iconPath: `crystals.svg`,
    position: {
      x: 1,
      y: -1,
    },
    requiredUnlocks: [UNLOCK_KEYS.crystals],
    costs: [
      {
        resourceKey: RESOURCE_KEYS.crystal,
        value: new ExponentNumber(0, 100),
      },
    ],
    effect: (_: UpgradeService, paramService: ParamService, resourceService: ResourceService) => {
      resourceService.updateResource(RESOURCE_KEYS.ruby, {
        isUnlocked: true,
      });

      paramService.updateParam(PARAM_KEYS.baseRubiesChance, {
        value: new ExponentNumber(0, 10000),
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
  [UNLOCK_KEYS.bonusCrystalChance]: {
    name: 'Lucky crystal',
    description: 'Some crystal chance for you',
    iconPath: `crystal.svg`,
    position: {
      x: 2,
      y: 1,
    },
    requiredUnlocks: [UNLOCK_KEYS.crystals],
    costs: [
      {
        resourceKey: RESOURCE_KEYS.crystal,
        value: new ExponentNumber(0, 20),
      },
      {
        resourceKey: RESOURCE_KEYS.money,
        value: new ExponentNumber(1, 6),
      },
    ],
    effect: (_: UpgradeService, paramService: ParamService) => {
      paramService.updateParam(PARAM_KEYS.bonusCrystalChance, {
        value: paramService
          .paramsCurrentData()
          [PARAM_KEYS.bonusCrystalChance].value.plus(new ExponentNumber(0, 50000)),
      });
    },
  },
  [UNLOCK_KEYS.moneyCrystalChance]: {
    name: 'Money crystallization',
    description: 'You can spend your money to gain more crystals',
    iconPath: `money-crystal.svg`,
    position: {
      x: 3,
      y: 2,
    },
    requiredUnlocks: [UNLOCK_KEYS.crystals],
    costs: [
      {
        resourceKey: RESOURCE_KEYS.crystal,
        value: new ExponentNumber(0, 100),
      },
      {
        resourceKey: RESOURCE_KEYS.money,
        value: new ExponentNumber(1, 15),
      },
    ],
    effect: (_: UpgradeService, paramService: ParamService) => {
      paramService.updateParam(PARAM_KEYS.bonusCrystalChance, {
        value: paramService
          .paramsCurrentData()
          [PARAM_KEYS.bonusCrystalChance].value.plus(new ExponentNumber(0, 50000)),
      });
    },
  },
  [UNLOCK_KEYS.logarithms]: {
    name: 'Logarithm route',
    description:
      'Open a few new unlocks to add some synergism into game and also help you progress through game',
    iconPath: `log.svg`,
    position: {
      x: 4,
      y: 0,
    },
    requiredUnlocks: [UNLOCK_KEYS.crystals, UNLOCK_KEYS.prestige],
    costs: [
      {
        resourceKey: RESOURCE_KEYS.crystal,
        value: new ExponentNumber(0, 50),
      },
      {
        resourceKey: RESOURCE_KEYS.prestigePoints,
        value: new ExponentNumber(0, 25),
      },
    ],
    effect: () => {},
  },
  [UNLOCK_KEYS.moneyLog]: {
    name: 'Gold logarithm',
    description: 'The more money you have - the more you gain. Multiply your money by log(money)',
    iconPath: `log-money.svg`,
    position: {
      x: 5,
      y: -3,
    },
    requiredUnlocks: [UNLOCK_KEYS.logarithms],
    costs: [
      {
        resourceKey: RESOURCE_KEYS.money,
        value: new ExponentNumber(1, 15),
      },
      {
        resourceKey: RESOURCE_KEYS.prestigePoints,
        value: new ExponentNumber(0, 10),
      },
    ],
    effect: (upgradeService: UpgradeService) => {
      upgradeService.updateUpgrade(UPGRADE_KEYS.moneyLogBase, { isUnlocked: true });

      upgradeService.updateUpgrade(UPGRADE_KEYS.moneyLogPower, { isUnlocked: true });
    },
  },
  [UNLOCK_KEYS.crystalLog]: {
    name: 'Crystallized logarithm',
    description: "Now you shouldn't spend all your crystals. Multiply your money by log(crystals)",
    iconPath: `log-crystals.svg`,
    position: {
      x: 5,
      y: -1,
    },
    requiredUnlocks: [UNLOCK_KEYS.logarithms],
    costs: [
      {
        resourceKey: RESOURCE_KEYS.crystal,
        value: new ExponentNumber(0, 75),
      },
      {
        resourceKey: RESOURCE_KEYS.prestigePoints,
        value: new ExponentNumber(0, 10),
      },
    ],
    effect: (upgradeService: UpgradeService) => {
      upgradeService.updateUpgrade(UPGRADE_KEYS.crystalLogBase, { isUnlocked: true });

      upgradeService.updateUpgrade(UPGRADE_KEYS.crystalLogPower, { isUnlocked: true });
    },
  },
  [UNLOCK_KEYS.prestigeLog]: {
    name: 'VIP logarithm',
    description: 'Better boost with each prestige. Multiply your money by log(PP)',
    iconPath: `log-prestige.svg`,
    position: {
      x: 5,
      y: 1,
    },
    requiredUnlocks: [UNLOCK_KEYS.logarithms],
    costs: [
      {
        resourceKey: RESOURCE_KEYS.money,
        value: new ExponentNumber(1, 10),
      },
      {
        resourceKey: RESOURCE_KEYS.crystal,
        value: new ExponentNumber(0, 20),
      },
      {
        resourceKey: RESOURCE_KEYS.prestigePoints,
        value: new ExponentNumber(0, 35),
      },
    ],
    effect: (upgradeService: UpgradeService) => {
      upgradeService.updateUpgrade(UPGRADE_KEYS.prestigeLogBase, { isUnlocked: true });

      upgradeService.updateUpgrade(UPGRADE_KEYS.prestigeLogPower, { isUnlocked: true });
    },
  },
  [UNLOCK_KEYS.rubyLog]: {
    name: 'Ruby log',
    description: 'Now rubies is useful. Multiply your money by log(rubies)',
    iconPath: `log-rubies.svg`,
    position: {
      x: 5,
      y: 3,
    },
    requiredUnlocks: [UNLOCK_KEYS.logarithms, UNLOCK_KEYS.rubies],
    costs: [
      {
        resourceKey: RESOURCE_KEYS.prestigePoints,
        value: new ExponentNumber(0, 10),
      },
      {
        resourceKey: RESOURCE_KEYS.ruby,
        value: new ExponentNumber(0, 4),
      },
    ],
    effect: (upgradeService: UpgradeService) => {
      upgradeService.updateUpgrade(UPGRADE_KEYS.rubyLogBase, { isUnlocked: true });

      upgradeService.updateUpgrade(UPGRADE_KEYS.rubyLogPower, { isUnlocked: true });
    },
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
  [UNLOCK_KEYS.rubies]: {
    isUnlocked: false,
    isResetOnPrestige: false,
  },
  [UNLOCK_KEYS.statistics]: {
    isUnlocked: false,
    isResetOnPrestige: false,
  },
  [UNLOCK_KEYS.bonusCrystalChance]: {
    isUnlocked: false,
    isResetOnPrestige: true,
  },
  [UNLOCK_KEYS.moneyCrystalChance]: {
    isUnlocked: false,
    isResetOnPrestige: true,
  },
  [UNLOCK_KEYS.logarithms]: {
    isUnlocked: false,
    isResetOnPrestige: false,
  },
  [UNLOCK_KEYS.moneyLog]: {
    isUnlocked: false,
    isResetOnPrestige: true,
  },
  [UNLOCK_KEYS.crystalLog]: {
    isUnlocked: false,
    isResetOnPrestige: true,
  },
  [UNLOCK_KEYS.prestigeLog]: {
    isUnlocked: false,
    isResetOnPrestige: true,
  },
  [UNLOCK_KEYS.rubyLog]: {
    isUnlocked: false,
    isResetOnPrestige: true,
  },
};
