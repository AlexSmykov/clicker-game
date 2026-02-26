import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { Upgrade, UpgradeCurrentCost } from 'src/app/features/upgrade/upgrade.type';
import { ResourceComponent } from 'src/app/features/resource/components/resource/resource.component';
import { ResourceService } from 'src/app/features/resource/resource.service';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrl: './upgrade.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ResourceComponent],
})
export class UpgradeComponent {
  readonly data = input.required<Upgrade>();
  readonly costs = input.required<UpgradeCurrentCost[]>();

  readonly buy = output<void>();

  readonly #resourceService = inject(ResourceService);

  readonly parsedCosts = computed(() =>
    this.costs().map((cost) => {
      return { key: cost.resource, data: cost.value };
    }),
  );

  readonly isCanBuy = computed(() => {
    const costs = this.parsedCosts();
    const resources = this.#resourceService.resourceMap();

    return costs.every((cost) => {
      return resources[cost.key].isGreaterThanOrEqualValue(cost.data);
    });
  });
}
