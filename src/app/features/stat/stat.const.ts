import { keysOf } from '../../core/utils/record.utils';
import { StatData } from './stat.type';

export const STAT_DATA = {
  playTime: {
    name: 'Time played',
    format: 'duration',
    isResetOnPrestige: false,
  },
  clicks: {
    name: 'Clicks',
    format: 'number',
    isResetOnPrestige: false,
  },
  crits: {
    name: 'Critical clicks',
    format: 'number',
    isResetOnPrestige: false,
  },
  missedClicks: {
    name: 'Missed clicks',
    format: 'number',
    isResetOnPrestige: false,
  },
  highestMoneyPerClick: {
    name: 'Highest income per click',
    format: 'number',
    isResetOnPrestige: false,
  },
  upgradeLevelsBought: {
    name: 'Upgrade levels bought',
    format: 'number',
    isResetOnPrestige: false,
  },
  treeNodesBought: {
    name: 'Tree nodes bought',
    format: 'number',
    isResetOnPrestige: false,
  },
  prestiges: {
    name: 'Prestiges',
    format: 'number',
    isResetOnPrestige: false,
  },
  restarts: {
    name: 'Restarts',
    format: 'number',
    isResetOnPrestige: false,
  },
  highestPrestigePointsGain: {
    name: 'Highest prestige points gain',
    format: 'number',
    isResetOnPrestige: false,
  },
  runTime: {
    name: 'All time in this run',
    format: 'duration',
    isResetOnPrestige: true,
  },
  runVisibleTime: {
    name: 'Active time in this run',
    format: 'duration',
    isResetOnPrestige: true,
  },
  runClicks: {
    name: 'Clicks in this run',
    format: 'number',
    isResetOnPrestige: true,
  },
} satisfies Record<string, StatData>;

export const STAT_KEYS = keysOf(STAT_DATA);
