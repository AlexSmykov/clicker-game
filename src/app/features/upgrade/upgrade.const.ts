import { keysOf } from '../../core/utils/record.utils';
import { defineUpgrades } from './upgrade.utils';

export const UPGRADE_DATA = defineUpgrades({
  moneyMultiplier: {
    name: 'Money multiplier',
    description: 'Add simple multiplier to your income',
    isResetOnPrestige: true,
    tags: ['money'],
    unlockConditions: [],
    costDividers: ['upgradeCostDivider'],
    costTiers: [
      {
        levels: 100,
        costs: [{ resource: 'money', baseValue: 10, growth: 'multiply', growthValue: 2 }],
      },
      {
        levels: 300,
        costs: [{ resource: 'money', baseValue: 'e35', growth: 'multiply', growthValue: 4 }],
      },
      {
        levels: 790,
        costs: [{ resource: 'money', baseValue: 'e210', growth: 'multiply', growthValue: 10 }],
      },
    ],
    effects: [
      { param: 'moneyMultiplier', operation: 'add', value: { param: 'moneyMultiplierIncrement' } },
    ],
  },
  moneyMultiplierBoost: {
    name: 'Money booster',
    description: 'Multiply your simple multiplier effect',
    isResetOnPrestige: true,
    tags: ['money'],
    unlockConditions: [{ type: 'upgradeLevel', upgrade: 'moneyMultiplier', level: 5 }],
    costDividers: ['upgradeCostDivider'],
    costTiers: [
      {
        levels: 50,
        costs: [{ resource: 'money', baseValue: 500, growth: 'multiply', growthValue: 20 }],
      },
      {
        levels: 200,
        costs: [{ resource: 'money', baseValue: 'e70', growth: 'multiply', growthValue: 400 }],
      },
    ],
    effects: [{ param: 'moneyMultiplierIncrement', operation: 'multiply', value: 3 }],
  },
  moneyPower: {
    name: 'Power drink',
    description: 'Raise your money income to power',
    isResetOnPrestige: true,
    tags: ['money'],
    unlockConditions: [{ type: 'resource', resource: 'money', amount: 1e5 }],
    costDividers: ['upgradeCostDivider'],
    costTiers: [
      {
        levels: 30,
        costs: [{ resource: 'money', baseValue: 1e6, growth: 'power', growthValue: 1.5 }],
      },
    ],
    effects: [{ param: 'moneyPower', operation: 'add', value: 0.1 }],
  },
  upgradeDiscount: {
    name: 'Bargain',
    description: 'Make other upgrades cheaper',
    isResetOnPrestige: true,
    tags: ['money'],
    unlockConditions: [{ type: 'resource', resource: 'money', amount: 500 }],
    costDividers: [],
    costTiers: [
      {
        levels: 5,
        costs: [{ resource: 'money', baseValue: 1000, growth: 'multiply', growthValue: 10 }],
      },
      {
        levels: 15,
        costs: [{ resource: 'money', growth: 'multiply', growthValue: 100 }],
      },
    ],
    effects: [{ param: 'upgradeCostDivider', operation: 'multiply', value: 1.5 }],
  },
});

export const UPGRADE_KEYS = keysOf(UPGRADE_DATA);
