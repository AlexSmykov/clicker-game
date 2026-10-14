import { defineUpgrades } from '../upgrade.utils';

export const SYNERGY_UPGRADES = defineUpgrades({
  gildedShards: {
    name: 'Gilded shards',
    description: 'Every crystal shard drop also brings a part of your click income',
    isResetOnPrestige: true,
    tags: ['money', 'crystals'],
    unlockConditions: [{ type: 'treeNode', node: 'gildedShards' }],
    costDividers: ['upgradeCostDivider'],
    costTiers: [
      {
        levels: 20,
        costs: [
          { resource: 'money', baseValue: 10_000, growth: 'multiply', growthValue: 9 },
          { resource: 'crystalShards', baseValue: 25, growth: 'multiply', growthValue: 1.25 },
        ],
      },
    ],
    effects: [{ param: 'shardBountyFactor', operation: 'add', value: 0.1 }],
  },
  redInk: {
    name: 'Red ink',
    description: 'Every ruby shard drop brings more ruby shards',
    isResetOnPrestige: true,
    tags: ['money', 'rubies'],
    unlockConditions: [{ type: 'treeNode', node: 'redInk' }],
    costDividers: ['upgradeCostDivider'],
    costTiers: [
      {
        levels: 10,
        costs: [
          { resource: 'money', baseValue: 1e10, growth: 'multiply', growthValue: 20 },
          { resource: 'rubyShards', baseValue: 10, growth: 'add', growthValue: 10 },
        ],
      },
      {
        levels: 5,
        costs: [
          { resource: 'money', growth: 'power', growthValue: 1.3 },
          { resource: 'rubyShards', growth: 'multiply', growthValue: 1.4 },
        ],
      },
    ],
    effects: [{ param: 'rubyShardsPerDrop', operation: 'add', value: 0.5 }],
  },
  twinVeins: {
    name: 'Twin veins',
    description: 'A crystal shard drop can bring a ruby shard with it',
    isResetOnPrestige: true,
    tags: ['crystals', 'rubies'],
    unlockConditions: [{ type: 'treeNode', node: 'twinVeins' }],
    costDividers: ['upgradeCostDivider'],
    costTiers: [
      {
        levels: 10,
        costs: [
          { resource: 'crystalShards', baseValue: 50, growth: 'multiply', growthValue: 1.6 },
          { resource: 'rubyShards', baseValue: 2, growth: 'add', growthValue: 2 },
        ],
      },
      {
        levels: 5,
        costs: [
          { resource: 'crystalShards', growth: 'multiply', growthValue: 1.6 },
          { resource: 'rubyShards', growth: 'multiply', growthValue: 1.4 },
        ],
      },
    ],
    effects: [{ param: 'twinVeinChance', operation: 'add', value: 0.0025 }],
  },
});
