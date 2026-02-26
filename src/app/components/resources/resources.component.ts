import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ResourceService } from 'src/app/features/resource/resource.service';
import { RESOURCE_KEYS } from 'src/app/features/resource/resource.const';
import { ResourceComponent } from 'src/app/features/resource/components/resource/resource.component';
import { ExponentNumber } from 'exponential-number';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ResourceComponent],
})
export class ResourcesComponent {
  readonly #resourceService = inject(ResourceService);

  readonly resourceCurrentData = computed(() => {
    const resourceMap = this.#resourceService.resourceMap();

    return Object.values(RESOURCE_KEYS).map((key) => {
      return {
        key,
        data: resourceMap[key],
      };
    });
  });

  trackResourcesBy(resource: { key: string; data: ExponentNumber }): string {
    return `${resource.key}_${resource.data.toString()}`;
  }
}
