import { ExponentNumber } from 'exponential-number';

export const PERCENT_BORDER = 1000000;
export const PERCENT_DIVIDER = new ExponentNumber(0, PERCENT_BORDER);
export const HUNDRED_PERCENT_DIVIDER = PERCENT_DIVIDER.copy().divide(new ExponentNumber(0, 100));
