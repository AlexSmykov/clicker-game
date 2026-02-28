import { Injectable, signal } from '@angular/core';
import { RESOURCE_CURRENT_VALUES } from 'src/app/features/resource/resource.const';
import { ResourceCurrentData, ResourceKey } from 'src/app/features/resource/resource.type';

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
}
