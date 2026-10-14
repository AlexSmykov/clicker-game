import { ExponentNumber } from 'exponential-number';

export function rollChance(chance: ExponentNumber): boolean {
  return Math.random() < chance.toNumber();
}

export function rollCount(chance: ExponentNumber): ExponentNumber {
  const guaranteed = chance.floor();
  const remainder = chance.minus(guaranteed);

  return rollChance(remainder) ? guaranteed.plus(1) : guaranteed;
}
