import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ResourceComponent } from 'src/app/features/resource/components/resource/resource.component';
import { ResourceService } from 'src/app/features/resource/resource.service';
import { ResourceInputData } from 'src/app/features/resource/components/resource/resource.type';
import { RESOURCE_KEYS } from 'src/app/features/resource/resource.const';
import { ParamService } from 'src/app/features/param/param.service';
import { PARAM_KEYS } from 'src/app/features/param/param.const';
import { UpgradeService } from 'src/app/features/upgrade/upgrade.service';
import { ResourceSimpleComponent } from 'src/app/features/resource/components/simple/resource-simple.component';
import { UnlockService } from 'src/app/features/unlock/unlock.service';

@Component({
  selector: 'app-prestige',
  templateUrl: './prestige.component.html',
  styleUrl: './prestige.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ResourceComponent, ResourceSimpleComponent],
})
export default class PrestigeComponent {
  readonly #resourceService = inject(ResourceService);
  readonly #paramService = inject(ParamService);
  readonly #upgradeService = inject(UpgradeService);
  readonly #unlockService = inject(UnlockService);

  readonly prestigePointsGain = computed((): ResourceInputData => {
    const paramsCurrentData = this.#paramService.paramsCurrentData();
    const resourcesCurrentData = this.#resourceService.resourcesCurrentData();

    return {
      key: RESOURCE_KEYS.prestigePoints,
      value: resourcesCurrentData[RESOURCE_KEYS.money].value
        .copy()
        .log(paramsCurrentData[PARAM_KEYS.prestigePointsCoefficient].value),
    };
  });

  readonly prestigeBorder = computed(() => {
    return {
      key: RESOURCE_KEYS.money,
      value: this.#paramService.paramsCurrentData()[PARAM_KEYS.prestigeBorder].value,
    };
  });

  readonly prestigePointsCoefficient = computed(
    () => this.#paramService.paramsCurrentData()[PARAM_KEYS.prestigePointsCoefficient].value,
  );

  readonly isBorderPassed = computed(() => {
    const resourcesCurrentData = this.#resourceService.resourcesCurrentData();

    return resourcesCurrentData[RESOURCE_KEYS.money].value.isGreaterThanOrEqualValue(
      this.prestigeBorder().value,
    );
  });

  readonly resourceKeys = RESOURCE_KEYS;

  prestige(): void {
    const paramsCurrentData = this.#paramService.paramsCurrentData();

    this.#resourceService.updateResource(RESOURCE_KEYS.prestigePoints, {
      isUnlocked: true,
      value: this.#resourceService
        .resourcesCurrentData()
        [RESOURCE_KEYS.prestigePoints].value.copy()
        .plus(this.prestigePointsGain().value),
    });

    this.#paramService.updateParam(PARAM_KEYS.prestigeBorder, {
      value: paramsCurrentData[PARAM_KEYS.prestigeBorder].value
        .copy()
        .power(paramsCurrentData[PARAM_KEYS.prestigeBorderGrowth].value),
    });

    this.#upgradeService.updateUpgrade(PARAM_KEYS.prestigeMoneyPower, {
      isUnlocked: true,
    });

    this.#upgradeService.updateUpgrade(PARAM_KEYS.prestigeCrystalChance, {
      isUnlocked: true,
    });

    this.#upgradeService.updateUpgrade(PARAM_KEYS.prestigeCrystalMultiplier, {
      isUnlocked: true,
    });

    this.#resourceService.resetOnPrestige();
    this.#paramService.resetOnPrestige();
    this.#upgradeService.resetOnPrestige();
    this.#unlockService.resetOnPrestige();
  }
}
