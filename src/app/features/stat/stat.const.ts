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
} satisfies Record<string, StatData>;

export const STAT_KEYS = keysOf(STAT_DATA);
