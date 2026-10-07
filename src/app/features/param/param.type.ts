import type { Signal } from '@angular/core';
import type { ExponentNumber } from 'exponential-number';

import type { ResourceKey } from '../resource/resource.type';
import type { StatKey } from '../stat/stat.type';
import type { PARAM_DATA } from './param.const';

export type ParamKey = keyof typeof PARAM_DATA;

export type ParamData = ParamDefinition<ParamKey>;

export type ParamFormat = 'divider' | 'multiplier' | 'percent' | 'plain' | 'power';

export type ParamDefinition<Key extends string> = ParamDescription &
  (ParamWithBaseValue | ParamWithFormula<Key>);

export interface ParamDescription {
  name: string;
  format: ParamFormat;
}

export interface ParamWithBaseValue {
  baseValue: number | string;
}

export interface ParamWithFormula<Key extends string> {
  formula: (context: FormulaContext<Key>) => ExponentNumber;
}

export interface FormulaContext<Key extends string> {
  param: (key: Key) => ExponentNumber;
  resource: (key: ResourceKey) => ExponentNumber;
  stat: (key: StatKey) => ExponentNumber;
}

export type EffectOperation = 'add' | 'multiply' | 'power';

export type EffectValue = number | string | { param: ParamKey };

export interface Effect {
  param: ParamKey;
  operation: EffectOperation;
  value: EffectValue;
}

export interface EffectSource {
  effects: Effect[];
  level: Signal<number>;
}

export interface EffectProvider {
  readonly effectSources: readonly EffectSource[];
}
