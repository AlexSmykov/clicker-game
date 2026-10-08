import { ExponentNumber } from 'exponential-number';

import { keysOf } from '../../core/utils/record.utils';
import { calculatePrestigeBorder, calculatePrestigePointsGain } from '../prestige/prestige.utils';
import { defineParams, logarithmMultiplier } from './param.utils';

const SELF_BOOST_MIN_AMOUNT = 10;
const STARTING_CAPITAL_BASE = 10;
const MARATHON_CLICKS_STEP = 100;
const MARATHON_SECONDS_STEP = 60;

export const PARAM_DATA = defineParams({
  moneyMultiplier: {
    name: 'Money multiplier',
    format: 'multiplier',
    baseValue: 1,
  },
  moneyMultiplierIncrement: {
    name: 'Money multiplier increment',
    format: 'multiplier',
    baseValue: 1,
  },
  moneyMultiplierLevelFactor: {
    name: 'Money multiplier level factor',
    format: 'multiplier',
    baseValue: 1,
  },
  moneyBonusMultiplier: {
    name: 'Bonus money multiplier',
    format: 'multiplier',
    baseValue: 1,
  },
  moneyPower: {
    name: 'Money power',
    format: 'power',
    baseValue: 1,
  },
  moneyPowerReduction: {
    name: 'Money power reduction',
    format: 'plain',
    baseValue: 0,
  },
  clickStreakBonus: {
    name: 'Bonus per 100 clicks in a run',
    format: 'percent',
    baseValue: 0,
  },
  clickStreakMultiplier: {
    name: 'Click streak multiplier',
    format: 'multiplier',
    formula: ({ param, stat }) =>
      stat('runClicks').divide(100).floor().multiply(param('clickStreakBonus')).plus(1),
  },
  crystalLensFactor: {
    name: 'Bonus per crystal',
    format: 'percent',
    baseValue: 0,
  },
  crystalLensMultiplier: {
    name: 'Crystal lens multiplier',
    format: 'multiplier',
    formula: ({ param, resource }) =>
      resource('crystals').multiply(param('crystalLensFactor')).plus(1),
  },
  moneyLogLevel: {
    name: 'Money logarithm level',
    format: 'plain',
    baseValue: 0,
  },
  moneyLogBase: {
    name: 'Money log base',
    format: 'plain',
    baseValue: 10,
  },
  moneyLogPower: {
    name: 'Money log power',
    format: 'power',
    baseValue: 1,
  },
  moneyLogMultiplier: {
    name: 'Money log multiplier',
    format: 'multiplier',
    formula: logarithmMultiplier('money', 'moneyLogLevel', 'moneyLogBase', 'moneyLogPower'),
  },
  crystalShardLogLevel: {
    name: 'Crystal shard logarithm level',
    format: 'plain',
    baseValue: 0,
  },
  crystalShardLogBase: {
    name: 'Crystal shard log base',
    format: 'plain',
    baseValue: 6,
  },
  crystalShardLogPower: {
    name: 'Crystal shard log power',
    format: 'power',
    baseValue: 1,
  },
  crystalShardLogMultiplier: {
    name: 'Crystal shard log multiplier',
    format: 'multiplier',
    formula: logarithmMultiplier(
      'crystalShards',
      'crystalShardLogLevel',
      'crystalShardLogBase',
      'crystalShardLogPower',
    ),
  },
  rubyShardLogLevel: {
    name: 'Ruby shard logarithm level',
    format: 'plain',
    baseValue: 0,
  },
  rubyShardLogBase: {
    name: 'Ruby shard log base',
    format: 'plain',
    baseValue: 1,
  },
  rubyShardLogPower: {
    name: 'Ruby shard log power',
    format: 'power',
    baseValue: 1,
  },
  rubyShardLogMultiplier: {
    name: 'Ruby shard log multiplier',
    format: 'multiplier',
    formula: logarithmMultiplier(
      'rubyShards',
      'rubyShardLogLevel',
      'rubyShardLogBase',
      'rubyShardLogPower',
    ),
  },
  prestigeLogLevel: {
    name: 'PP logarithm level',
    format: 'plain',
    baseValue: 0,
  },
  prestigeLogBase: {
    name: 'PP log base',
    format: 'plain',
    baseValue: 4,
  },
  prestigeLogPower: {
    name: 'PP log power',
    format: 'power',
    baseValue: 1,
  },
  prestigeLogMultiplier: {
    name: 'PP log multiplier',
    format: 'multiplier',
    formula: logarithmMultiplier(
      'prestigePoints',
      'prestigeLogLevel',
      'prestigeLogBase',
      'prestigeLogPower',
    ),
  },
  legacyFactor: {
    name: 'Bonus per prestige',
    format: 'percent',
    baseValue: 0,
  },
  legacyMultiplier: {
    name: 'Legacy multiplier',
    format: 'multiplier',
    formula: ({ param, stat }) => stat('prestiges').multiply(param('legacyFactor')).plus(1),
  },
  starMapFactor: {
    name: 'Bonus per stardust',
    format: 'percent',
    baseValue: 0,
  },
  starMapMultiplier: {
    name: 'Star map multiplier',
    format: 'multiplier',
    formula: ({ param, resource }) => resource('stardust').multiply(param('starMapFactor')).plus(1),
  },
  marathonClickFactor: {
    name: 'Money multiplier per 100 clicks in a run',
    format: 'multiplier',
    baseValue: 1,
  },
  marathonTimeFactor: {
    name: 'Money multiplier per minute of a run',
    format: 'multiplier',
    baseValue: 1,
  },
  marathonMultiplier: {
    name: 'Marathon multiplier',
    format: 'multiplier',
    formula: ({ param, stat }) =>
      param('marathonClickFactor')
        .power(stat('runClicks').divide(MARATHON_CLICKS_STEP).floor())
        .multiply(
          param('marathonTimeFactor').power(
            stat('runVisibleTime').divide(MARATHON_SECONDS_STEP).floor(),
          ),
        ),
  },
  moneyPerClick: {
    name: 'Income per click',
    format: 'plain',
    formula: ({ param }) =>
      param('moneyMultiplier')
        .multiply(param('moneyBonusMultiplier'))
        .multiply(param('clickStreakMultiplier'))
        .multiply(param('crystalLensMultiplier'))
        .multiply(param('moneyLogMultiplier'))
        .multiply(param('crystalShardLogMultiplier'))
        .multiply(param('rubyShardLogMultiplier'))
        .multiply(param('prestigeLogMultiplier'))
        .multiply(param('legacyMultiplier'))
        .multiply(param('starMapMultiplier'))
        .multiply(param('marathonMultiplier'))
        .power(param('moneyPower').minus(param('moneyPowerReduction'))),
  },
  clickHitChance: {
    name: 'Hit chance',
    format: 'percent',
    baseValue: 1,
  },
  critChance: {
    name: 'Critical click chance',
    format: 'percent',
    baseValue: 0,
  },
  critMultiplier: {
    name: 'Critical click multiplier',
    format: 'multiplier',
    baseValue: 2,
  },
  critMultiplierPower: {
    name: 'Critical click multiplier power',
    format: 'power',
    baseValue: 1,
  },
  effectiveCritMultiplier: {
    name: 'Final critical click multiplier',
    format: 'multiplier',
    formula: ({ param }) => param('critMultiplier').power(param('critMultiplierPower')),
  },
  shardsPerDrop: {
    name: 'Crystal shards per drop',
    format: 'multiplier',
    baseValue: 1,
  },
  shardBountyFactor: {
    name: 'Money per crystal shard drop',
    format: 'percent',
    baseValue: 0,
  },
  twinVeinChance: {
    name: 'Ruby shard chance per crystal shard drop',
    format: 'percent',
    baseValue: 0,
  },
  rubyShardsPerDrop: {
    name: 'Ruby shards per drop',
    format: 'multiplier',
    baseValue: 1,
  },
  crystalShardSelfFactor: {
    name: 'Shard chance per digit of shards',
    format: 'percent',
    baseValue: 0,
  },
  crystalShardChance: {
    name: 'Crystal shard chance',
    format: 'percent',
    baseValue: 0,
  },
  crystalShardSelfBonus: {
    name: 'Crystal shard chance from held shards',
    format: 'percent',
    formula: ({ param, resource }) =>
      resource('crystalShards').isLessThanValue(SELF_BOOST_MIN_AMOUNT)
        ? ExponentNumber.ZERO
        : resource('crystalShards').log10().multiply(param('crystalShardSelfFactor')),
  },
  crystalShardChanceMultiplier: {
    name: 'Crystal shard chance multiplier',
    format: 'multiplier',
    baseValue: 1,
  },
  crystalShardTotalChance: {
    name: 'Crystal shard chance',
    format: 'percent',
    formula: ({ param }) =>
      param('crystalShardChance').isZero()
        ? ExponentNumber.ZERO
        : param('crystalShardChance')
            .plus(param('crystalShardSelfBonus'))
            .multiply(param('crystalShardChanceMultiplier')),
  },
  crystalChance: {
    name: 'Crystal chance',
    format: 'percent',
    baseValue: 0,
  },
  rubyShardChance: {
    name: 'Ruby shard chance',
    format: 'percent',
    baseValue: 0,
  },
  rubyChance: {
    name: 'Ruby chance',
    format: 'percent',
    baseValue: 0,
  },
  upgradeCostPower: {
    name: 'Upgrade cost power',
    format: 'power',
    baseValue: 1,
  },
  moneyUpgradeStartCostPower: {
    name: 'Start cost power of money upgrades',
    format: 'power',
    baseValue: 1,
  },
  otherUpgradeStartCostMultiplier: {
    name: 'Start cost multiplier of other upgrades',
    format: 'multiplier',
    baseValue: 1,
  },
  upgradeCostDivider: {
    name: 'Upgrade cost divider',
    format: 'divider',
    baseValue: 1,
  },
  moneyUpgradeCostDivider: {
    name: 'Money upgrade cost divider',
    format: 'divider',
    baseValue: 1,
  },
  shardUpgradeCostDivider: {
    name: 'Shard upgrade cost divider',
    format: 'divider',
    baseValue: 1,
  },
  prestigePointsMultiplier: {
    name: 'Prestige points multiplier',
    format: 'multiplier',
    baseValue: 1,
  },
  prestigePointsLogBase: {
    name: 'Prestige points log base',
    format: 'plain',
    baseValue: 10,
  },
  prestigeBorderBase: {
    name: 'Base prestige border',
    format: 'plain',
    baseValue: 'e10',
  },
  prestigeBorderGrowth: {
    name: 'Prestige border growth',
    format: 'power',
    baseValue: 1.2,
  },
  prestigeBorderPower: {
    name: 'Prestige border power',
    format: 'power',
    baseValue: 1,
  },
  prestigeBorder: {
    name: 'Prestige border',
    format: 'plain',
    formula: ({ param, stat }) =>
      calculatePrestigeBorder(
        param('prestigeBorderBase'),
        param('prestigeBorderGrowth'),
        stat('prestiges'),
      ).power(param('prestigeBorderPower')),
  },
  prestigePointsGain: {
    name: 'Prestige points gain',
    format: 'plain',
    formula: ({ param, resource }) =>
      calculatePrestigePointsGain(
        resource('money'),
        param('prestigePointsLogBase'),
        param('prestigePointsMultiplier'),
      ),
  },
  stardustPerCrystal: {
    name: 'Stardust per crystal',
    format: 'plain',
    baseValue: 0,
  },
  stardustPerRuby: {
    name: 'Stardust per ruby',
    format: 'plain',
    baseValue: 0,
  },
  stardustMultiplier: {
    name: 'Stardust multiplier',
    format: 'multiplier',
    baseValue: 1,
  },
  stardustGain: {
    name: 'Stardust gain',
    format: 'plain',
    formula: ({ param, resource }) =>
      resource('crystals')
        .multiply(param('stardustPerCrystal'))
        .plus(resource('rubies').multiply(param('stardustPerRuby')))
        .multiply(param('stardustMultiplier'))
        .floor(),
  },
  startingCapitalMultiplier: {
    name: 'Starting capital multiplier',
    format: 'multiplier',
    baseValue: 1,
  },
  startingCapital: {
    name: 'Starting capital',
    format: 'plain',
    formula: ({ param }) =>
      param('startingCapitalMultiplier').isGreaterThanValue(1)
        ? param('startingCapitalMultiplier').multiply(STARTING_CAPITAL_BASE)
        : ExponentNumber.ZERO,
  },
});

export const PARAM_KEYS = keysOf(PARAM_DATA);
