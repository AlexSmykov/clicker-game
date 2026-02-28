import { Upgrade, UpgradeCurrentData, UpgradeKey } from 'src/app/features/upgrade/upgrade.type';
import { ExponentNumber } from 'exponential-number';
import { RESOURCE_KEYS } from 'src/app/features/resource/resource.const';
import { SIMPLE_VALUE_CHANGE_KEYS } from 'src/app/core/consts/value-change.const';
import { PARAM_KEYS } from 'src/app/features/param/param.const';
import { transformCostToCurrentCosts } from 'src/app/features/upgrade/upgrade.utils';

export const UPGRADE_KEYS = {
  simpleMultiplier: 'simpleMultiplier',
  crystalMultiplier: 'crystalMultiplier',
  simplePower: 'simplePower',
  crystalChance: 'crystalChance',
  simpleMultiplierBoost: 'simpleMultiplierBoost',
} as const;

export const UPGRADE_DATA: Record<UpgradeKey, Upgrade> = {
  [UPGRADE_KEYS.simpleMultiplier]: {
    name: 'Simple multiplier',
    description: 'Add simple multiplier to your income',
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
  [UPGRADE_KEYS.simpleMultiplierBoost]: {
    name: 'Simple multiplier booster',
    description: 'Multiply your simple multiplier and upgrade effect',
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
            defaultValue: new ExponentNumber(0, 1000),
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
  [UPGRADE_KEYS.simplePower]: {
    name: 'Simple power',
    description: 'Raise your money income to power',
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
};

export const UPGRADE_CURRENT_DATA: Record<UpgradeKey, UpgradeCurrentData> = {
  [UPGRADE_KEYS.simpleMultiplier]: {
    costs: transformCostToCurrentCosts(UPGRADE_DATA[UPGRADE_KEYS.simpleMultiplier].costs),
    level: 0,
  },
  [UPGRADE_KEYS.simpleMultiplierBoost]: {
    costs: transformCostToCurrentCosts(UPGRADE_DATA[UPGRADE_KEYS.simpleMultiplierBoost].costs),
    level: 0,
  },
  [UPGRADE_KEYS.simplePower]: {
    costs: transformCostToCurrentCosts(UPGRADE_DATA[UPGRADE_KEYS.simplePower].costs),
    level: 0,
  },
  [UPGRADE_KEYS.crystalMultiplier]: {
    costs: transformCostToCurrentCosts(UPGRADE_DATA[UPGRADE_KEYS.crystalMultiplier].costs),
    level: 0,
  },
  [UPGRADE_KEYS.crystalChance]: {
    costs: transformCostToCurrentCosts(UPGRADE_DATA[UPGRADE_KEYS.crystalChance].costs),
    level: 0,
  },
} as const;
