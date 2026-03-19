import { inject, Injectable, signal } from '@angular/core';
import {
  UPGRADE_CURRENT_DATA,
  UPGRADE_DATA,
  UPGRADE_KEYS,
} from 'src/app/features/upgrade/upgrade.const';
import { UpgradeCurrentData, UpgradeKey } from 'src/app/features/upgrade/upgrade.type';
import { changeParamValue, changeValue } from 'src/app/core/utils/value-change.utils';
import { SimpleValueChange } from 'src/app/core/types/value-change.type';
import { ExponentNumber } from 'exponential-number';
import { ResourceService } from 'src/app/features/resource/resource.service';
import { ParamService } from 'src/app/features/param/param.service';
import { transformCostToCurrentCosts } from 'src/app/features/upgrade/upgrade.utils';
import { SETTING_KEYS } from 'src/app/features/setting/setting.const';
import { SettingService } from 'src/app/features/setting/setting.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { LOCAL_STORAGE_KEYS } from 'src/app/core/services/local-storage/local-storage.const';
import { parseObjectWithExponentNumber } from 'src/app/core/utils/exponent-number.utils';
import { copy } from 'src/app/core/utils/common.utils';

@Injectable()
export class UpgradeService {
  readonly #settingsService = inject(SettingService);
  readonly #resourceService = inject(ResourceService);
  readonly #paramService = inject(ParamService);
  readonly #localStorageService = inject(LocalStorageService);

  readonly upgradeCurrentDataMap = signal<Record<UpgradeKey, UpgradeCurrentData>>(
    copy(UPGRADE_CURRENT_DATA),
  );

  constructor() {
    this.loadFromLocalStorage();
  }

  buyUpgrade(key: UpgradeKey): void {
    const upgradeData = UPGRADE_DATA[key];

    this.upgradeCurrentDataMap.update((oldCurrentData) => {
      const settingsCurrentData = this.#settingsService.settingCurrentData();
      const oldUpgradeData = oldCurrentData[key];

      return {
        ...oldCurrentData,
        [key]: {
          ...oldUpgradeData,
          costs: oldUpgradeData.costs.map((cost) => {
            const currentCostData = upgradeData.costs
              .find((cost) => cost.startAtLevel <= oldUpgradeData.level)
              ?.resources.find((resourceCost) => resourceCost.resource === cost.resource);

            if (!currentCostData) {
              return cost;
            }

            const resourceCurrentData = this.#resourceService.resourcesCurrentData()[cost.resource];

            if (!settingsCurrentData[SETTING_KEYS.freeUpgrades].isOn) {
              this.#resourceService.updateResource(currentCostData.resource, {
                value: resourceCurrentData.value.minus(cost.value),
              });
            }

            return {
              ...cost,
              value: changeValue(
                cost.value,
                currentCostData.change.changeType,
                (currentCostData.change as unknown as SimpleValueChange).value as ExponentNumber,
              ),
            };
          }),
          level: oldUpgradeData.level + 1,
        },
      };
    });

    const paramsCurrentData = this.#paramService.paramsCurrentData();

    upgradeData.effects.forEach((effect) => {
      this.#paramService.updateParam(effect.paramKey, {
        value: changeParamValue(
          paramsCurrentData[effect.paramKey].value,
          effect.change,
          paramsCurrentData,
        ),
      });
    });
  }

  updateUpgrade(key: UpgradeKey, data: Partial<UpgradeCurrentData>): void {
    this.upgradeCurrentDataMap.update((oldValue) => {
      return {
        ...oldValue,
        [key]: {
          ...oldValue[key],
          ...data,
        },
      };
    });
  }

  resetOnPrestige(): void {
    const currentDataMap = this.upgradeCurrentDataMap();

    this.upgradeCurrentDataMap.set(
      Object.fromEntries(
        Object.values(UPGRADE_KEYS).map((key): [UpgradeKey, UpgradeCurrentData] => {
          const currentUpgradeData = currentDataMap[key];
          const upgradeData = UPGRADE_DATA[key];

          return [
            key,
            {
              costs: upgradeData.isResetOnPrestige
                ? transformCostToCurrentCosts(upgradeData.costs)
                : currentUpgradeData.costs,
              isUnlocked: currentUpgradeData.isUnlocked,
              level: upgradeData.isResetOnPrestige ? 0 : currentUpgradeData.level,
            },
          ];
        }),
      ) as Record<UpgradeKey, UpgradeCurrentData>,
    );
  }

  loadFromLocalStorage(): void {
    const value = this.#localStorageService.getItem(LOCAL_STORAGE_KEYS.upgrades);

    if (!value) {
      return;
    }

    try {
      this.upgradeCurrentDataMap.set({
        ...copy(UPGRADE_CURRENT_DATA),
        ...parseObjectWithExponentNumber(
          JSON.parse(value) as Record<UpgradeKey, UpgradeCurrentData>,
        ),
      });
    } catch {
      console.error('Error while loading upgrades data from local storage');
    }
  }

  saveToLocalStorage(): void {
    this.#localStorageService.setItem(
      LOCAL_STORAGE_KEYS.upgrades,
      JSON.stringify(this.upgradeCurrentDataMap()),
    );
  }

  resetCurrentData(): void {
    this.upgradeCurrentDataMap.set(copy(UPGRADE_CURRENT_DATA));
    this.saveToLocalStorage();
  }
}
