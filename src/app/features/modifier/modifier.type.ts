import type { EffectOperation, ParamKey } from '../param/param.type';
import type { MODIFIER_DATA } from './modifier.const';

export type ModifierKey = keyof typeof MODIFIER_DATA;

export type ModifierEffectDisplay = 'decrease' | 'increase' | 'multiplier' | 'percent' | 'power';

export interface ModifierEffect {
  label: string;
  param: ParamKey;
  operation: EffectOperation;
  display: ModifierEffectDisplay;
  values: number[];
}

export interface ModifierData {
  name: string;
  description: string;
  iconPath: string;
  bonuses: ModifierEffect[];
  penalties: ModifierEffect[];
}

export type SavedModifierLevels = Partial<Record<string, number>>;

export interface SavedModifiers {
  selected: SavedModifierLevels;
  active: SavedModifierLevels;
}
