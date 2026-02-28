import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { Upgrade, UpgradeCurrentCost } from 'src/app/features/upgrade/upgrade.type';
import { ResourceComponent } from 'src/app/features/resource/components/resource/resource.component';
import { ResourceService } from 'src/app/features/resource/resource.service';
import { ParamService } from 'src/app/features/param/param.service';
import { changeParamValue } from 'src/app/core/utils/value-change.utils';
import { UpgradeEffectComponent } from 'src/app/features/upgrade/components/effect/upgrade-effect.component';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrl: './upgrade.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ResourceComponent, UpgradeEffectComponent],
})
export class UpgradeComponent {
  readonly data = input.required<Upgrade>();
  readonly costs = input.required<UpgradeCurrentCost[]>();

  readonly buy = output<void>();

  readonly #resourceService = inject(ResourceService);
  readonly #paramService = inject(ParamService);

  readonly parsedCosts = computed(() =>
    this.costs().map((cost) => {
      return { key: cost.resource, value: cost.value };
    }),
  );

  readonly isCanBuy = computed(() => {
    const costs = this.parsedCosts();
    const resources = this.#resourceService.resourceMap();

    return costs.every((cost) => resources[cost.key].value.isGreaterThanOrEqualValue(cost.value));
  });

  readonly effects = computed(() => {
    const effects = this.data().effects;
    const paramMap = this.#paramService.paramMap();

    return effects.map((effect) => {
      return {
        paramKey: effect.paramKey,
        oldValue: paramMap[effect.paramKey].value,
        newValue: changeParamValue(paramMap[effect.paramKey].value.copy(), effect.change, paramMap),
      };
    });
  });

  clickBuy(): void {
    if (this.isCanBuy()) {
      this.buy.emit();
    }
  }
}
