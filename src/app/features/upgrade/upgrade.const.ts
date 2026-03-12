import { UpgradeCurrentData, UpgradeData, UpgradeKey } from 'src/app/features/upgrade/upgrade.type';
import { ExponentNumber } from 'exponential-number';
import { RESOURCE_KEYS } from 'src/app/features/resource/resource.const';
import { SIMPLE_VALUE_CHANGE_KEYS } from 'src/app/core/consts/value-change.const';
import { PARAM_KEYS } from 'src/app/features/param/param.const';
import { transformCostToCurrentCosts } from 'src/app/features/upgrade/upgrade.utils';

export const UPGRADE_KEYS = {
  simpleMoneyMultiplier: 'simpleMoneyMultiplier',
  simpleMoneyMultiplierBoost: 'simpleMoneyMultiplierBoost',
  simpleMoneyPower: 'simpleMoneyPower',
  crystalShardMoneyMultiplier: 'crystalShardMoneyMultiplier',
  crystalChance: 'crystalChance',
  prestigeMoneyPower: 'prestigeMoneyPower',
  prestigeCrystalChance: 'prestigeCrystalChance',
  prestigeCrystalShardsMultiplier: 'prestigeCrystalMultiplier',
  moneyCrystalChance: 'moneyCrystalChance',
  moneyLogBase: 'moneyLogBase',
  moneyLogPower: 'moneyLogPower',
  crystalShardLogBase: 'crystalShardLogBase',
  crystalShardLogPower: 'crystalShardLogPower',
  prestigeLogBase: 'prestigeLogBase',
  prestigeLogPower: 'prestigeLogPower',
  rubyShardLogBase: 'rubyShardLogBase',
  rubyShardLogPower: 'rubyShardLogPower',
  rubyShardMoneyMultiplier: 'rubyShardMoneyMultiplier',
} as const;

export const UPGRADE_DATA: Record<UpgradeKey, UpgradeData> = {
  [UPGRADE_KEYS.simpleMoneyMultiplier]: {
    name: 'Money multiplier',
    description: 'Add simple multiplier to your income',
    isResetOnPrestige: true,
    effects: [
      {
        paramKey: PARAM_KEYS.simpleMoneyMultiplier,
        change: {
          changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
          value: PARAM_KEYS.simpleMoneyMultiplierIncrement,
        },
      },
    ],
    costs: [
      {
        startAtLevel: 0,
        resources: [
          {
            defaultValue: new ExponentNumber(0, 10),
            resource: RESOURCE_KEYS.money,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.multiply,
              value: new ExponentNumber(0, 2),
            },
          },
        ],
      },
      {
        startAtLevel: 100,
        resources: [
          {
            defaultValue: new ExponentNumber(1, 35),
            resource: RESOURCE_KEYS.money,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.multiply,
              value: new ExponentNumber(0, 4),
            },
          },
        ],
      },
      {
        startAtLevel: 1000,
        resources: [
          {
            defaultValue: new ExponentNumber(1, 650),
            resource: RESOURCE_KEYS.money,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.multiply,
              value: new ExponentNumber(0, 10),
            },
          },
        ],
      },
    ],
  },
  [UPGRADE_KEYS.simpleMoneyMultiplierBoost]: {
    name: 'Money booster',
    description: 'Multiply your simple multiplier effect',
    isResetOnPrestige: true,
    effects: [
      {
        paramKey: PARAM_KEYS.simpleMoneyMultiplierIncrement,
        change: {
          changeType: SIMPLE_VALUE_CHANGE_KEYS.multiply,
          value: new ExponentNumber(0, 3),
        },
      },
      {
        paramKey: PARAM_KEYS.simpleMoneyMultiplier,
        change: {
          changeType: SIMPLE_VALUE_CHANGE_KEYS.multiply,
          value: new ExponentNumber(0, 2),
        },
      },
    ],
    costs: [
      {
        startAtLevel: 0,
        resources: [
          {
            defaultValue: new ExponentNumber(0, 500),
            resource: RESOURCE_KEYS.money,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.multiply,
              value: new ExponentNumber(0, 20),
            },
          },
        ],
      },
      {
        startAtLevel: 100,
        resources: [
          {
            defaultValue: new ExponentNumber(1, 140),
            resource: RESOURCE_KEYS.money,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.multiply,
              value: new ExponentNumber(0, 400),
            },
          },
        ],
      },
      {
        startAtLevel: 1000,
        resources: [
          {
            defaultValue: new ExponentNumber(1, 2700),
            resource: RESOURCE_KEYS.money,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.multiply,
              value: new ExponentNumber(1, 5),
            },
          },
        ],
      },
    ],
  },
  [UPGRADE_KEYS.simpleMoneyPower]: {
    name: 'Power drink',
    description: 'Raise your money income to power',
    isResetOnPrestige: true,
    effects: [
      {
        paramKey: PARAM_KEYS.simpleMoneyPower,
        change: {
          changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
          value: new ExponentNumber(0, 0.1),
        },
      },
    ],
    costs: [
      {
        startAtLevel: 0,
        resources: [
          {
            defaultValue: new ExponentNumber(0, 1000000),
            resource: RESOURCE_KEYS.money,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.power,
              value: new ExponentNumber(0, 1.5),
            },
          },
        ],
      },
    ],
  },
  [UPGRADE_KEYS.crystalShardMoneyMultiplier]: {
    name: 'Shiny rock',
    description: 'Multiply your money income on each level',
    isResetOnPrestige: true,
    effects: [
      {
        paramKey: PARAM_KEYS.crystalShardsMoneyMultiplier,
        change: {
          changeType: SIMPLE_VALUE_CHANGE_KEYS.multiply,
          value: new ExponentNumber(0, 2),
        },
      },
    ],
    costs: [
      {
        startAtLevel: 0,
        resources: [
          {
            defaultValue: new ExponentNumber(0, 4),
            resource: RESOURCE_KEYS.crystalShards,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
              value: new ExponentNumber(0, 2),
            },
          },
        ],
      },
      {
        startAtLevel: 48,
        resources: [
          {
            defaultValue: new ExponentNumber(0, 100),
            resource: RESOURCE_KEYS.crystalShards,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.multiply,
              value: new ExponentNumber(0, 1.1),
            },
          },
        ],
      },
    ],
  },
  [UPGRADE_KEYS.crystalChance]: {
    name: 'Crystal magnet',
    description: 'Increase your crystal chance',
    isResetOnPrestige: true,
    effects: [
      {
        paramKey: PARAM_KEYS.crystalChance,
        change: {
          changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
          value: new ExponentNumber(0, 10000),
        },
      },
    ],
    costs: [
      {
        startAtLevel: 0,
        resources: [
          {
            defaultValue: new ExponentNumber(0, 1),
            resource: RESOURCE_KEYS.crystalShards,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
              value: new ExponentNumber(0, 1),
            },
          },
        ],
      },
      {
        startAtLevel: 99,
        resources: [
          {
            defaultValue: new ExponentNumber(0, 100),
            resource: RESOURCE_KEYS.crystalShards,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
              value: new ExponentNumber(0, 10),
            },
          },
        ],
      },
      {
        startAtLevel: 189,
        resources: [
          {
            defaultValue: new ExponentNumber(0, 1000),
            resource: RESOURCE_KEYS.crystalShards,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.multiply,
              value: new ExponentNumber(0, 1.1),
            },
          },
        ],
      },
    ],
  },
  [UPGRADE_KEYS.prestigeMoneyPower]: {
    name: 'Power of prestige',
    description: 'Slightly raise your money income to the power',
    isResetOnPrestige: false,
    effects: [
      {
        paramKey: PARAM_KEYS.prestigeMoneyPower,
        change: {
          changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
          value: new ExponentNumber(0, 0.025),
        },
      },
    ],
    costs: [
      {
        startAtLevel: 0,
        resources: [
          {
            defaultValue: new ExponentNumber(0, 10),
            resource: RESOURCE_KEYS.prestigePoints,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
              value: new ExponentNumber(0, 10),
            },
          },
        ],
      },
      {
        startAtLevel: 10,
        resources: [
          {
            defaultValue: new ExponentNumber(0, 110),
            resource: RESOURCE_KEYS.prestigePoints,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
              value: new ExponentNumber(0, 20),
            },
          },
        ],
      },
      {
        startAtLevel: 50,
        resources: [
          {
            defaultValue: new ExponentNumber(0, 1000),
            resource: RESOURCE_KEYS.prestigePoints,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.multiply,
              value: new ExponentNumber(0, 1.1),
            },
          },
        ],
      },
    ],
  },
  [UPGRADE_KEYS.prestigeCrystalChance]: {
    name: 'Better radar',
    description: 'More chance to gain crystal resources on click',
    isResetOnPrestige: false,
    effects: [
      {
        paramKey: PARAM_KEYS.prestigeCrystalChance,
        change: {
          changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
          value: new ExponentNumber(0, 25000),
        },
      },
    ],
    costs: [
      {
        startAtLevel: 0,
        resources: [
          {
            defaultValue: new ExponentNumber(0, 5),
            resource: RESOURCE_KEYS.prestigePoints,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
              value: new ExponentNumber(0, 5),
            },
          },
        ],
      },
      {
        startAtLevel: 20,
        resources: [
          {
            defaultValue: new ExponentNumber(0, 200),
            resource: RESOURCE_KEYS.prestigePoints,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
              value: new ExponentNumber(0, 200),
            },
          },
        ],
      },
      {
        startAtLevel: 100,
        resources: [
          {
            defaultValue: new ExponentNumber(0, 20000),
            resource: RESOURCE_KEYS.prestigePoints,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.multiply,
              value: new ExponentNumber(0, 1.1),
            },
          },
        ],
      },
    ],
  },
  [UPGRADE_KEYS.prestigeCrystalShardsMultiplier]: {
    name: 'Crystal clone machine',
    description: 'Multiplies crystals on click, nice',
    isResetOnPrestige: false,
    effects: [
      {
        paramKey: PARAM_KEYS.prestigeCrystalShardsMultiplier,
        change: {
          changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
          value: new ExponentNumber(0, 1),
        },
      },
    ],
    costs: [
      {
        startAtLevel: 0,
        resources: [
          {
            defaultValue: new ExponentNumber(0, 25),
            resource: RESOURCE_KEYS.prestigePoints,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.multiply,
              value: new ExponentNumber(0, 4),
            },
          },
        ],
      },
    ],
  },
  [UPGRADE_KEYS.moneyCrystalChance]: {
    name: 'Money-crystals synergism',
    description: 'Spend money to gain more crystal chance',
    isResetOnPrestige: true,
    effects: [
      {
        paramKey: PARAM_KEYS.moneyCrystalChance,
        change: {
          changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
          value: new ExponentNumber(0, 2000),
        },
      },
    ],
    costs: [
      {
        startAtLevel: 0,
        resources: [
          {
            defaultValue: new ExponentNumber(1, 9),
            resource: RESOURCE_KEYS.money,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.multiply,
              value: new ExponentNumber(0, 10),
            },
          },
        ],
      },
      {
        startAtLevel: 100,
        resources: [
          {
            defaultValue: new ExponentNumber(1, 120),
            resource: RESOURCE_KEYS.prestigePoints,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.multiply,
              value: new ExponentNumber(0, 1000),
            },
          },
        ],
      },
    ],
  },
  [UPGRADE_KEYS.moneyLogBase]: {
    name: 'Money log base',
    description: 'Decrease base of log(money)  multiplier',
    isResetOnPrestige: true,
    effects: [
      {
        paramKey: PARAM_KEYS.moneyLogBase,
        change: {
          changeType: SIMPLE_VALUE_CHANGE_KEYS.divide,
          value: new ExponentNumber(0, 1.5),
        },
      },
    ],
    costs: [
      {
        startAtLevel: 0,
        resources: [
          {
            defaultValue: new ExponentNumber(1, 9),
            resource: RESOURCE_KEYS.money,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.power,
              value: new ExponentNumber(0, 1.2),
            },
          },
          {
            defaultValue: new ExponentNumber(0, 1),
            resource: RESOURCE_KEYS.prestigePoints,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
              value: new ExponentNumber(0, 0),
            },
          },
        ],
      },
      {
        startAtLevel: 10,
        resources: [
          {
            defaultValue: new ExponentNumber(1, 100),
            resource: RESOURCE_KEYS.money,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.power,
              value: new ExponentNumber(0, 2),
            },
          },
          {
            defaultValue: new ExponentNumber(0, 2),
            resource: RESOURCE_KEYS.prestigePoints,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
              value: new ExponentNumber(0, 1),
            },
          },
        ],
      },
    ],
  },
  [UPGRADE_KEYS.moneyLogPower]: {
    name: 'Money log power',
    description: 'Raise log(money)  to power',
    isResetOnPrestige: true,
    effects: [
      {
        paramKey: PARAM_KEYS.moneyLogPower,
        change: {
          changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
          value: new ExponentNumber(0, 0.5),
        },
      },
    ],
    costs: [
      {
        startAtLevel: 0,
        resources: [
          {
            defaultValue: new ExponentNumber(0, 10),
            resource: RESOURCE_KEYS.crystalShards,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
              value: new ExponentNumber(0, 10),
            },
          },
          {
            defaultValue: new ExponentNumber(0, 1),
            resource: RESOURCE_KEYS.prestigePoints,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
              value: new ExponentNumber(0, 0),
            },
          },
        ],
      },
      {
        startAtLevel: 10,
        resources: [
          {
            defaultValue: new ExponentNumber(0, 250),
            resource: RESOURCE_KEYS.crystalShards,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.multiply,
              value: new ExponentNumber(0, 1.25),
            },
          },
          {
            defaultValue: new ExponentNumber(0, 2),
            resource: RESOURCE_KEYS.prestigePoints,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
              value: new ExponentNumber(0, 1),
            },
          },
        ],
      },
    ],
  },
  [UPGRADE_KEYS.crystalShardLogBase]: {
    name: 'Crystal shard log base',
    description: 'Decrease base of log(crystal shards)  multiplier',
    isResetOnPrestige: true,
    effects: [
      {
        paramKey: PARAM_KEYS.crystalShardsLogBase,
        change: {
          changeType: SIMPLE_VALUE_CHANGE_KEYS.divide,
          value: new ExponentNumber(0, 1.5),
        },
      },
    ],
    costs: [
      {
        startAtLevel: 0,
        resources: [
          {
            defaultValue: new ExponentNumber(0, 25),
            resource: RESOURCE_KEYS.crystalShards,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.multiply,
              value: new ExponentNumber(0, 1.3),
            },
          },
        ],
      },
      {
        startAtLevel: 9,
        resources: [
          {
            defaultValue: new ExponentNumber(0, 500),
            resource: RESOURCE_KEYS.crystalShards,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.multiply,
              value: new ExponentNumber(0, 2),
            },
          },
        ],
      },
    ],
  },
  [UPGRADE_KEYS.crystalShardLogPower]: {
    name: 'Crystal shard log power',
    description: 'Raise log(crystal shards)  to power',
    isResetOnPrestige: true,
    effects: [
      {
        paramKey: PARAM_KEYS.crystalShardsLogPower,
        change: {
          changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
          value: new ExponentNumber(0, 0.5),
        },
      },
    ],
    costs: [
      {
        startAtLevel: 0,
        resources: [
          {
            defaultValue: new ExponentNumber(1, 9),
            resource: RESOURCE_KEYS.money,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.power,
              value: new ExponentNumber(0, 1.4),
            },
          },
          {
            defaultValue: new ExponentNumber(0, 25),
            resource: RESOURCE_KEYS.crystalShards,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
              value: new ExponentNumber(0, 25),
            },
          },
        ],
      },
      {
        startAtLevel: 9,
        resources: [
          {
            defaultValue: new ExponentNumber(1, 100),
            resource: RESOURCE_KEYS.money,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.power,
              value: new ExponentNumber(0, 1.8),
            },
          },
          {
            defaultValue: new ExponentNumber(0, 250),
            resource: RESOURCE_KEYS.crystalShards,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.multiply,
              value: new ExponentNumber(0, 1.5),
            },
          },
        ],
      },
    ],
  },
  [UPGRADE_KEYS.prestigeLogBase]: {
    name: 'PP log base',
    description: 'Decrease base of log(PP) multiplier',
    isResetOnPrestige: false,
    effects: [
      {
        paramKey: PARAM_KEYS.prestigeLogBase,
        change: {
          changeType: SIMPLE_VALUE_CHANGE_KEYS.divide,
          value: new ExponentNumber(0, 1.5),
        },
      },
    ],
    costs: [
      {
        startAtLevel: 0,
        resources: [
          {
            defaultValue: new ExponentNumber(0, 15),
            resource: RESOURCE_KEYS.prestigePoints,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.multiply,
              value: new ExponentNumber(0, 1.5),
            },
          },
        ],
      },
      {
        startAtLevel: 10,
        resources: [
          {
            defaultValue: new ExponentNumber(0, 500),
            resource: RESOURCE_KEYS.crystalShards,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.multiply,
              value: new ExponentNumber(0, 2.5),
            },
          },
        ],
      },
    ],
  },
  [UPGRADE_KEYS.prestigeLogPower]: {
    name: 'PP log power',
    description: 'Raise log(PP) to power',
    isResetOnPrestige: false,
    effects: [
      {
        paramKey: PARAM_KEYS.prestigeLogPower,
        change: {
          changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
          value: new ExponentNumber(0, 0.5),
        },
      },
    ],
    costs: [
      {
        startAtLevel: 0,
        resources: [
          {
            defaultValue: new ExponentNumber(0, 50),
            resource: RESOURCE_KEYS.prestigePoints,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
              value: new ExponentNumber(0, 50),
            },
          },
        ],
      },
      {
        startAtLevel: 9,
        resources: [
          {
            defaultValue: new ExponentNumber(0, 500),
            resource: RESOURCE_KEYS.prestigePoints,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.multiply,
              value: new ExponentNumber(0, 1.5),
            },
          },
        ],
      },
    ],
  },
  [UPGRADE_KEYS.rubyShardLogBase]: {
    name: 'Ruby shard log base',
    description: 'Decrease base of log(ruby shards) multiplier',
    isResetOnPrestige: true,
    effects: [
      {
        paramKey: PARAM_KEYS.rubyShardsLogBase,
        change: {
          changeType: SIMPLE_VALUE_CHANGE_KEYS.divide,
          value: new ExponentNumber(0, 1.75),
        },
      },
    ],
    costs: [
      {
        startAtLevel: 0,
        resources: [
          {
            defaultValue: new ExponentNumber(0, 1),
            resource: RESOURCE_KEYS.rubyShards,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
              value: new ExponentNumber(0, 1),
            },
          },
        ],
      },
      {
        startAtLevel: 9,
        resources: [
          {
            defaultValue: new ExponentNumber(0, 10),
            resource: RESOURCE_KEYS.crystalShards,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
              value: new ExponentNumber(0, 5),
            },
          },
        ],
      },
    ],
  },
  [UPGRADE_KEYS.rubyShardLogPower]: {
    name: 'Ruby shard log power',
    description: 'Raise log(ruby shards) to power',
    isResetOnPrestige: true,
    effects: [
      {
        paramKey: PARAM_KEYS.rubyShardsLogPower,
        change: {
          changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
          value: new ExponentNumber(0, 1),
        },
      },
    ],
    costs: [
      {
        startAtLevel: 0,
        resources: [
          {
            defaultValue: new ExponentNumber(0, 50),
            resource: RESOURCE_KEYS.crystalShards,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
              value: new ExponentNumber(0, 50),
            },
          },
          {
            defaultValue: new ExponentNumber(0, 1),
            resource: RESOURCE_KEYS.rubyShards,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
              value: new ExponentNumber(0, 1),
            },
          },
        ],
      },
      {
        startAtLevel: 9,
        resources: [
          {
            defaultValue: new ExponentNumber(0, 500),
            resource: RESOURCE_KEYS.rubyShards,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
              value: new ExponentNumber(0, 250),
            },
          },
          {
            defaultValue: new ExponentNumber(0, 10),
            resource: RESOURCE_KEYS.prestigePoints,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
              value: new ExponentNumber(0, 5),
            },
          },
        ],
      },
    ],
  },
  [UPGRADE_KEYS.rubyShardMoneyMultiplier]: {
    name: 'Ruby shard seller',
    description: 'Sell ruby shards to multiply money',
    isResetOnPrestige: true,
    effects: [
      {
        paramKey: PARAM_KEYS.rubyShardsMoneyMultiplier,
        change: {
          changeType: SIMPLE_VALUE_CHANGE_KEYS.multiply,
          value: new ExponentNumber(0, 1.5),
        },
      },
    ],
    costs: [
      {
        startAtLevel: 0,
        resources: [
          {
            defaultValue: new ExponentNumber(0, 1),
            resource: RESOURCE_KEYS.rubyShards,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
              value: new ExponentNumber(0, 1),
            },
          },
        ],
      },
      {
        startAtLevel: 10,
        resources: [
          {
            defaultValue: new ExponentNumber(0, 20),
            resource: RESOURCE_KEYS.prestigePoints,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
              value: new ExponentNumber(0, 2),
            },
          },
        ],
      },
    ],
  },
};

export const UPGRADE_CURRENT_DATA: Record<UpgradeKey, UpgradeCurrentData> = {
  [UPGRADE_KEYS.simpleMoneyMultiplier]: {
    costs: transformCostToCurrentCosts(UPGRADE_DATA[UPGRADE_KEYS.simpleMoneyMultiplier].costs),
    isUnlocked: true,
    level: 0,
  },
  [UPGRADE_KEYS.simpleMoneyMultiplierBoost]: {
    costs: transformCostToCurrentCosts(UPGRADE_DATA[UPGRADE_KEYS.simpleMoneyMultiplierBoost].costs),
    isUnlocked: true,
    level: 0,
  },
  [UPGRADE_KEYS.simpleMoneyPower]: {
    costs: transformCostToCurrentCosts(UPGRADE_DATA[UPGRADE_KEYS.simpleMoneyPower].costs),
    isUnlocked: true,
    level: 0,
  },
  [UPGRADE_KEYS.crystalShardMoneyMultiplier]: {
    costs: transformCostToCurrentCosts(
      UPGRADE_DATA[UPGRADE_KEYS.crystalShardMoneyMultiplier].costs,
    ),
    isUnlocked: false,
    level: 0,
  },
  [UPGRADE_KEYS.crystalChance]: {
    costs: transformCostToCurrentCosts(UPGRADE_DATA[UPGRADE_KEYS.crystalChance].costs),
    isUnlocked: false,
    level: 0,
  },
  [UPGRADE_KEYS.prestigeMoneyPower]: {
    costs: transformCostToCurrentCosts(UPGRADE_DATA[UPGRADE_KEYS.prestigeMoneyPower].costs),
    isUnlocked: false,
    level: 0,
  },
  [UPGRADE_KEYS.prestigeCrystalChance]: {
    costs: transformCostToCurrentCosts(UPGRADE_DATA[UPGRADE_KEYS.prestigeCrystalChance].costs),
    isUnlocked: false,
    level: 0,
  },
  [UPGRADE_KEYS.prestigeCrystalShardsMultiplier]: {
    costs: transformCostToCurrentCosts(
      UPGRADE_DATA[UPGRADE_KEYS.prestigeCrystalShardsMultiplier].costs,
    ),
    isUnlocked: false,
    level: 0,
  },
  [UPGRADE_KEYS.moneyCrystalChance]: {
    costs: transformCostToCurrentCosts(UPGRADE_DATA[UPGRADE_KEYS.moneyCrystalChance].costs),
    isUnlocked: false,
    level: 0,
  },
  [UPGRADE_KEYS.moneyLogBase]: {
    costs: transformCostToCurrentCosts(UPGRADE_DATA[UPGRADE_KEYS.moneyLogBase].costs),
    isUnlocked: false,
    level: 0,
  },
  [UPGRADE_KEYS.moneyLogPower]: {
    costs: transformCostToCurrentCosts(UPGRADE_DATA[UPGRADE_KEYS.moneyLogPower].costs),
    isUnlocked: false,
    level: 0,
  },
  [UPGRADE_KEYS.crystalShardLogBase]: {
    costs: transformCostToCurrentCosts(UPGRADE_DATA[UPGRADE_KEYS.crystalShardLogBase].costs),
    isUnlocked: false,
    level: 0,
  },
  [UPGRADE_KEYS.crystalShardLogPower]: {
    costs: transformCostToCurrentCosts(UPGRADE_DATA[UPGRADE_KEYS.crystalShardLogPower].costs),
    isUnlocked: false,
    level: 0,
  },
  [UPGRADE_KEYS.prestigeLogBase]: {
    costs: transformCostToCurrentCosts(UPGRADE_DATA[UPGRADE_KEYS.prestigeLogBase].costs),
    isUnlocked: false,
    level: 0,
  },
  [UPGRADE_KEYS.prestigeLogPower]: {
    costs: transformCostToCurrentCosts(UPGRADE_DATA[UPGRADE_KEYS.prestigeLogPower].costs),
    isUnlocked: false,
    level: 0,
  },
  [UPGRADE_KEYS.rubyShardLogBase]: {
    costs: transformCostToCurrentCosts(UPGRADE_DATA[UPGRADE_KEYS.rubyShardLogBase].costs),
    isUnlocked: false,
    level: 0,
  },
  [UPGRADE_KEYS.rubyShardLogPower]: {
    costs: transformCostToCurrentCosts(UPGRADE_DATA[UPGRADE_KEYS.rubyShardLogPower].costs),
    isUnlocked: false,
    level: 0,
  },
  [UPGRADE_KEYS.rubyShardMoneyMultiplier]: {
    costs: transformCostToCurrentCosts(UPGRADE_DATA[UPGRADE_KEYS.rubyShardMoneyMultiplier].costs),
    isUnlocked: false,
    level: 0,
  },
} as const;
