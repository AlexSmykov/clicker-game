import { ModifierEffectDisplay } from './modifier.type';

const PERCENT_SCALE = 100;
const SIGNIFICANT_DIGITS = 4;

export function formatModifierValue(value: number, display: ModifierEffectDisplay): string {
  switch (display) {
    case 'decrease':
      return `-${round(value)}`;
    case 'increase':
      return `+${round(value)}`;
    case 'multiplier':
      return value >= 1 ? `x${round(value)}` : `/${round(1 / value)}`;
    case 'percent':
      return `+${round(value * PERCENT_SCALE)}%`;
    case 'power':
      return `^${round(value)}`;
  }
}

function round(value: number): string {
  return Number(value.toPrecision(SIGNIFICANT_DIGITS)).toString();
}
