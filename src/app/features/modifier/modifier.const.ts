import { keysOf } from '../../core/utils/record.utils';
import { ModifierData } from './modifier.type';

export const MODIFIER_LEVELS = [1, 2, 3] as const;

export const MODIFIER_DATA = {
  crystalFever: {
    name: 'Crystal fever',
    description: 'Crystal shards drop much more often, but money grows slower',
    iconPath: 'assets/icons/resources/crystal-shards.svg',
    bonuses: [
      {
        label: 'Crystal shard chance',
        param: 'crystalShardChanceMultiplier',
        operation: 'multiply',
        display: 'multiplier',
        values: [2, 4, 8],
      },
    ],
    penalties: [
      {
        label: 'Money power',
        param: 'moneyPowerReduction',
        operation: 'add',
        display: 'decrease',
        values: [0.1, 0.2, 0.3],
      },
    ],
  },
  goldenHands: {
    name: 'Golden hands',
    description: 'A lot more money, but shards almost stop dropping',
    iconPath: 'assets/icons/resources/money.svg',
    bonuses: [
      {
        label: 'Money',
        param: 'moneyBonusMultiplier',
        operation: 'multiply',
        display: 'multiplier',
        values: [10, 100, 1000],
      },
    ],
    penalties: [
      {
        label: 'Crystal shard chance',
        param: 'crystalShardChanceMultiplier',
        operation: 'multiply',
        display: 'multiplier',
        values: [0.25, 0.0625, 0.015_625],
      },
      {
        label: 'Ruby shard chance',
        param: 'rubyShardChance',
        operation: 'multiply',
        display: 'multiplier',
        values: [0.25, 0.0625, 0.015_625],
      },
    ],
  },
  rubyRush: {
    name: 'Ruby rush',
    description: 'Ruby shards drop more often at the cost of crystal shards',
    iconPath: 'assets/icons/resources/ruby-shards.svg',
    bonuses: [
      {
        label: 'Ruby shard chance',
        param: 'rubyShardChance',
        operation: 'multiply',
        display: 'multiplier',
        values: [2, 4, 8],
      },
    ],
    penalties: [
      {
        label: 'Crystal shard chance',
        param: 'crystalShardChanceMultiplier',
        operation: 'multiply',
        display: 'multiplier',
        values: [0.25, 0.0625, 0.015_625],
      },
    ],
  },
  jeweler: {
    name: 'Jeweler',
    description: 'Whole stones drop more often, but every drop brings less shards',
    iconPath: 'assets/icons/modifiers/jeweler.svg',
    bonuses: [
      {
        label: 'Crystal chance',
        param: 'crystalChance',
        operation: 'multiply',
        display: 'multiplier',
        values: [2, 4, 8],
      },
      {
        label: 'Ruby chance',
        param: 'rubyChance',
        operation: 'multiply',
        display: 'multiplier',
        values: [2, 4, 8],
      },
    ],
    penalties: [
      {
        label: 'Crystal shards per drop',
        param: 'shardsPerDrop',
        operation: 'multiply',
        display: 'multiplier',
        values: [0.25, 0.0625, 0.015_625],
      },
      {
        label: 'Ruby shards per drop',
        param: 'rubyShardsPerDrop',
        operation: 'multiply',
        display: 'multiplier',
        values: [0.25, 0.0625, 0.015_625],
      },
    ],
  },
  gambler: {
    name: 'Gambler',
    description: 'Critical clicks happen much more often, but crystal shards get rare',
    iconPath: 'assets/icons/modifiers/gambler.svg',
    bonuses: [
      {
        label: 'Critical click chance',
        param: 'critChance',
        operation: 'add',
        display: 'percent',
        values: [0.25, 0.5, 1],
      },
    ],
    penalties: [
      {
        label: 'Crystal shard chance',
        param: 'crystalShardChanceMultiplier',
        operation: 'multiply',
        display: 'multiplier',
        values: [0.25, 0.0625, 0.015_625],
      },
    ],
  },
  heavyStrike: {
    name: 'Heavy strike',
    description: 'Critical clicks hit much harder, but ruby shards get rare',
    iconPath: 'assets/icons/modifiers/heavy-strike.svg',
    bonuses: [
      {
        label: 'Critical click multiplier',
        param: 'critMultiplierPower',
        operation: 'multiply',
        display: 'power',
        values: [1.25, 1.5625, 1.953_125],
      },
    ],
    penalties: [
      {
        label: 'Ruby shard chance',
        param: 'rubyShardChance',
        operation: 'multiply',
        display: 'multiplier',
        values: [0.25, 0.0625, 0.015_625],
      },
    ],
  },
  prestigeHunter: {
    name: 'Prestige hunter',
    description: 'More prestige points, but the border is much further and stardust suffers',
    iconPath: 'assets/icons/resources/prestige-points.svg',
    bonuses: [
      {
        label: 'Prestige points',
        param: 'prestigePointsMultiplier',
        operation: 'multiply',
        display: 'multiplier',
        values: [2, 4, 8],
      },
    ],
    penalties: [
      {
        label: 'Prestige border',
        param: 'prestigeBorderPower',
        operation: 'multiply',
        display: 'power',
        values: [2, 4, 8],
      },
      {
        label: 'Stardust',
        param: 'stardustMultiplier',
        operation: 'multiply',
        display: 'multiplier',
        values: [0.25, 0.0625, 0.015_625],
      },
    ],
  },
  stargazer: {
    name: 'Stargazer',
    description: 'More stardust, but the border is much further and prestige points suffer',
    iconPath: 'assets/icons/resources/stardust.svg',
    bonuses: [
      {
        label: 'Stardust',
        param: 'stardustMultiplier',
        operation: 'multiply',
        display: 'multiplier',
        values: [2, 4, 8],
      },
    ],
    penalties: [
      {
        label: 'Prestige border',
        param: 'prestigeBorderPower',
        operation: 'multiply',
        display: 'power',
        values: [2, 4, 8],
      },
      {
        label: 'Prestige points',
        param: 'prestigePointsMultiplier',
        operation: 'multiply',
        display: 'multiplier',
        values: [0.25, 0.0625, 0.015_625],
      },
    ],
  },
  clearance: {
    name: 'Clearance',
    description: 'All upgrades get cheaper, but money and shards suffer',
    iconPath: 'assets/icons/modifiers/clearance.svg',
    bonuses: [
      {
        label: 'Upgrade costs',
        param: 'upgradeCostPower',
        operation: 'multiply',
        display: 'power',
        values: [0.9, 0.81, 0.729],
      },
    ],
    penalties: [
      {
        label: 'Money power',
        param: 'moneyPowerReduction',
        operation: 'add',
        display: 'decrease',
        values: [0.05, 0.1, 0.15],
      },
      {
        label: 'Crystal shard chance',
        param: 'crystalShardChanceMultiplier',
        operation: 'multiply',
        display: 'multiplier',
        values: [0.5, 0.25, 0.125],
      },
      {
        label: 'Ruby shard chance',
        param: 'rubyShardChance',
        operation: 'multiply',
        display: 'multiplier',
        values: [0.5, 0.25, 0.125],
      },
    ],
  },
  luckyStar: {
    name: 'Lucky star',
    description: 'Every chance is higher, but every amount and every prestige reward is lower',
    iconPath: 'assets/icons/modifiers/lucky-star.svg',
    bonuses: [
      {
        label: 'Critical click chance',
        param: 'critChance',
        operation: 'multiply',
        display: 'multiplier',
        values: [2, 4, 8],
      },
      {
        label: 'Crystal shard chance',
        param: 'crystalShardChanceMultiplier',
        operation: 'multiply',
        display: 'multiplier',
        values: [2, 4, 8],
      },
      {
        label: 'Ruby shard chance',
        param: 'rubyShardChance',
        operation: 'multiply',
        display: 'multiplier',
        values: [2, 4, 8],
      },
      {
        label: 'Crystal chance',
        param: 'crystalChance',
        operation: 'multiply',
        display: 'multiplier',
        values: [2, 4, 8],
      },
      {
        label: 'Ruby chance',
        param: 'rubyChance',
        operation: 'multiply',
        display: 'multiplier',
        values: [2, 4, 8],
      },
    ],
    penalties: [
      {
        label: 'Money',
        param: 'moneyBonusMultiplier',
        operation: 'multiply',
        display: 'multiplier',
        values: [0.5, 0.25, 0.125],
      },
      {
        label: 'Crystal shards per drop',
        param: 'shardsPerDrop',
        operation: 'multiply',
        display: 'multiplier',
        values: [0.5, 0.25, 0.125],
      },
      {
        label: 'Ruby shards per drop',
        param: 'rubyShardsPerDrop',
        operation: 'multiply',
        display: 'multiplier',
        values: [0.5, 0.25, 0.125],
      },
      {
        label: 'Prestige points',
        param: 'prestigePointsMultiplier',
        operation: 'multiply',
        display: 'multiplier',
        values: [0.25, 0.0625, 0.015_625],
      },
      {
        label: 'Stardust',
        param: 'stardustMultiplier',
        operation: 'multiply',
        display: 'multiplier',
        values: [0.25, 0.0625, 0.015_625],
      },
    ],
  },
  hoarder: {
    name: 'Hoarder',
    description: 'Every logarithm is much stronger, but upgrades start much more expensive',
    iconPath: 'assets/icons/modifiers/hoarder.svg',
    bonuses: [
      {
        label: 'Money log power',
        param: 'moneyLogPower',
        operation: 'add',
        display: 'increase',
        values: [1, 2, 3],
      },
      {
        label: 'Crystal shard log power',
        param: 'crystalShardLogPower',
        operation: 'add',
        display: 'increase',
        values: [1, 2, 3],
      },
      {
        label: 'Ruby shard log power',
        param: 'rubyShardLogPower',
        operation: 'add',
        display: 'increase',
        values: [1, 2, 3],
      },
      {
        label: 'PP log power',
        param: 'prestigeLogPower',
        operation: 'add',
        display: 'increase',
        values: [1, 2, 3],
      },
    ],
    penalties: [
      {
        label: 'Start cost power of money upgrades',
        param: 'moneyUpgradeStartCostPower',
        operation: 'add',
        display: 'increase',
        values: [1, 2, 3],
      },
      {
        label: 'Start cost of other upgrades',
        param: 'otherUpgradeStartCostMultiplier',
        operation: 'multiply',
        display: 'multiplier',
        values: [10, 100, 1000],
      },
    ],
  },
  sharpshooter: {
    name: 'Sharpshooter',
    description: 'Money grows much faster, but most of your clicks miss',
    iconPath: 'assets/icons/modifiers/sharpshooter.svg',
    bonuses: [
      {
        label: 'Money power',
        param: 'moneyPower',
        operation: 'multiply',
        display: 'multiplier',
        values: [1.1, 1.21, 1.331],
      },
    ],
    penalties: [
      {
        label: 'Hit chance',
        param: 'clickHitChance',
        operation: 'multiply',
        display: 'multiplier',
        values: [0.2, 0.04, 0.008],
      },
    ],
  },
  marathon: {
    name: 'Marathon',
    description: 'Money grows with every 100 clicks of a run and shrinks with every minute of it',
    iconPath: 'assets/icons/modifiers/marathon.svg',
    bonuses: [
      {
        label: 'Money per 100 clicks',
        param: 'marathonClickFactor',
        operation: 'multiply',
        display: 'multiplier',
        values: [1.1, 1.21, 1.331],
      },
    ],
    penalties: [
      {
        label: 'Money per minute on the tab',
        param: 'marathonTimeFactor',
        operation: 'multiply',
        display: 'multiplier',
        values: [1 / 1.1, 1 / 1.21, 1 / 1.331],
      },
    ],
  },
} satisfies Record<string, ModifierData>;

export const MODIFIER_KEYS = keysOf(MODIFIER_DATA);
