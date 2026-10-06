import { ExponentNumber } from 'exponential-number';

import { ParamDefinition, ParamFormat } from './param.type';

const FORMAT_PREFIXES: Record<ParamFormat, string> = {
  divider: '/',
  multiplier: 'x',
  plain: '',
  power: '^',
};

export function defineParams<Key extends string>(
  params: Record<Key, ParamDefinition<NoInfer<Key>>>,
): Record<Key, ParamDefinition<Key>> {
  return params;
}

export function formatParam(value: ExponentNumber, format: ParamFormat): string {
  return `${FORMAT_PREFIXES[format]}${value.toString()}`;
}
