import { parseObjectWithExponentNumber } from 'src/app/core/utils/exponent-number.utils';

export function exhaustedMap(value: never): never {
  throw new Error(`Caught unhandled enum value: ${value}`);
}

export function copy<T>(value: T): T {
  return parseObjectWithExponentNumber(JSON.parse(JSON.stringify(value)));
}
