import { ExponentNumberData, ParsedExponentNumber } from 'src/app/core/types/common.type';
import { ExponentNumber } from 'exponential-number';

export function parseObjectWithExponentNumber<
  T extends ExponentNumber | object | Array<unknown> | unknown,
>(value: ParsedExponentNumber<T>): T {
  if (Array.isArray(value)) {
    return (value as Array<unknown>).map((item) => parseObjectWithExponentNumber(item)) as T;
  }

  if (typeof value === 'object') {
    const exponentNumberValue = value as ExponentNumberData;

    if (
      exponentNumberValue.exponentFactor !== undefined &&
      exponentNumberValue.value !== undefined
    ) {
      return new ExponentNumber(exponentNumberValue.exponentFactor, exponentNumberValue.value) as T;
    }

    return Object.fromEntries(
      Object.entries(value as object).map(([key, data]) => [
        key,
        parseObjectWithExponentNumber(data),
      ]),
    ) as T;
  }

  return value as T;
}
