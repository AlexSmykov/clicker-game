import { ExponentNumber } from 'exponential-number';
import { PERCENT_BORDER } from 'src/app/core/consts/percent.const';

export function calculateChance(chance: ExponentNumber): ExponentNumber {
  const partedPercent = chance.value % PERCENT_BORDER;

  return new ExponentNumber(
    0,
    (chance.value - partedPercent) / PERCENT_BORDER +
      (Math.random() * PERCENT_BORDER < partedPercent ? 1 : 0),
  );
}
