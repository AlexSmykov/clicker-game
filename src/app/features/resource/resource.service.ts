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
  readonly resourceMap = signal(RESOURCE_CURRENT_VALUES);

  updateResource(key: ResourceKey, value: ResourceCurrentData): void {
    this.resourceMap.update((oldValue) => {
      return {
        ...oldValue,
        [key]: value,
      };
    });
  }

  resetOnPrestige(): void {
    const currentDataMap = this.resourceMap();

    this.resourceMap.set(
      Object.fromEntries(
        Object.values(RESOURCE_KEYS).map((key): [ResourceKey, ResourceCurrentData] => {
          const currentResourceData = currentDataMap[key];
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
