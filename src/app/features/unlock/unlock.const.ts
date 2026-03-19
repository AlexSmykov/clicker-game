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
  headStart: 'headStart',
  crystalShards: 'crystalShards',
  crystals: 'crystals',
  rubyShards: 'rubyShards',
  rubies: 'rubies',
  statistic: 'statistic',
  bonusCrystalChance: 'bonusCrystalChance',
  moneyCrystalChance: 'moneyCrystalChance',
  logarithms: 'logarithms',
  moneyLog: 'moneyLog',
  crystalShardLog: 'crystalShardLog',
  prestigeLog: 'prestigeLog',
  rubyShardLog: 'rubyShardLog',
  bonusPrestigePointsMultiplier: 'bonusPrestigePointsMultiplier',
  rubyPrestigeChance: 'rubyPrestigeChance',
  rubyBonusChance: 'rubyBonusChance',
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
        value: new ExponentNumber(1, 10),
      },
    ],
    effect: () => {},
  },
  [UNLOCK_KEYS.headStart]: {
    name: 'Head start',
    description: 'Recommended buy after first prestige',
    iconPath: `head-start.svg`,
    position: {
      x: -2,
      y: 2,
    },
    requiredUnlocks: [UNLOCK_KEYS.prestige],
    costs: [
      {
        resourceKey: RESOURCE_KEYS.prestigePoints,
        value: new ExponentNumber(1, 10),
      },
    ],
    effect: (_: UpgradeService, paramService: ParamService) => {
      paramService.updateParam(PARAM_KEYS.bonusCrystalChance, {
        value: paramService
          .paramsCurrentData()
          [PARAM_KEYS.bonusCrystalChance].value.plus(new ExponentNumber(0, 100000)),
      });

      paramService.updateParam(PARAM_KEYS.bonusMoneyMultiplier, {
        value: paramService
          .paramsCurrentData()
          [PARAM_KEYS.bonusCrystalChance].value.multiply(new ExponentNumber(0, 5)),
      });
    },
  },
  [UNLOCK_KEYS.crystalShards]: {
    name: 'Crystal shards',
    description:
      'New resource - crystal shards. Can be gained with some chance on click. Chance displayed in "param list"',
    iconPath: `crystal-shards.svg`,
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

      upgradeService.updateUpgrade(UPGRADE_KEYS.crystalShardMoneyMultiplier, {
        isUnlocked: true,
      });

      resourceService.updateResource(RESOURCE_KEYS.crystalShards, {
        isUnlocked: true,
      });

      paramService.updateParam(PARAM_KEYS.baseCrystalChance, {
        value: new ExponentNumber(0, 100000),
      });
    },
  },
  [UNLOCK_KEYS.crystals]: {
    name: 'Crystals',
    description:
      'With your crystal shards you can collect the whole crystals. Affects by crystal chance, but divided and log',
    iconPath: `crystals.svg`,
    position: {
      x: 3,
      y: 1,
    },
    requiredUnlocks: [UNLOCK_KEYS.crystalShards],
    costs: [
      {
        resourceKey: RESOURCE_KEYS.crystalShards,
        value: new ExponentNumber(0, 2500),
      },
    ],
    effect: (_: UpgradeService, paramService: ParamService, resourceService: ResourceService) => {
      resourceService.updateResource(RESOURCE_KEYS.crystals, {
        isUnlocked: true,
      });

      paramService.updateParam(PARAM_KEYS.crystalChanceRootBaseForCrystals, {
        value: new ExponentNumber(0, 10),
      });
    },
  },
  [UNLOCK_KEYS.rubyShards]: {
    name: 'Ruby shards',
    description: 'New more rare resource. Also can be gained on click, but with much lower chance',
    iconPath: `ruby-shards.svg`,
    position: {
      x: 1,
      y: -1,
    },
    requiredUnlocks: [UNLOCK_KEYS.baseUnlock],
    costs: [
      {
        resourceKey: RESOURCE_KEYS.crystalShards,
        value: new ExponentNumber(0, 500),
      },
    ],
    effect: (
      upgradeService: UpgradeService,
      paramService: ParamService,
      resourceService: ResourceService,
    ) => {
      resourceService.updateResource(RESOURCE_KEYS.rubyShards, {
        isUnlocked: true,
      });

      upgradeService.updateUpgrade(UPGRADE_KEYS.rubyChance, {
        isUnlocked: true,
      });

      upgradeService.updateUpgrade(UPGRADE_KEYS.rubyShardsMoneyMultiplier, {
        isUnlocked: true,
      });

      upgradeService.updateUpgrade(UPGRADE_KEYS.rubyShardsMoneyPower, {
        isUnlocked: true,
      });

      upgradeService.updateUpgrade(UPGRADE_KEYS.rubyShardsCrystalChance, {
        isUnlocked: true,
      });

      paramService.updateParam(PARAM_KEYS.baseRubyChance, {
        value: new ExponentNumber(0, 2500),
      });
    },
  },
  [UNLOCK_KEYS.rubies]: {
    name: 'Rubies',
    description: 'After a lot of time mining shards, you finally able to mine rubies',
    iconPath: `rubies.svg`,
    position: {
      x: 3,
      y: -1,
    },
    requiredUnlocks: [UNLOCK_KEYS.rubyShards],
    costs: [
      {
        resourceKey: RESOURCE_KEYS.rubyShards,
        value: new ExponentNumber(0, 25),
      },
    ],
    effect: (_: UpgradeService, paramService: ParamService, resourceService: ResourceService) => {
      resourceService.updateResource(RESOURCE_KEYS.rubies, {
        isUnlocked: true,
      });

      paramService.updateParam(PARAM_KEYS.rubyChanceRootBaseForRubies, {
        value: new ExponentNumber(0, 5),
      });
    },
  },
  [UNLOCK_KEYS.statistic]: {
    name: 'Statistic tab',
    description: 'New tap to observe all your stats',
    iconPath: `statistic.svg`,
    position: {
      x: 1,
      y: 2,
    },
    requiredUnlocks: [UNLOCK_KEYS.crystalShards],
    costs: [
      {
        resourceKey: RESOURCE_KEYS.crystalShards,
        value: new ExponentNumber(0, 10),
      },
    ],
    effect: () => {},
  },
  [UNLOCK_KEYS.moneyCrystalChance]: {
    name: 'Money crystallization',
    description: 'You can spend your money to gain more crystals',
    iconPath: `money-crystal.svg`,
    position: {
      x: 2,
      y: 2,
    },
    requiredUnlocks: [UNLOCK_KEYS.crystalShards],
    costs: [
      {
        resourceKey: RESOURCE_KEYS.crystalShards,
        value: new ExponentNumber(0, 100),
      },
      {
        resourceKey: RESOURCE_KEYS.money,
        value: new ExponentNumber(1, 20),
      },
    ],
    effect: (upgradeService: UpgradeService) => {
      upgradeService.updateUpgrade(UPGRADE_KEYS.moneyCrystalChance, { isUnlocked: true });
    },
  },
  [UNLOCK_KEYS.bonusCrystalChance]: {
    name: 'Lucky crystal',
    description: 'Some crystal chance for you',
    iconPath: `crystals.svg`,
    position: {
      x: 3,
      y: 3,
    },
    requiredUnlocks: [UNLOCK_KEYS.moneyCrystalChance],
    costs: [
      {
        resourceKey: RESOURCE_KEYS.crystalShards,
        value: new ExponentNumber(0, 1000),
      },
    ],
    effect: (_: UpgradeService, paramService: ParamService) => {
      paramService.updateParam(PARAM_KEYS.bonusCrystalChance, {
        value: paramService
          .paramsCurrentData()
          [PARAM_KEYS.bonusCrystalChance].value.plus(new ExponentNumber(0, 150000)),
      });
    },
  },
  [UNLOCK_KEYS.logarithms]: {
    name: 'Logarithm route',
    description:
      'Open a few new unlocks to add some synergism into game and also help you progress through game',
    iconPath: `log.svg`,
    position: {
      x: -1,
      y: 3,
    },
    requiredUnlocks: [UNLOCK_KEYS.crystalShards, UNLOCK_KEYS.prestige],
    costs: [
      {
        resourceKey: RESOURCE_KEYS.crystalShards,
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
      x: -1,
      y: 4,
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
  [UNLOCK_KEYS.crystalShardLog]: {
    name: 'Crystallized logarithm',
    description:
      "Now you shouldn't spend all your crystals. Multiply your money by log(crystal shards)",
    iconPath: `log-crystals.svg`,
    position: {
      x: 0,
      y: 4,
    },
    requiredUnlocks: [UNLOCK_KEYS.logarithms],
    costs: [
      {
        resourceKey: RESOURCE_KEYS.crystalShards,
        value: new ExponentNumber(0, 75),
      },
      {
        resourceKey: RESOURCE_KEYS.prestigePoints,
        value: new ExponentNumber(0, 30),
      },
    ],
    effect: (upgradeService: UpgradeService) => {
      upgradeService.updateUpgrade(UPGRADE_KEYS.crystalShardLogBase, { isUnlocked: true });

      upgradeService.updateUpgrade(UPGRADE_KEYS.crystalShardLogPower, { isUnlocked: true });
    },
  },
  [UNLOCK_KEYS.prestigeLog]: {
    name: 'VIP logarithm',
    description: 'Better boost with each prestige. Multiply your money by log(PP)',
    iconPath: `log-prestige.svg`,
    position: {
      x: 1,
      y: 4,
    },
    requiredUnlocks: [UNLOCK_KEYS.logarithms],
    costs: [
      {
        resourceKey: RESOURCE_KEYS.money,
        value: new ExponentNumber(1, 40),
      },
      {
        resourceKey: RESOURCE_KEYS.crystalShards,
        value: new ExponentNumber(0, 50),
      },
      {
        resourceKey: RESOURCE_KEYS.prestigePoints,
        value: new ExponentNumber(0, 75),
      },
    ],
    effect: (upgradeService: UpgradeService) => {
      upgradeService.updateUpgrade(UPGRADE_KEYS.prestigeLogBase, { isUnlocked: true });

      upgradeService.updateUpgrade(UPGRADE_KEYS.prestigeLogPower, { isUnlocked: true });
    },
  },
  [UNLOCK_KEYS.rubyShardLog]: {
    name: 'Ruby shard log',
    description: 'Now rubies is useful. Multiply your money by log(ruby shards)',
    iconPath: `log-rubies.svg`,
    position: {
      x: 2,
      y: 4,
    },
    requiredUnlocks: [UNLOCK_KEYS.logarithms, UNLOCK_KEYS.rubyShards],
    costs: [
      {
        resourceKey: RESOURCE_KEYS.prestigePoints,
        value: new ExponentNumber(0, 100),
      },
      {
        resourceKey: RESOURCE_KEYS.rubyShards,
        value: new ExponentNumber(0, 2),
      },
    ],
    effect: (upgradeService: UpgradeService) => {
      upgradeService.updateUpgrade(UPGRADE_KEYS.rubyShardLogBase, { isUnlocked: true });

      upgradeService.updateUpgrade(UPGRADE_KEYS.rubyShardLogPower, { isUnlocked: true });
    },
  },
  [UNLOCK_KEYS.bonusPrestigePointsMultiplier]: {
    name: 'Bonus PP multiplier',
    description: '',
    iconPath: `prestige-points-multiplier.svg`,
    position: {
      x: 5,
      y: 0,
    },
    requiredUnlocks: [UNLOCK_KEYS.crystals, UNLOCK_KEYS.rubyShards],
    costs: [
      {
        resourceKey: RESOURCE_KEYS.crystals,
        value: new ExponentNumber(0, 5),
      },
      {
        resourceKey: RESOURCE_KEYS.rubyShards,
        value: new ExponentNumber(0, 25),
      },
    ],
    effect: (_: UpgradeService, paramService: ParamService) => {
      paramService.updateParam(PARAM_KEYS.bonusPrestigePointsMultiplier, {
        value: new ExponentNumber(0, 2),
      });
    },
  },

  [UNLOCK_KEYS.rubyBonusChance]: {
    name: 'Bonus ruby chance',
    description: 'Just some percents for you',
    iconPath: `_.svg`,
    position: {
      x: 3,
      y: -3,
    },
    requiredUnlocks: [UNLOCK_KEYS.rubyPrestigeChance],
    costs: [
      {
        resourceKey: RESOURCE_KEYS.crystals,
        value: new ExponentNumber(0, 5),
      },
      {
        resourceKey: RESOURCE_KEYS.rubyShards,
        value: new ExponentNumber(0, 25),
      },
    ],
    effect: (_: UpgradeService, paramService: ParamService) => {
      paramService.updateParam(PARAM_KEYS.rubyBonusChance, {
        value: paramService
          .paramsCurrentData()
          [PARAM_KEYS.rubyBonusChance].value.copy()
          .plus(new ExponentNumber(0, 5000)),
      });
    },
  },
  [UNLOCK_KEYS.rubyPrestigeChance]: {
    name: 'Prestige ruby chance',
    description: 'New upgrade, that allow you to spend PP on ruby chance',
    iconPath: `_.svg`,
    position: {
      x: 4,
      y: -4,
    },
    requiredUnlocks: [UNLOCK_KEYS.rubyShards],
    costs: [
      {
        resourceKey: RESOURCE_KEYS.money,
        value: new ExponentNumber(1, 100),
      },
      {
        resourceKey: RESOURCE_KEYS.rubyShards,
        value: new ExponentNumber(0, 10),
      },
    ],
    effect: (upgradeService: UpgradeService) => {
      upgradeService.updateUpgrade(UPGRADE_KEYS.rubyPrestigeChance, {
        isUnlocked: true,
      });
    },
  },
};

export const UNLOCK_CURRENT_DATA: Record<UnlockKey, UnlockCurrentData> = {
  [UNLOCK_KEYS.baseUnlock]: {
    isUnlocked: false,
  },
  [UNLOCK_KEYS.prestige]: {
    isUnlocked: false,
  },
  [UNLOCK_KEYS.headStart]: {
    isUnlocked: false,
  },
  [UNLOCK_KEYS.crystalShards]: {
    isUnlocked: false,
  },
  [UNLOCK_KEYS.crystals]: {
    isUnlocked: false,
  },
  [UNLOCK_KEYS.rubyShards]: {
    isUnlocked: false,
  },
  [UNLOCK_KEYS.rubies]: {
    isUnlocked: false,
  },
  [UNLOCK_KEYS.statistic]: {
    isUnlocked: false,
  },
  [UNLOCK_KEYS.bonusCrystalChance]: {
    isUnlocked: false,
  },
  [UNLOCK_KEYS.moneyCrystalChance]: {
    isUnlocked: false,
  },
  [UNLOCK_KEYS.logarithms]: {
    isUnlocked: false,
  },
  [UNLOCK_KEYS.moneyLog]: {
    isUnlocked: false,
  },
  [UNLOCK_KEYS.crystalShardLog]: {
    isUnlocked: false,
  },
  [UNLOCK_KEYS.prestigeLog]: {
    isUnlocked: false,
  },
  [UNLOCK_KEYS.rubyShardLog]: {
    isUnlocked: false,
  },
  [UNLOCK_KEYS.bonusPrestigePointsMultiplier]: {
    isUnlocked: false,
  },
  [UNLOCK_KEYS.rubyBonusChance]: {
    isUnlocked: false,
  },
  [UNLOCK_KEYS.rubyPrestigeChance]: {
    isUnlocked: false,
  },
};
