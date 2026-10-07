import { ExponentNumber } from 'exponential-number';

export function calculatePrestigeBorder(
  baseBorder: ExponentNumber,
  growth: ExponentNumber,
  prestiges: ExponentNumber,
): ExponentNumber {
  return baseBorder.power(growth.power(prestiges));
}

export function calculatePrestigePointsGain(
  money: ExponentNumber,
  logBase: ExponentNumber,
  multiplier: ExponentNumber,
): ExponentNumber {
  if (money.isLessThanValue(1)) {
    return ExponentNumber.ZERO;
  }

  return money.log(logBase).multiply(multiplier).floor();
}

export function calculateBorderProgress(money: ExponentNumber, border: ExponentNumber): number {
  if (money.isLessThanValue(1) || border.isLessThanOrEqualValue(1)) {
    return 0;
  }

  return Math.min(1, money.log10().divide(border.log10()).toNumber());
}
