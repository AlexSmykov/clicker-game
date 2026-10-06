import { keysOf } from '../../core/utils/record.utils';
import { defineParams } from './param.utils';

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
  moneyPower: {
    name: 'Money power',
    format: 'power',
    baseValue: 1,
  },
  upgradeCostDivider: {
    name: 'Upgrade cost divider',
    format: 'divider',
    baseValue: 1,
  },
  moneyPerClick: {
    name: 'Income per click',
    format: 'plain',
    formula: ({ param }) => param('moneyMultiplier').power(param('moneyPower')),
  },
});

export const PARAM_KEYS = keysOf(PARAM_DATA);
