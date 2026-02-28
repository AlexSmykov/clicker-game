import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ResourceComponent } from 'src/app/features/resource/components/resource/resource.component';
import { ResourceService } from 'src/app/features/resource/resource.service';
import { ResourceInputData } from 'src/app/features/resource/components/resource/resource.type';
import { RESOURCE_KEYS } from 'src/app/features/resource/resource.const';
import { ParamService } from 'src/app/features/param/param.service';
import { PARAM_KEYS } from 'src/app/features/param/param.const';
import { UpgradeService } from 'src/app/features/upgrade/upgrade.service';

@Component({
  selector: 'app-prestige',
  templateUrl: './prestige.component.html',
  styleUrl: './prestige.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ResourceComponent],
})
export default class PrestigeComponent {
  readonly #resourceService = inject(ResourceService);
  readonly #paramService = inject(ParamService);
  readonly #upgradeService = inject(UpgradeService);

  readonly prestigePointsGain = computed((): ResourceInputData => {
    const paramMap = this.#paramService.paramMap();
    const resourceMap = this.#resourceService.resourceMap();

    return {
      key: RESOURCE_KEYS.prestigePoints,
      value: resourceMap[RESOURCE_KEYS.money].value
        .copy()
        .log(paramMap[PARAM_KEYS.prestigePointsCoefficient].value),
    };
  });

  readonly prestigeBorder = computed(
    () => this.#paramService.paramMap()[PARAM_KEYS.prestigeBorder].value,
  );

  readonly prestigePointsCoefficient = computed(
    () => this.#paramService.paramMap()[PARAM_KEYS.prestigePointsCoefficient].value,
  );

  readonly isBorderPassed = computed(() => {
    const resourceMap = this.#resourceService.resourceMap();

    return resourceMap[RESOURCE_KEYS.money].value.isGreaterThanOrEqualValue(this.prestigeBorder());
  });

  prestige(): void {
    const paramMap = this.#paramService.paramMap();

    this.#resourceService.updateResource(RESOURCE_KEYS.prestigePoints, {
      isUnlocked: true,
      value: this.#resourceService
        .resourceMap()
        [RESOURCE_KEYS.prestigePoints].value.copy()
        .plus(this.prestigePointsGain().value),
    });

    this.#paramService.updateParam(
      PARAM_KEYS.prestigeBorder,
      paramMap[PARAM_KEYS.prestigeBorder].value
        .copy()
        .power(paramMap[PARAM_KEYS.prestigeBorderGrowth].value),
    );

    this.#resourceService.resetOnPrestige();
    this.#paramService.resetOnPrestige();
    this.#upgradeService.resetOnPrestige();
  }
}
