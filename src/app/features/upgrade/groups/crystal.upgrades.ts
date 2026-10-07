import { defineUpgrades } from '../upgrade.utils';

export const CRYSTAL_UPGRADES = defineUpgrades({
  prospector: {
    name: 'Prospector',
    description: 'Find crystal shards more often',
    isResetOnPrestige: true,
    tags: ['crystals'],
    unlockConditions: [{ type: 'treeNode', node: 'crystalShards' }],
    costDividers: ['upgradeCostDivider', 'shardUpgradeCostDivider'],
    costTiers: [
      {
        levels: 25,
        costs: [{ resource: 'crystalShards', baseValue: 10, growth: 'multiply', growthValue: 1.3 }],
      },
      {
        levels: 25,
        costs: [
          { resource: 'crystalShards', growth: 'multiply', growthValue: 1.6 },
          { resource: 'money', baseValue: 'e30', growth: 'power', growthValue: 1.1 },
        ],
      },
    ],
    effects: [{ param: 'crystalShardChance', operation: 'add', value: 0.02 }],
  },
  resonance: {
    name: 'Resonance',
    description: 'The more crystal shards you hold, the more often they drop',
    isResetOnPrestige: true,
    tags: ['crystals'],
    unlockConditions: [{ type: 'treeNode', node: 'resonance' }],
    costDividers: ['upgradeCostDivider', 'shardUpgradeCostDivider'],
    costTiers: [
      {
        levels: 25,
        costs: [
          { resource: 'crystalShards', baseValue: 100, growth: 'multiply', growthValue: 1.5 },
        ],
      },
    ],
    effects: [{ param: 'crystalShardSelfFactor', operation: 'add', value: 0.01 }],
  },
  shardSack: {
    name: 'Shard sack',
    description: 'Every drop brings more crystal shards',
    isResetOnPrestige: true,
    tags: ['crystals'],
    unlockConditions: [{ type: 'treeNode', node: 'shardEconomy' }],
    costDividers: ['upgradeCostDivider', 'shardUpgradeCostDivider'],
    costTiers: [
      {
        levels: 30,
        costs: [{ resource: 'crystalShards', baseValue: 10, growth: 'multiply', growthValue: 1.5 }],
      },
    ],
    effects: [{ param: 'shardsPerDrop', operation: 'add', value: 1 }],
  },
  shinyRock: {
    name: 'Shiny rock',
    description: 'Multiply your money income on each level',
    isResetOnPrestige: true,
    tags: ['money', 'crystals'],
    unlockConditions: [{ type: 'treeNode', node: 'crystalShards' }],
    costDividers: ['upgradeCostDivider', 'shardUpgradeCostDivider'],
    costTiers: [
      {
        levels: 30,
        costs: [{ resource: 'crystalShards', baseValue: 5, growth: 'multiply', growthValue: 2.2 }],
      },
    ],
    effects: [{ param: 'moneyBonusMultiplier', operation: 'multiply', value: 1.5 }],
  },
  bargain: {
    name: 'Bargain',
    description: 'Upgrades bought for money become cheaper',
    isResetOnPrestige: true,
    tags: ['money', 'crystals'],
    unlockConditions: [{ type: 'treeNode', node: 'shardEconomy' }],
    costDividers: ['upgradeCostDivider', 'shardUpgradeCostDivider'],
    costTiers: [
      {
        levels: 25,
        costs: [{ resource: 'crystalShards', baseValue: 20, growth: 'multiply', growthValue: 2 }],
      },
    ],
    effects: [{ param: 'moneyUpgradeCostDivider', operation: 'multiply', value: 1.25 }],
  },
  fusion: {
    name: 'Fusion',
    description: 'A dropped shard turns into a whole crystal more often',
    isResetOnPrestige: true,
    tags: ['crystals'],
    unlockConditions: [{ type: 'treeNode', node: 'crystals' }],
    costDividers: ['upgradeCostDivider', 'shardUpgradeCostDivider'],
    costTiers: [
      {
        levels: 20,
        costs: [{ resource: 'crystalShards', baseValue: 250, growth: 'multiply', growthValue: 2 }],
      },
    ],
    effects: [{ param: 'crystalStoneChance', operation: 'add', value: 0.0025 }],
  },
  crystalLens: {
    name: 'Crystal lens',
    description: 'Every crystal you hold multiplies your money income',
    isResetOnPrestige: true,
    tags: ['money', 'crystals'],
    unlockConditions: [{ type: 'treeNode', node: 'crystals' }],
    costDividers: ['upgradeCostDivider'],
    costTiers: [
      {
        levels: 5,
        costs: [{ resource: 'crystals', baseValue: 1, growth: 'add', growthValue: 1 }],
      },
      {
        levels: 5,
        costs: [{ resource: 'crystals', growth: 'multiply', growthValue: 1.5 }],
      },
    ],
    effects: [{ param: 'crystalLensFactor', operation: 'add', value: 0.5 }],
  },
});
