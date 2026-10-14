import { ExponentNumber } from 'exponential-number';

import { StatFormat } from './stat.type';

const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_DAY = 86_400;

export function formatStat(value: ExponentNumber, format: StatFormat): string {
  return format === 'duration' ? formatDuration(value.toNumber()) : value.toString();
}

export function formatDuration(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds)) {
    return '∞';
  }

  const days = Math.floor(totalSeconds / SECONDS_IN_DAY);
  const hours = Math.floor((totalSeconds % SECONDS_IN_DAY) / SECONDS_IN_HOUR);
  const minutes = Math.floor((totalSeconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
  const seconds = Math.floor(totalSeconds % SECONDS_IN_MINUTE);

  const parts = [
    { value: days, suffix: 'd' },
    { value: hours, suffix: 'h' },
    { value: minutes, suffix: 'm' },
    { value: seconds, suffix: 's' },
  ];
  const firstSignificant = parts.findIndex((part) => part.value > 0);

  return parts
    .slice(firstSignificant === -1 ? parts.length - 1 : firstSignificant)
    .map((part) => `${part.value}${part.suffix}`)
    .join(' ');
}
