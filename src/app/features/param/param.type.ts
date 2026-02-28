import { ObjectType } from 'src/app/core/types/common.type';
import { PARAM_CURRENT_VALUE, PARAM_KEYS } from 'src/app/features/param/param.const';
import { ExponentNumber } from 'exponential-number';

export type ParamKey = ObjectType<typeof PARAM_KEYS>;
export type ParamCurrentValues = typeof PARAM_CURRENT_VALUE;

export type ParamData = {
  name: string;
  defaultValue: ExponentNumber;
  prefix: string;
  isPercent: boolean;
  isResetOnPrestige: boolean;
};

export type ParamCurrentData = {
  value: ExponentNumber;
};
