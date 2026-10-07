import { defineUpgrades } from '../upgrade.utils';

export const LOGARITHM_UPGRADES = defineUpgrades({
  moneyLogBase: {
    name: 'Money log base',
    description: 'Decrease base of log(money) multiplier',
    isResetOnPrestige: true,
    tags: ['money'],
    unlockConditions: [{ type: 'treeNode', node: 'goldenLogarithm' }],
    costDividers: ['upgradeCostDivider', 'moneyUpgradeCostDivider'],
    costTiers: [
      {
        levels: 10,
        costs: [{ resource: 'money', baseValue: 'e9', growth: 'power', growthValue: 1.2 }],
      },
      {
        levels: 10,
        costs: [{ resource: 'money', baseValue: 'e100', growth: 'power', growthValue: 2 }],
      },
    ],
    effects: [{ param: 'moneyLogBase', operation: 'multiply', value: 0.667 }],
  },
  moneyLogPower: {
    name: 'Money log power',
    description: 'Raise log(money) to power',
    isResetOnPrestige: true,
    tags: ['money', 'crystals'],
    unlockConditions: [{ type: 'treeNode', node: 'goldenLogarithm' }],
    costDividers: ['upgradeCostDivider', 'shardUpgradeCostDivider'],
    costTiers: [
      {
        levels: 10,
        costs: [{ resource: 'crystalShards', baseValue: 10, growth: 'multiply', growthValue: 1.4 }],
      },
      {
        levels: 20,
        costs: [
          { resource: 'crystalShards', baseValue: 250, growth: 'multiply', growthValue: 1.25 },
        ],
      },
    ],
    effects: [{ param: 'moneyLogPower', operation: 'add', value: 0.5 }],
  },
  crystalShardLogBase: {
    name: 'Crystal shard log base',
    description: 'Decrease base of log(crystal shards) multiplier',
    isResetOnPrestige: true,
    tags: ['money', 'crystals'],
    unlockConditions: [{ type: 'treeNode', node: 'crystalLogarithm' }],
    costDividers: ['upgradeCostDivider', 'shardUpgradeCostDivider'],
    costTiers: [
      {
        levels: 9,
        costs: [
          { resource: 'crystalShards', baseValue: 150, growth: 'multiply', growthValue: 1.8 },
        ],
      },
      {
        levels: 15,
        costs: [
          { resource: 'crystalShards', baseValue: 50_000, growth: 'multiply', growthValue: 3 },
        ],
      },
    ],
    effects: [{ param: 'crystalShardLogBase', operation: 'multiply', value: 0.667 }],
  },
  crystalShardLogPower: {
    name: 'Crystal shard log power',
    description: 'Raise log(crystal shards) to power',
    isResetOnPrestige: true,
    tags: ['money', 'crystals'],
    unlockConditions: [{ type: 'treeNode', node: 'crystalLogarithm' }],
    costDividers: ['upgradeCostDivider'],
    costTiers: [
      {
        levels: 9,
        costs: [
          { resource: 'money', baseValue: 'e9', growth: 'power', growthValue: 1.4 },
          { resource: 'crystalShards', baseValue: 250, growth: 'multiply', growthValue: 2 },
        ],
      },
      {
        levels: 10,
        costs: [
          { resource: 'money', baseValue: 'e100', growth: 'power', growthValue: 1.8 },
          { resource: 'crystalShards', baseValue: 200_000, growth: 'multiply', growthValue: 3 },
        ],
      },
    ],
    effects: [{ param: 'crystalShardLogPower', operation: 'add', value: 0.5 }],
  },
  rubyShardLogBase: {
    name: 'Ruby shard log base',
    description: 'Decrease base of log(ruby shards) multiplier',
    isResetOnPrestige: true,
    tags: ['money', 'rubies'],
    unlockConditions: [{ type: 'treeNode', node: 'rubyLogarithm' }],
    costDividers: ['upgradeCostDivider', 'shardUpgradeCostDivider'],
    costTiers: [
      {
        levels: 6,
        costs: [{ resource: 'rubyShards', baseValue: 2, growth: 'add', growthValue: 2 }],
      },
      {
        levels: 3,
        costs: [{ resource: 'rubyShards', growth: 'multiply', growthValue: 1.5 }],
      },
    ],
    effects: [{ param: 'rubyShardLogBase', operation: 'multiply', value: 0.571 }],
  },
  rubyShardLogPower: {
    name: 'Ruby shard log power',
    description: 'Raise log(ruby shards) to power',
    isResetOnPrestige: true,
    tags: ['money', 'rubies'],
    unlockConditions: [{ type: 'treeNode', node: 'rubyLogarithm' }],
    costDividers: ['upgradeCostDivider', 'shardUpgradeCostDivider'],
    costTiers: [
      {
        levels: 6,
        costs: [
          { resource: 'crystalShards', baseValue: 50, growth: 'multiply', growthValue: 1.4 },
          { resource: 'rubyShards', baseValue: 3, growth: 'add', growthValue: 3 },
        ],
      },
      {
        levels: 3,
        costs: [
          { resource: 'crystalShards', growth: 'multiply', growthValue: 1.4 },
          { resource: 'rubyShards', growth: 'multiply', growthValue: 1.5 },
        ],
      },
    ],
    effects: [{ param: 'rubyShardLogPower', operation: 'add', value: 1 }],
  },
  prestigeLogBase: {
    name: 'PP log base',
    description: 'Decrease base of log(PP) multiplier',
    isResetOnPrestige: false,
    tags: ['money', 'prestige'],
    unlockConditions: [{ type: 'treeNode', node: 'prestigeLogarithm' }],
    costDividers: [],
    costTiers: [
      {
        levels: 10,
        costs: [{ resource: 'prestigePoints', baseValue: 15, growth: 'add', growthValue: 10 }],
      },
      {
        levels: 10,
        costs: [
          { resource: 'prestigePoints', baseValue: 500, growth: 'multiply', growthValue: 1.8 },
        ],
      },
    ],
    effects: [{ param: 'prestigeLogBase', operation: 'multiply', value: 0.667 }],
  },
  prestigeLogPower: {
    name: 'PP log power',
    description: 'Raise log(PP) to power',
    isResetOnPrestige: false,
    tags: ['money', 'prestige'],
    unlockConditions: [{ type: 'treeNode', node: 'prestigeLogarithm' }],
    costDividers: [],
    costTiers: [
      {
        levels: 9,
        costs: [{ resource: 'prestigePoints', baseValue: 50, growth: 'add', growthValue: 25 }],
      },
      {
        levels: 15,
        costs: [
          { resource: 'prestigePoints', baseValue: 500, growth: 'multiply', growthValue: 1.5 },
        ],
      },
    ],
    effects: [{ param: 'prestigeLogPower', operation: 'add', value: 0.5 }],
  },
});
