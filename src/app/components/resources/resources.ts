import { Component, computed, inject } from '@angular/core';

import { Resource } from '../../features/resource/components/resource/resource';
import { RESOURCE_KEYS } from '../../features/resource/resource.const';
import { ResourceService } from '../../features/resource/resource.service';

@Component({
  imports: [Resource],
  selector: 'app-resources',
  styleUrl: './resources.scss',
  templateUrl: './resources.html',
})
export class Resources {
  readonly #resourceService = inject(ResourceService);

  protected readonly unlockedResources = computed(() => {
    const resourcesCurrentData = this.#resourceService.resourcesCurrentData();

    return RESOURCE_KEYS.filter((key) => resourcesCurrentData[key].isUnlocked).map((key) => ({
      key,
      value: resourcesCurrentData[key].value,
    }));
  });
}
