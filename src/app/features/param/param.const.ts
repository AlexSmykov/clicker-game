import { ParamCurrentData, ParamData, ParamKey } from 'src/app/features/param/param.type';
import { ExponentNumber } from 'exponential-number';

export const PARAM_KEYS = {
  simpleMoneyMultiplier: 'simpleMoneyMultiplier',
  simpleMoneyMultiplierIncrement: 'simpleMoneyMultiplierIncrement',
  crystalMoneyMultiplier: 'crystalMoneyMultiplier',
  simpleMoneyPower: 'simpleMoneyPower',
  baseCrystalChance: 'baseCrystalChance',
  crystalChance: 'crystalChance',
  bonusCrystalChance: 'bonusCrystalChance',
  prestigePointsCoefficient: 'prestigePointsCoefficient',
  prestigeBorder: 'prestigeBorder',
  prestigeBorderGrowth: 'prestigeBorderGrowth',
  prestigeMoneyPower: 'prestigeMoneyPower',
  prestigeCrystalChance: 'prestigeCrystalChance',
  prestigeCrystalMultiplier: 'prestigeCrystalMultiplier',
  baseRubiesChance: 'baseRubiesChance',
  bonusPrestigePointsMultiplier: 'bonusPrestigePointsMultiplier',
} as const;

export const PARAM_DATA: Record<ParamKey, ParamData> = {
  [PARAM_KEYS.simpleMoneyMultiplier]: {
    name: 'Simple multiplier',
    defaultValue: new ExponentNumber(0, 1),
    prefix: 'x',
    isPercent: false,
    isResetOnPrestige: true,
  },
  [PARAM_KEYS.simpleMoneyMultiplierIncrement]: {
    name: 'Simple multiplier increment',
    defaultValue: new ExponentNumber(0, 1),
    prefix: 'x',
    isPercent: false,
    isResetOnPrestige: true,
  },
  [PARAM_KEYS.crystalMoneyMultiplier]: {
    name: 'Crystal multiplier',
    defaultValue: new ExponentNumber(0, 1),
    prefix: 'x',
    isPercent: false,
    isResetOnPrestige: true,
  },
  [PARAM_KEYS.simpleMoneyPower]: {
    name: 'Simple power',
    defaultValue: new ExponentNumber(0, 0),
    prefix: '^',
    isPercent: false,
    isResetOnPrestige: true,
  },
  [PARAM_KEYS.baseCrystalChance]: {
    name: 'Base crystal chance',
    defaultValue: new ExponentNumber(0, 0),
    prefix: '+',
    isPercent: true,
    isResetOnPrestige: false,
  },
  [PARAM_KEYS.crystalChance]: {
    name: 'Upgrade crystal chance',
    defaultValue: new ExponentNumber(0, 0),
    prefix: '+',
    isPercent: true,
    isResetOnPrestige: true,
  },
  [PARAM_KEYS.bonusCrystalChance]: {
    name: 'Bonus crystal chance',
    defaultValue: new ExponentNumber(0, 0),
    prefix: '+',
    isPercent: true,
    isResetOnPrestige: true,
  },
  [PARAM_KEYS.prestigePointsCoefficient]: {
    name: 'Prestige points coefficient',
    defaultValue: new ExponentNumber(0, 10),
    prefix: '',
    isPercent: false,
    isResetOnPrestige: false,
  },
  [PARAM_KEYS.prestigeBorder]: {
    name: 'Prestige border',
    defaultValue: new ExponentNumber(1, 1),
    prefix: '',
    isPercent: false,
    isResetOnPrestige: false,
  },
  [PARAM_KEYS.prestigeBorderGrowth]: {
    name: 'Prestige border growth',
    defaultValue: new ExponentNumber(0, 1.2),
    prefix: '^',
    isPercent: false,
    isResetOnPrestige: false,
  },
  [PARAM_KEYS.prestigeMoneyPower]: {
    name: 'Prestige money power',
    defaultValue: new ExponentNumber(0, 0),
    prefix: '^',
    isPercent: false,
    isResetOnPrestige: true,
  },
  [PARAM_KEYS.prestigeCrystalChance]: {
    name: 'Prestige crystal chance',
    defaultValue: new ExponentNumber(0, 0),
    prefix: '+',
    isPercent: true,
    isResetOnPrestige: true,
  },
  [PARAM_KEYS.prestigeCrystalMultiplier]: {
    name: 'Prestige crystal multiplier',
    defaultValue: new ExponentNumber(0, 1),
    prefix: 'x',
    isPercent: false,
    isResetOnPrestige: true,
  },
  [PARAM_KEYS.baseRubiesChance]: {
    name: 'Base ruby chance',
    defaultValue: new ExponentNumber(0, 0),
    prefix: '+',
    isPercent: true,
    isResetOnPrestige: false,
  },
  [PARAM_KEYS.bonusPrestigePointsMultiplier]: {
    name: 'Bonus PP multiplier',
    defaultValue: new ExponentNumber(0, 0),
    prefix: 'x',
    isPercent: false,
    isResetOnPrestige: true,
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
  [PARAM_KEYS.baseCrystalChance]: {
    value: PARAM_DATA[PARAM_KEYS.baseCrystalChance].defaultValue.copy(),
  },
  [PARAM_KEYS.bonusCrystalChance]: {
    value: PARAM_DATA[PARAM_KEYS.bonusCrystalChance].defaultValue.copy(),
  },
  [PARAM_KEYS.crystalChance]: { value: PARAM_DATA[PARAM_KEYS.crystalChance].defaultValue.copy() },
  [PARAM_KEYS.prestigePointsCoefficient]: {
    value: PARAM_DATA[PARAM_KEYS.prestigePointsCoefficient].defaultValue.copy(),
  },
  [PARAM_KEYS.prestigeBorder]: { value: PARAM_DATA[PARAM_KEYS.prestigeBorder].defaultValue.copy() },
  [PARAM_KEYS.prestigeBorderGrowth]: {
    value: PARAM_DATA[PARAM_KEYS.prestigeBorderGrowth].defaultValue.copy(),
  },
  [PARAM_KEYS.prestigeMoneyPower]: {
    value: PARAM_DATA[PARAM_KEYS.prestigeMoneyPower].defaultValue.copy(),
  },
  [PARAM_KEYS.prestigeCrystalChance]: {
    value: PARAM_DATA[PARAM_KEYS.prestigeCrystalChance].defaultValue.copy(),
  },
  [PARAM_KEYS.prestigeCrystalMultiplier]: {
    value: PARAM_DATA[PARAM_KEYS.prestigeCrystalMultiplier].defaultValue.copy(),
  },
  [PARAM_KEYS.baseRubiesChance]: {
    value: PARAM_DATA[PARAM_KEYS.baseRubiesChance].defaultValue.copy(),
  },
  [PARAM_KEYS.bonusPrestigePointsMultiplier]: {
    value: PARAM_DATA[PARAM_KEYS.bonusPrestigePointsMultiplier].defaultValue.copy(),
  },
};
