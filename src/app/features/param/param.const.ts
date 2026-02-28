import { ParamCurrentData, ParamData, ParamKey } from 'src/app/features/param/param.type';
import { ExponentNumber } from 'exponential-number';

export const PARAM_KEYS = {
  simpleMoneyMultiplier: 'simpleMoneyMultiplier',
  simpleMoneyMultiplierIncrement: 'simpleMoneyMultiplierIncrement',
  crystalMoneyMultiplier: 'crystalMoneyMultiplier',
  simpleMoneyPower: 'simpleMoneyPower',
  crystalChance: 'crystalChance',
} as const;

export const PARAM_DATA: Record<ParamKey, ParamData> = {
  [PARAM_KEYS.simpleMoneyMultiplier]: {
    name: 'Simple multiplier',
    defaultValue: new ExponentNumber(0, 1),
    isPercent: false,
    prefix: 'x',
  },
  [PARAM_KEYS.simpleMoneyMultiplierIncrement]: {
    name: 'Simple multiplier increment',
    defaultValue: new ExponentNumber(0, 1),
    isPercent: false,
    prefix: 'x',
  },
  [PARAM_KEYS.crystalMoneyMultiplier]: {
    name: 'Crystal multiplier',
    defaultValue: new ExponentNumber(0, 1),
    isPercent: false,
    prefix: 'x',
  },
  [PARAM_KEYS.simpleMoneyPower]: {
    name: 'Simple power',
    defaultValue: new ExponentNumber(0, 1),
    isPercent: false,
    prefix: '^',
  },
  [PARAM_KEYS.crystalChance]: {
    name: 'Crystal chance',
    defaultValue: new ExponentNumber(0, 100000),
    isPercent: true,
    prefix: '+',
  },
};

export const PARAM_CURRENT_VALUE: Record<ParamKey, ParamCurrentData> = {
  [PARAM_KEYS.simpleMoneyMultiplier]: {
    value: PARAM_DATA[PARAM_KEYS.simpleMoneyMultiplier].defaultValue.copy(),
  },
  [PARAM_KEYS.simpleMoneyMultiplierIncrement]: {
    value: PARAM_DATA[PARAM_KEYS.simpleMoneyMultiplierIncrement].defaultValue.copy(),
  },
  [PARAM_KEYS.crystalMoneyMultiplier]: {
    value: PARAM_DATA[PARAM_KEYS.crystalMoneyMultiplier].defaultValue.copy(),
  },
  [PARAM_KEYS.simpleMoneyPower]: {
    value: PARAM_DATA[PARAM_KEYS.simpleMoneyPower].defaultValue.copy(),
  },
  [PARAM_KEYS.crystalChance]: { value: PARAM_DATA[PARAM_KEYS.crystalChance].defaultValue.copy() },
};
