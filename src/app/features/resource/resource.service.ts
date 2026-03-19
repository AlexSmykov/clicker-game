import { inject, Injectable, signal } from '@angular/core';
import {
  RESOURCE_CURRENT_VALUES,
  RESOURCE_DATA,
  RESOURCE_KEYS,
} from 'src/app/features/resource/resource.const';
import { ResourceCurrentData, ResourceKey } from 'src/app/features/resource/resource.type';
import { ExponentNumber } from 'exponential-number';
import { LOCAL_STORAGE_KEYS } from 'src/app/core/services/local-storage/local-storage.const';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { copy } from 'src/app/core/utils/common.utils';
import { parseObjectWithExponentNumber } from 'src/app/core/utils/exponent-number.utils';

@Injectable()
export class ResourceService {
  readonly #localStorageService = inject(LocalStorageService);

  readonly resourcesCurrentData = signal(copy(RESOURCE_CURRENT_VALUES));

  constructor() {
    this.loadFromLocalStorage();
  }

  updateResource(key: ResourceKey, data: Partial<ResourceCurrentData>): void {
    this.resourcesCurrentData.update((oldValue) => {
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
    const resourcesCurrentData = this.resourcesCurrentData();

    this.resourcesCurrentData.set(
      Object.fromEntries(
        Object.values(RESOURCE_KEYS).map((key): [ResourceKey, ResourceCurrentData] => {
          const currentResourceData = resourcesCurrentData[key];
          const resourceData = RESOURCE_DATA[key];

          return [
            key,
            {
              isUnlocked: currentResourceData.isUnlocked,
              value: resourceData.isResetOnPrestige
                ? new ExponentNumber(0, 0)
                : currentResourceData.value,
            },
          ];
        }),
      ) as Record<ResourceKey, ResourceCurrentData>,
    );
  }

  loadFromLocalStorage(): void {
    const value = this.#localStorageService.getItem(LOCAL_STORAGE_KEYS.resources);

    if (!value) {
      return;
    }

    try {
      this.resourcesCurrentData.set({
        ...copy(RESOURCE_CURRENT_VALUES),
        ...parseObjectWithExponentNumber(
          JSON.parse(value) as Record<ResourceKey, ResourceCurrentData>,
        ),
      });
    } catch {
      console.error('Error while loading resources data from local storage');
    }
  }

  saveToLocalStorage(): void {
    this.#localStorageService.setItem(
      LOCAL_STORAGE_KEYS.resources,
      JSON.stringify(this.resourcesCurrentData()),
    );
  }

  resetCurrentData(): void {
    this.resourcesCurrentData.set(copy(RESOURCE_CURRENT_VALUES));
    this.saveToLocalStorage();
  }
}
