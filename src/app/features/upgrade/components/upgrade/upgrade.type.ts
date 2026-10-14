import type { ParamKey } from '../../../param/param.type';

export interface UpgradeEffectView {
  param: ParamKey;
  name: string;
  currentValue: string;
  nextValue: string | null;
}
