import { ExponentNumber } from 'exponential-number';

import { ResourceKey } from '../resource/resource.type';
import { Effect, FormulaContext, ParamDefinition, ParamFormat } from './param.type';

const PERCENT_SCALE = 100;
const LOGARITHM_MIN_AMOUNT = 2;

const FORMAT_PREFIXES: Record<ParamFormat, string> = {
  divider: '/',
  multiplier: 'x',
  percent: '',
  plain: '',
  power: '^',
};

export function defineParams<Key extends string>(
  params: Record<Key, ParamDefinition<NoInfer<Key>>>,
): Record<Key, ParamDefinition<Key>> {
  return params;
}

export function logarithmMultiplier<Key extends string>(
  resource: ResourceKey,
  level: Key,
  base: Key,
  power: Key,
): (context: FormulaContext<Key>) => ExponentNumber {
  return (context) => {
    const amount = context.resource(resource);

    if (context.param(level).isZero() || amount.isLessThanValue(LOGARITHM_MIN_AMOUNT)) {
      return ExponentNumber.ONE;
    }

    return ExponentNumber.max(1, amount.log(context.param(base).plus(1))).power(
      context.param(power),
    );
  };
}

export function formatEffect(effect: Effect, value: ExponentNumber, format: ParamFormat): string {
  switch (effect.operation) {
    case 'add':
      return format === 'percent'
        ? `+${value.multiply(PERCENT_SCALE).toString()}%`
        : `+${value.toString()}`;
    case 'multiply':
      return `x${value.toString()}`;
    case 'power':
      return `^${value.plus(1).toString()}`;
  }
}

export function formatParam(value: ExponentNumber, format: ParamFormat): string {
  if (format === 'percent') {
    return `${value.multiply(PERCENT_SCALE).toString()}%`;
  }

  return `${FORMAT_PREFIXES[format]}${value.toString()}`;
}
