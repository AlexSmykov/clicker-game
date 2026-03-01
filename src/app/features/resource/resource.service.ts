import { Injectable, signal } from '@angular/core';
import {
  RESOURCE_CURRENT_VALUES,
  RESOURCE_DATA,
  RESOURCE_KEYS,
} from 'src/app/features/resource/resource.const';
import { ResourceCurrentData, ResourceKey } from 'src/app/features/resource/resource.type';
import { ExponentNumber } from 'exponential-number';

@Injectable()
export class ResourceService {
  readonly resourcesCurrentData = signal(RESOURCE_CURRENT_VALUES);

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
              isUnlocked: resourceData.isResetOnPrestige
                ? resourceData.isDefaultUnlocked
                : currentResourceData.isUnlocked,
              value: resourceData.isResetOnPrestige
                ? new ExponentNumber(0, 0)
                : currentResourceData.value,
            },
          ];
        }),
      ) as Record<ResourceKey, ResourceCurrentData>,
    );
  }
}
