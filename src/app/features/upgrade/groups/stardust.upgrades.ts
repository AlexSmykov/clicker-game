import { defineUpgrades } from '../upgrade.utils';

export const STARDUST_UPGRADES = defineUpgrades({
  starMap: {
    name: 'Star map',
    description: 'Every stardust you hold multiplies your money income',
    isResetOnPrestige: false,
    tags: ['money', 'stardust'],
    unlockConditions: [{ type: 'treeNode', node: 'stardust' }],
    costDividers: [],
    costTiers: [
      {
        levels: 20,
        costs: [{ resource: 'stardust', baseValue: 250, growth: 'multiply', growthValue: 1.4 }],
      },
    ],
    effects: [{ param: 'starMapFactor', operation: 'add', value: 0.1 }],
  },
  meteorShower: {
    name: 'Meteor shower',
    description: 'Every drop brings more crystal shards',
    isResetOnPrestige: false,
    tags: ['crystals', 'stardust'],
    unlockConditions: [{ type: 'treeNode', node: 'observatory' }],
    costDividers: [],
    costTiers: [
      {
        levels: 20,
        costs: [{ resource: 'stardust', baseValue: 200, growth: 'multiply', growthValue: 1.4 }],
      },
    ],
    effects: [{ param: 'shardsPerDrop', operation: 'add', value: 1 }],
  },
  cosmicPrism: {
    name: 'Cosmic prism',
    description: 'A dropped shard turns into a whole crystal more often',
    isResetOnPrestige: false,
    tags: ['crystals', 'stardust'],
    unlockConditions: [{ type: 'treeNode', node: 'observatory' }],
    costDividers: [],
    costTiers: [
      {
        levels: 15,
        costs: [{ resource: 'stardust', baseValue: 500, growth: 'multiply', growthValue: 1.5 }],
      },
    ],
    effects: [{ param: 'crystalStoneChance', operation: 'multiply', value: 1.05 }],
  },
  darkMatter: {
    name: 'Dark matter',
    description: 'Upgrades bought for shards become cheaper',
    isResetOnPrestige: false,
    tags: ['crystals', 'rubies', 'stardust'],
    unlockConditions: [{ type: 'treeNode', node: 'observatory' }],
    costDividers: [],
    costTiers: [
      {
        levels: 12,
        costs: [{ resource: 'stardust', baseValue: 3000, growth: 'multiply', growthValue: 1.6 }],
      },
    ],
    effects: [{ param: 'shardUpgradeCostDivider', operation: 'multiply', value: 1.5 }],
  },
  redGiant: {
    name: 'Red giant',
    description: 'Find ruby shards more often',
    isResetOnPrestige: false,
    tags: ['rubies', 'stardust'],
    unlockConditions: [{ type: 'treeNode', node: 'redSky' }],
    costDividers: [],
    costTiers: [
      {
        levels: 15,
        costs: [{ resource: 'stardust', baseValue: 5000, growth: 'multiply', growthValue: 1.5 }],
      },
    ],
    effects: [{ param: 'rubyShardChance', operation: 'multiply', value: 1.05 }],
  },
  rubyHeart: {
    name: 'Ruby heart',
    description: 'A dropped shard turns into a whole ruby more often',
    isResetOnPrestige: false,
    tags: ['rubies', 'stardust'],
    unlockConditions: [{ type: 'treeNode', node: 'redSky' }],
    costDividers: [],
    costTiers: [
      {
        levels: 10,
        costs: [{ resource: 'stardust', baseValue: 10_000, growth: 'multiply', growthValue: 1.6 }],
      },
    ],
    effects: [{ param: 'rubyStoneChance', operation: 'multiply', value: 1.05 }],
  },
  nebula: {
    name: 'Nebula',
    description: 'Get more prestige points',
    isResetOnPrestige: false,
    tags: ['prestige', 'stardust'],
    unlockConditions: [{ type: 'treeNode', node: 'eventHorizon' }],
    costDividers: [],
    costTiers: [
      {
        levels: 12,
        costs: [{ resource: 'stardust', baseValue: 35_000, growth: 'multiply', growthValue: 1.6 }],
      },
    ],
    effects: [{ param: 'prestigePointsMultiplier', operation: 'multiply', value: 1.3 }],
  },
  supernova: {
    name: 'Supernova',
    description: 'Get more stardust on prestige',
    isResetOnPrestige: false,
    tags: ['stardust'],
    unlockConditions: [{ type: 'treeNode', node: 'eventHorizon' }],
    costDividers: [],
    costTiers: [
      {
        levels: 10,
        costs: [{ resource: 'stardust', baseValue: 25_000, growth: 'multiply', growthValue: 1.6 }],
      },
    ],
    effects: [{ param: 'stardustMultiplier', operation: 'multiply', value: 1.2 }],
  },
  gravityWell: {
    name: 'Gravity well',
    description: 'The prestige border grows slower',
    isResetOnPrestige: false,
    tags: ['prestige', 'stardust'],
    unlockConditions: [{ type: 'treeNode', node: 'eventHorizon' }],
    costDividers: [],
    costTiers: [
      {
        levels: 10,
        costs: [{ resource: 'stardust', baseValue: 100_000, growth: 'multiply', growthValue: 1.8 }],
      },
    ],
    effects: [{ param: 'prestigeBorderGrowth', operation: 'multiply', value: 0.995 }],
  },
  startingCapital: {
    name: 'Starting capital',
    description: 'Start every run with some money',
    isResetOnPrestige: false,
    tags: ['money', 'stardust'],
    unlockConditions: [{ type: 'treeNode', node: 'singularity' }],
    costDividers: [],
    costTiers: [
      {
        levels: 15,
        costs: [{ resource: 'stardust', baseValue: 2_500, growth: 'multiply', growthValue: 1.6 }],
      },
    ],
    effects: [{ param: 'startingCapitalMultiplier', operation: 'multiply', value: 100 }],
  },
});
