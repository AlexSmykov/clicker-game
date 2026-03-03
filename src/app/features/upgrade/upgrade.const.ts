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
  crystalMultiplier: 'crystalMultiplier',
  crystalChance: 'crystalChance',
  prestigeMoneyPower: 'prestigeMoneyPower',
  prestigeCrystalChance: 'prestigeCrystalChance',
  prestigeCrystalMultiplier: 'prestigeCrystalMultiplier',
} as const;

export const UPGRADE_DATA: Record<UpgradeKey, UpgradeData> = {
  [UPGRADE_KEYS.simpleMoneyMultiplier]: {
    name: 'Simple multiplier',
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
    ],
  },
  [UPGRADE_KEYS.simpleMoneyMultiplierBoost]: {
    name: 'Simple multiplier booster',
    description: 'Multiply your simple multiplier and upgrade effect',
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
    ],
  },
  [UPGRADE_KEYS.simpleMoneyPower]: {
    name: 'Simple power',
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
  [UPGRADE_KEYS.crystalMultiplier]: {
    name: 'Crystal power',
    description: 'Multiply your money income again',
    isResetOnPrestige: true,
    effects: [
      {
        paramKey: PARAM_KEYS.crystalMoneyMultiplier,
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
            resource: RESOURCE_KEYS.crystal,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
              value: new ExponentNumber(0, 2),
            },
          },
        ],
      },
    ],
  },
  [UPGRADE_KEYS.crystalChance]: {
    name: 'Crystal chance',
    description: 'Increase you chance to get crystal on click',
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
            resource: RESOURCE_KEYS.crystal,
            change: {
              changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
              value: new ExponentNumber(0, 1),
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
          value: new ExponentNumber(0, 0.01),
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
    name: 'Frequent crystals',
    description: 'More chance to gain crystal on click',
    isResetOnPrestige: false,
    effects: [
      {
        paramKey: PARAM_KEYS.prestigeCrystalChance,
        change: {
          changeType: SIMPLE_VALUE_CHANGE_KEYS.plus,
          value: new ExponentNumber(0, 20000),
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
  [UPGRADE_KEYS.prestigeCrystalMultiplier]: {
    name: 'Crystal clone machine',
    description: 'Multiplies crystals on click, nice',
    isResetOnPrestige: false,
    effects: [
      {
        paramKey: PARAM_KEYS.prestigeCrystalMultiplier,
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
  [UPGRADE_KEYS.crystalMultiplier]: {
    costs: transformCostToCurrentCosts(UPGRADE_DATA[UPGRADE_KEYS.crystalMultiplier].costs),
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
  [UPGRADE_KEYS.prestigeCrystalMultiplier]: {
    costs: transformCostToCurrentCosts(UPGRADE_DATA[UPGRADE_KEYS.prestigeCrystalMultiplier].costs),
    isUnlocked: false,
    level: 0,
  },
} as const;
