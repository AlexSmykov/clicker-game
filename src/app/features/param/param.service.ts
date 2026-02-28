import { Injectable, signal } from '@angular/core';
import { PARAM_CURRENT_VALUE, PARAM_DATA, PARAM_KEYS } from 'src/app/features/param/param.const';
import { ExponentNumber } from 'exponential-number';
import { ParamCurrentData, ParamKey } from 'src/app/features/param/param.type';

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

  resetOnPrestige(): void {
    const currentDataMap = this.paramMap();

    this.paramMap.set(
      Object.fromEntries(
        Object.values(PARAM_KEYS).map((key): [ParamKey, ParamCurrentData] => {
          const currentParamData = currentDataMap[key];
          const paramData = PARAM_DATA[key];

          return [
            key,
            {
              value: paramData.isResetOnPrestige
                ? paramData.defaultValue.copy()
                : currentParamData.value,
            },
          ];
        }),
      ) as Record<ParamKey, ParamCurrentData>,
    );
  }
}
