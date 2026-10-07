import { defineUpgrades } from '../upgrade.utils';

export const RUBY_UPGRADES = defineUpgrades({
  rubySight: {
    name: 'Ruby sight',
    description: 'Find ruby shards more often',
    isResetOnPrestige: true,
    tags: ['rubies'],
    unlockConditions: [{ type: 'treeNode', node: 'rubyShards' }],
    costDividers: ['upgradeCostDivider', 'shardUpgradeCostDivider'],
    costTiers: [
      {
        levels: 10,
        costs: [{ resource: 'rubyShards', baseValue: 2, growth: 'add', growthValue: 2 }],
      },
      {
        levels: 15,
        costs: [
          { resource: 'rubyShards', growth: 'multiply', growthValue: 1.3 },
          { resource: 'crystalShards', baseValue: 200, growth: 'multiply', growthValue: 2.5 },
        ],
      },
    ],
    effects: [{ param: 'rubyShardChance', operation: 'add', value: 0.004 }],
  },
  bloodPolish: {
    name: 'Blood polish',
    description: 'Raise your money income to power',
    isResetOnPrestige: true,
    tags: ['money', 'rubies'],
    unlockConditions: [{ type: 'treeNode', node: 'rubyWorkshop' }],
    costDividers: ['upgradeCostDivider', 'shardUpgradeCostDivider'],
    costTiers: [
      {
        levels: 10,
        costs: [{ resource: 'rubyShards', baseValue: 5, growth: 'add', growthValue: 5 }],
      },
      {
        levels: 15,
        costs: [{ resource: 'rubyShards', growth: 'multiply', growthValue: 1.5 }],
      },
    ],
    effects: [{ param: 'moneyPower', operation: 'add', value: 0.02 }],
  },
  rubyCore: {
    name: 'Ruby core',
    description: 'More crystal shards from every drop and more ruby shards',
    isResetOnPrestige: true,
    tags: ['crystals', 'rubies'],
    unlockConditions: [{ type: 'treeNode', node: 'rubyCore' }],
    costDividers: ['upgradeCostDivider'],
    costTiers: [
      {
        levels: 5,
        costs: [{ resource: 'rubies', baseValue: 1, growth: 'add', growthValue: 1 }],
      },
    ],
    effects: [
      { param: 'shardsPerDrop', operation: 'add', value: 1 },
      { param: 'rubyShardChance', operation: 'add', value: 0.005 },
    ],
  },
});
