import { computed, inject, Injectable } from '@angular/core';
import { ExponentNumber } from 'exponential-number';

import { mapKeys } from '../../core/utils/record.utils';
import { EventService } from '../event/event.service';
import { ParamService } from '../param/param.service';
import { ResourceService } from '../resource/resource.service';
import { SettingService } from '../setting/setting.service';
import { UpgradeStateService } from './upgrade-state.service';
import { UPGRADE_DATA, UPGRADE_KEYS } from './upgrade.const';
import { UpgradeCurrentCost, UpgradeData, UpgradeKey, UpgradeSoftcap } from './upgrade.type';
import { calculateCosts, resolveCostTiers } from './upgrade.utils';

@Injectable({ providedIn: 'root' })
export class UpgradeService {
  readonly #eventService = inject(EventService);
  readonly #paramService = inject(ParamService);
  readonly #resourceService = inject(ResourceService);
  readonly #settingService = inject(SettingService);
  readonly #stateService = inject(UpgradeStateService);

  readonly #data: Record<UpgradeKey, UpgradeData> = UPGRADE_DATA;

  readonly #costTiers = mapKeys(UPGRADE_KEYS, (key) =>
    resolveCostTiers(this.#data[key].name, this.#data[key].costTiers),
  );

  readonly #maxLevels = mapKeys(UPGRADE_KEYS, (key) =>
    this.#data[key].costTiers.reduce((total, tier) => total + tier.levels, 0),
  );

  readonly #costs = mapKeys(UPGRADE_KEYS, (key) =>
    computed(() =>
      calculateCosts(this.#costTiers[key], this.#stateService.level(key), {
        divider: this.#costDivider(key),
        power: this.#paramService.value('upgradeCostPower'),
        moneyStartPower: this.#paramService.value('moneyUpgradeStartCostPower'),
        otherStartMultiplier: this.#paramService.value('otherUpgradeStartCostMultiplier'),
      }),
    ),
  );

  readonly #affordability = mapKeys(UPGRADE_KEYS, (key) =>
    computed(() => {
      const costs = this.#costs[key]();

      return (
        !this.isMaxed(key) &&
        (this.#settingService.isOn('freeUpgrades') ||
          costs.every((cost) => this.#resourceService.canAfford(cost.resource, cost.value)))
      );
    }),
  );

  public maxLevel(key: UpgradeKey): number {
    return this.#maxLevels[key];
  }

  public softcap(key: UpgradeKey): UpgradeSoftcap {
    const tiers = this.#costTiers[key];
    const level = this.#stateService.level(key);
    const index = tiers.findIndex((tier) => level < tier.fromLevel + tier.levels);
    const tier = tiers[index];

    return tier
      ? { index, levelCap: tier.fromLevel + tier.levels }
      : { index: tiers.length - 1, levelCap: this.#maxLevels[key] };
  }

  public isMaxed(key: UpgradeKey): boolean {
    return this.#stateService.level(key) >= this.#maxLevels[key];
  }

  public costs(key: UpgradeKey): UpgradeCurrentCost[] {
    return this.#costs[key]();
  }

  public isAffordable(key: UpgradeKey): boolean {
    return this.#affordability[key]();
  }

  public buy(key: UpgradeKey): void {
    if (!this.isAffordable(key)) {
      return;
    }

    if (!this.#settingService.isOn('freeUpgrades')) {
      for (const cost of this.costs(key)) {
        this.#resourceService.spend(cost.resource, cost.value);
      }
    }

    this.#stateService.addLevel(key);
    this.#eventService.emit('upgradeBought', { upgrade: key });
  }

  #costDivider(key: UpgradeKey): ExponentNumber {
    return this.#data[key].costDividers.reduce(
      (total, param) => total.multiply(this.#paramService.value(param)),
      ExponentNumber.ONE,
    );
  }
}
