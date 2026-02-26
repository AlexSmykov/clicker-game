import { Injectable, signal } from '@angular/core';
import { RESOURCE_CURRENT_VALUES } from 'src/app/features/resource/resource.const';
import { ResourceKey } from 'src/app/features/resource/resource.type';
import { ExponentNumber } from 'exponential-number';

@Injectable()
export class ResourceService {
  readonly resourceMap = signal(RESOURCE_CURRENT_VALUES);

  updateResource(key: ResourceKey, value: ExponentNumber): void {
    this.resourceMap.update((oldValue) => {
      return {
        ...oldValue,
        [key]: value,
      };
    });
  }
}
