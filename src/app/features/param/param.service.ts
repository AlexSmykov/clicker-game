import { inject, Injectable, signal } from '@angular/core';
import { PARAM_CURRENT_VALUE, PARAM_DATA, PARAM_KEYS } from 'src/app/features/param/param.const';
import { ParamCurrentData, ParamKey } from 'src/app/features/param/param.type';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { LOCAL_STORAGE_KEYS } from 'src/app/core/services/local-storage/local-storage.const';
import { copy } from 'src/app/core/utils/common.utils';
import { parseObjectWithExponentNumber } from 'src/app/core/utils/exponent-number.utils';

@Injectable()
export class ParamService {
  readonly #localStorageService = inject(LocalStorageService);

  readonly paramsCurrentData = signal(copy(PARAM_CURRENT_VALUE));

  constructor() {
    this.loadFromLocalStorage();
  }

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

  loadFromLocalStorage(): void {
    const value = this.#localStorageService.getItem(LOCAL_STORAGE_KEYS.parameters);

    if (!value) {
      return;
    }

    try {
      this.paramsCurrentData.set({
        ...copy(PARAM_CURRENT_VALUE),
        ...parseObjectWithExponentNumber(JSON.parse(value) as Record<ParamKey, ParamCurrentData>),
      });
    } catch {
      console.error('Error while loading parameters data from local storage');
    }
  }

  saveToLocalStorage(): void {
    this.#localStorageService.setItem(
      LOCAL_STORAGE_KEYS.parameters,
      JSON.stringify(this.paramsCurrentData()),
    );
  }

  resetCurrentData(): void {
    this.paramsCurrentData.set(copy(PARAM_CURRENT_VALUE));
    this.saveToLocalStorage();
  }
}
