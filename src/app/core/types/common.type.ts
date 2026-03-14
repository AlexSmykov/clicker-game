import { ExponentNumber } from 'exponential-number';

export type ObjectType<T> = T[keyof T];

export type ExponentNumberData = {
  exponentFactor: number;
  value: number;
};

export type ParsedExponentNumber<T extends ExponentNumber | object | unknown> =
  T extends ExponentNumber
    ? ExponentNumberData
    : T extends object
      ? {
          [P in keyof T]: T[P] extends ExponentNumber
            ? ExponentNumberData
            : T[P] extends object
              ? ParsedExponentNumber<T[P]>
              : T[P];
        }
      : T;
