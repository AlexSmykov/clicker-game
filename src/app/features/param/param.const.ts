import { Param, ParamKey } from 'src/app/features/param/param.type';
import { ExponentNumber } from 'exponential-number';

export const PARAM_KEYS = {
  simpleClickMultiplier: 'simpleClickMultiplier',
  crystalChance: 'crystalChance',
} as const;

export const PARAM_DATA: Record<ParamKey, Param> = {
  [PARAM_KEYS.simpleClickMultiplier]: {
    name: 'Simple multiplier',
    defaultValue: new ExponentNumber(0, 1),
  },
  [PARAM_KEYS.crystalChance]: {
    name: 'Crystal chance',
    defaultValue: new ExponentNumber(0, 100000),
  },
};

export const PARAM_CURRENT_VALUE: Record<ParamKey, ExponentNumber> = {
  [PARAM_KEYS.simpleClickMultiplier]: PARAM_DATA[PARAM_KEYS.simpleClickMultiplier].defaultValue,
  [PARAM_KEYS.crystalChance]: PARAM_DATA[PARAM_KEYS.crystalChance].defaultValue,
};
