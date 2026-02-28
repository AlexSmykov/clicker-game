import { Injectable, signal } from '@angular/core';
import { PARAM_CURRENT_VALUE } from 'src/app/features/param/param.const';
import { ExponentNumber } from 'exponential-number';
import { ParamKey } from 'src/app/features/param/param.type';

@Injectable()
export class ParamService {
  readonly paramMap = signal(PARAM_CURRENT_VALUE);

  updateParam(key: ParamKey, value: ExponentNumber): void {
    this.paramMap.update((oldValue) => {
      return {
        ...oldValue,
        [key]: {
          ...oldValue,
          value: value,
        },
      };
    });
  }
}
