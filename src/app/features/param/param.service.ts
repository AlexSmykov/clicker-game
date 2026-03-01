import { Injectable, signal } from '@angular/core';
import { PARAM_CURRENT_VALUE, PARAM_DATA, PARAM_KEYS } from 'src/app/features/param/param.const';
import { ParamCurrentData, ParamKey } from 'src/app/features/param/param.type';

@Injectable()
export class ParamService {
  readonly paramsCurrentData = signal(PARAM_CURRENT_VALUE);

  updateParam(key: ParamKey, data: Partial<ParamCurrentData>): void {
    this.paramsCurrentData.update((oldValue) => {
      return {
        ...oldValue,
        [key]: {
          ...oldValue[key],
          ...data,
        },
      };
    });
  }

  resetOnPrestige(): void {
    const paramsCurrentData = this.paramsCurrentData();

    this.paramsCurrentData.set(
      Object.fromEntries(
        Object.values(PARAM_KEYS).map((key): [ParamKey, ParamCurrentData] => {
          const currentParamData = paramsCurrentData[key];
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
