import { ExponentNumber } from 'exponential-number';
import { ParamKey } from 'src/app/features/param/param.type';

export type ParamInputData = {
  key: ParamKey;
  value: ExponentNumber;
};
