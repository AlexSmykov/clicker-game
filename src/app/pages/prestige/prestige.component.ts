import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ResourceComponent } from 'src/app/features/resource/components/resource/resource.component';
import { ResourceService } from 'src/app/features/resource/resource.service';
import { ResourceInputData } from 'src/app/features/resource/components/resource/resource.type';
import { RESOURCE_KEYS } from 'src/app/features/resource/resource.const';
import { ParamService } from 'src/app/features/param/param.service';
import { PARAM_KEYS } from 'src/app/features/param/param.const';
import { UpgradeService } from 'src/app/features/upgrade/upgrade.service';
import { ResourceSimpleComponent } from 'src/app/features/resource/components/simple/resource-simple.component';
import { UPGRADE_KEYS } from 'src/app/features/upgrade/upgrade.const';
import { SettingService } from 'src/app/features/setting/setting.service';
import { SETTING_KEYS } from 'src/app/features/setting/setting.const';
import { ExponentNumber } from 'exponential-number';

@Component({
  selector: 'app-prestige',
  templateUrl: './prestige.component.html',
  styleUrl: './prestige.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ResourceComponent, ResourceSimpleComponent],
})
export default class PrestigeComponent {
  readonly #settingsService = inject(SettingService);
  readonly #resourceService = inject(ResourceService);
  readonly #paramService = inject(ParamService);
  readonly #upgradeService = inject(UpgradeService);

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
    const currentSettingsData = this.#settingsService.settingCurrentData();

    return {
      key: RESOURCE_KEYS.money,
      value: currentSettingsData[SETTING_KEYS.offPrestigeBorder].isOn
        ? new ExponentNumber(0, 0)
        : this.#paramService.paramsCurrentData()[PARAM_KEYS.prestigeBorder].value,
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
    const settingsCurrentData = this.#settingsService.settingCurrentData();
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

    this.#upgradeService.updateUpgrade(UPGRADE_KEYS.prestigeMoneyPower, {
      isUnlocked: true,
    });

    this.#upgradeService.updateUpgrade(UPGRADE_KEYS.prestigeCrystalChance, {
      isUnlocked: true,
    });

    this.#upgradeService.updateUpgrade(UPGRADE_KEYS.prestigeCrystalShardsMultiplier, {
      isUnlocked: true,
    });

    if (!settingsCurrentData[SETTING_KEYS.keepEverythingOnPrestige].isOn) {
      this.#resourceService.resetOnPrestige();
      this.#paramService.resetOnPrestige();
      this.#upgradeService.resetOnPrestige();
    }
  }
}
