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

@Injectable()
export class UpgradeService {
  readonly #resourceService = inject(ResourceService);
  readonly #paramService = inject(ParamService);

  readonly upgradeCurrentDataMap = signal(UPGRADE_CURRENT_DATA);

  buyUpgrade(key: UpgradeKey): void {
    const upgradeData = UPGRADE_DATA[key];

    this.upgradeCurrentDataMap.update((oldCurrentData) => {
      const oldUpgradeData = oldCurrentData[key];

      return {
        ...oldCurrentData,
        [key]: {
          costs: oldUpgradeData.costs.map((cost) => {
            const currentCostData = upgradeData.costs
              .find((cost) => cost.startAtLevel <= oldUpgradeData.level)
              ?.resources.find((resourceCost) => resourceCost.resource === cost.resource);

            if (!currentCostData) {
              return cost;
            }

            const resource = this.#resourceService.resourceMap()[cost.resource];

            this.#resourceService.updateResource(currentCostData.resource, {
              isUnlocked: resource.isUnlocked,
              value: resource.value.minus(cost.value),
            });

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

    const params = this.#paramService.paramMap();

    upgradeData.effects.forEach((effect) => {
      this.#paramService.updateParam(
        effect.paramKey,
        changeParamValue(params[effect.paramKey].value, effect.change, params),
      );
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
              level: upgradeData.isResetOnPrestige ? 0 : currentUpgradeData.level,
            },
          ];
        }),
      ) as Record<UpgradeKey, UpgradeCurrentData>,
    );
  }
}
