import { ExponentNumber } from 'exponential-number';
import { PERCENT_BORDER, PERCENT_DIVIDER } from 'src/app/core/consts/percent.const';

export function calculateChance(chance: ExponentNumber): ExponentNumber {
  if (!chance.isGreaterThanValue(PERCENT_DIVIDER)) {
    if (Math.random() * PERCENT_BORDER < chance.value) {
      return new ExponentNumber(0, 1);
    }

    return new ExponentNumber(0, 0);
  }

  const fullPercent = chance.divide(PERCENT_DIVIDER);

  if (fullPercent.exponentFactor === 0) {
    fullPercent.value = Math.floor(fullPercent.value);

    if (Math.random() * PERCENT_BORDER < chance.value) {
      return fullPercent.plus(new ExponentNumber(0, 1));
    }
  }

  return fullPercent;
}
