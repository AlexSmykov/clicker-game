import { defineUpgrades } from '../upgrade.utils';

export const PRESTIGE_UPGRADES = defineUpgrades({
  legacy: {
    name: 'Legacy',
    description: 'Every prestige you have made multiplies your money income',
    isResetOnPrestige: false,
    tags: ['money', 'prestige'],
    unlockConditions: [{ type: 'treeNode', node: 'legacy' }],
    costDividers: [],
    costTiers: [
      {
        levels: 10,
        costs: [{ resource: 'prestigePoints', baseValue: 5, growth: 'add', growthValue: 5 }],
      },
      {
        levels: 10,
        costs: [{ resource: 'prestigePoints', growth: 'multiply', growthValue: 1.5 }],
      },
    ],
    effects: [{ param: 'legacyFactor', operation: 'add', value: 1 }],
  },
  deepPockets: {
    name: 'Deep pockets',
    description: 'Get more prestige points',
    isResetOnPrestige: false,
    tags: ['prestige'],
    unlockConditions: [{ type: 'treeNode', node: 'legacy' }],
    costDividers: [],
    costTiers: [
      {
        levels: 5,
        costs: [{ resource: 'prestigePoints', baseValue: 20, growth: 'add', growthValue: 20 }],
      },
      {
        levels: 10,
        costs: [{ resource: 'prestigePoints', growth: 'multiply', growthValue: 1.8 }],
      },
    ],
    effects: [{ param: 'prestigePointsMultiplier', operation: 'multiply', value: 1.25 }],
  },
  momentum: {
    name: 'Momentum',
    description: 'Upgrades that are reset on prestige become cheaper',
    isResetOnPrestige: false,
    tags: ['prestige'],
    unlockConditions: [{ type: 'treeNode', node: 'legacy' }],
    costDividers: [],
    costTiers: [
      {
        levels: 5,
        costs: [{ resource: 'prestigePoints', baseValue: 15, growth: 'add', growthValue: 15 }],
      },
      {
        levels: 5,
        costs: [{ resource: 'prestigePoints', growth: 'multiply', growthValue: 2 }],
      },
    ],
    effects: [{ param: 'upgradeCostDivider', operation: 'multiply', value: 1.5 }],
  },
  ascension: {
    name: 'Ascension',
    description: 'Raise your money income to a higher power',
    isResetOnPrestige: false,
    tags: ['money', 'prestige'],
    unlockConditions: [{ type: 'treeNode', node: 'ambition' }],
    costDividers: [],
    costTiers: [
      {
        levels: 10,
        costs: [{ resource: 'prestigePoints', baseValue: 2, growth: 'add', growthValue: 2 }],
      },
      {
        levels: 40,
        costs: [{ resource: 'prestigePoints', growth: 'multiply', growthValue: 1.2 }],
      },
    ],
    effects: [{ param: 'moneyPower', operation: 'add', value: 0.01 }],
  },
  negotiator: {
    name: 'Negotiator',
    description: 'Lower the logarithm base of prestige points',
    isResetOnPrestige: false,
    tags: ['prestige'],
    unlockConditions: [{ type: 'treeNode', node: 'legacy' }],
    costDividers: [],
    costTiers: [
      {
        levels: 4,
        costs: [{ resource: 'prestigePoints', baseValue: 25, growth: 'add', growthValue: 25 }],
      },
      {
        levels: 4,
        costs: [{ resource: 'prestigePoints', growth: 'multiply', growthValue: 2 }],
      },
    ],
    effects: [{ param: 'prestigePointsLogBase', operation: 'subtract', value: 1 }],
  },
});
