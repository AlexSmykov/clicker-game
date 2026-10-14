import { defineUpgrades } from '../upgrade.utils';

export const GEM_UPGRADES = defineUpgrades({
  rubyCrown: {
    name: 'Ruby crown',
    description: 'Rubies multiply your money income',
    isResetOnPrestige: true,
    tags: ['money', 'rubies'],
    unlockConditions: [{ type: 'treeNode', node: 'gemTrade' }],
    costDividers: [],
    costTiers: [
      {
        levels: 10,
        costs: [{ resource: 'rubies', baseValue: 2, growth: 'add', growthValue: 2 }],
      },
      {
        levels: 10,
        costs: [{ resource: 'rubies', growth: 'multiply', growthValue: 1.3 }],
      },
    ],
    effects: [{ param: 'moneyBonusMultiplier', operation: 'multiply', value: 3 }],
  },
  royalSeal: {
    name: 'Royal seal',
    description: 'Get more prestige points',
    isResetOnPrestige: true,
    tags: ['prestige', 'rubies'],
    unlockConditions: [{ type: 'treeNode', node: 'gemTrade' }],
    costDividers: [],
    costTiers: [
      {
        levels: 10,
        costs: [{ resource: 'rubies', baseValue: 10, growth: 'multiply', growthValue: 1.5 }],
      },
    ],
    effects: [{ param: 'prestigePointsMultiplier', operation: 'add', value: 0.05 }],
  },
  faceting: {
    name: 'Faceting',
    description: 'Every crystal shard drop brings more shards',
    isResetOnPrestige: true,
    tags: ['crystals'],
    unlockConditions: [{ type: 'treeNode', node: 'gemTrade' }],
    costDividers: [],
    costTiers: [
      {
        levels: 10,
        costs: [{ resource: 'crystals', baseValue: 5, growth: 'add', growthValue: 5 }],
      },
      {
        levels: 10,
        costs: [{ resource: 'crystals', growth: 'multiply', growthValue: 1.3 }],
      },
    ],
    effects: [{ param: 'shardsPerDrop', operation: 'multiply', value: 1.5 }],
  },
  wholesale: {
    name: 'Wholesale',
    description: 'Upgrades that are reset on prestige become cheaper',
    isResetOnPrestige: true,
    tags: ['crystals', 'rubies'],
    unlockConditions: [{ type: 'treeNode', node: 'gemTrade' }],
    costDividers: [],
    costTiers: [
      {
        levels: 10,
        costs: [
          { resource: 'crystals', baseValue: 10, growth: 'multiply', growthValue: 1.5 },
          { resource: 'rubies', baseValue: 3, growth: 'multiply', growthValue: 1.5 },
        ],
      },
    ],
    effects: [{ param: 'upgradeCostDivider', operation: 'multiply', value: 2 }],
  },
});
