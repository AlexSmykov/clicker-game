import { defineUpgrades } from '../upgrade.utils';

export const MONEY_UPGRADES = defineUpgrades({
  moneyMultiplier: {
    name: 'Money multiplier',
    description: 'Add simple multiplier to your income',
    isResetOnPrestige: true,
    tags: ['money'],
    unlockConditions: [],
    costDividers: ['upgradeCostDivider', 'moneyUpgradeCostDivider'],
    costTiers: [
      {
        levels: 50,
        costs: [{ resource: 'money', baseValue: 10, growth: 'multiply', growthValue: 1.6 }],
      },
      { levels: 100, costs: [{ resource: 'money', growth: 'multiply', growthValue: 2.5 }] },
      { levels: 350, costs: [{ resource: 'money', growth: 'multiply', growthValue: 5 }] },
    ],
    effects: [
      { param: 'moneyMultiplier', operation: 'add', value: { param: 'moneyMultiplierIncrement' } },
      {
        param: 'moneyBonusMultiplier',
        operation: 'multiply',
        value: { param: 'moneyMultiplierLevelFactor' },
      },
    ],
  },
  moneyMultiplierBoost: {
    name: 'Money booster',
    description: 'Multiply the effect of every Money multiplier level',
    isResetOnPrestige: true,
    tags: ['money'],
    unlockConditions: [{ type: 'upgradeLevel', upgrade: 'moneyMultiplier', level: 10 }],
    costDividers: ['upgradeCostDivider', 'moneyUpgradeCostDivider'],
    costTiers: [
      {
        levels: 20,
        costs: [{ resource: 'money', baseValue: 500, growth: 'multiply', growthValue: 25 }],
      },
      { levels: 30, costs: [{ resource: 'money', growth: 'multiply', growthValue: 300 }] },
    ],
    effects: [{ param: 'moneyMultiplierIncrement', operation: 'multiply', value: 2 }],
  },
  luckyClick: {
    name: 'Lucky click',
    description: 'Clicks get a chance to be critical',
    isResetOnPrestige: true,
    tags: ['money'],
    unlockConditions: [{ type: 'treeNode', node: 'luckyHand' }],
    costDividers: ['upgradeCostDivider', 'moneyUpgradeCostDivider'],
    costTiers: [
      {
        levels: 20,
        costs: [{ resource: 'money', baseValue: 5000, growth: 'multiply', growthValue: 4 }],
      },
      { levels: 30, costs: [{ resource: 'money', growth: 'multiply', growthValue: 8 }] },
      { levels: 50, costs: [{ resource: 'money', growth: 'multiply', growthValue: 20 }] },
    ],
    effects: [{ param: 'critChance', operation: 'add', value: 0.01 }],
  },
  criticalForce: {
    name: 'Critical force',
    description: 'Critical clicks hit harder',
    isResetOnPrestige: true,
    tags: ['money'],
    unlockConditions: [{ type: 'treeNode', node: 'heavyHand' }],
    costDividers: ['upgradeCostDivider', 'moneyUpgradeCostDivider'],
    costTiers: [
      {
        levels: 30,
        costs: [{ resource: 'money', baseValue: 50_000, growth: 'multiply', growthValue: 5 }],
      },
      { levels: 40, costs: [{ resource: 'money', growth: 'multiply', growthValue: 10 }] },
      { levels: 80, costs: [{ resource: 'money', growth: 'multiply', growthValue: 25 }] },
    ],
    effects: [{ param: 'critMultiplier', operation: 'add', value: 0.05 }],
  },
  fingerTraining: {
    name: 'Finger training',
    description: 'The more you click in a run, the more you earn',
    isResetOnPrestige: true,
    tags: ['money'],
    unlockConditions: [{ type: 'treeNode', node: 'routine' }],
    costDividers: ['upgradeCostDivider', 'moneyUpgradeCostDivider'],
    costTiers: [
      {
        levels: 20,
        costs: [{ resource: 'money', baseValue: 2000, growth: 'multiply', growthValue: 5 }],
      },
    ],
    effects: [{ param: 'clickStreakBonus', operation: 'add', value: 0.01 }],
  },
  powerDrink: {
    name: 'Power drink',
    description: 'Raise your money income to power',
    isResetOnPrestige: true,
    tags: ['money'],
    unlockConditions: [{ type: 'treeNode', node: 'power' }],
    costDividers: ['upgradeCostDivider', 'moneyUpgradeCostDivider'],
    costTiers: [
      {
        levels: 20,
        costs: [{ resource: 'money', baseValue: 1e6, growth: 'power', growthValue: 1.4 }],
      },
    ],
    effects: [{ param: 'moneyPower', operation: 'add', value: 0.05 }],
  },
});
