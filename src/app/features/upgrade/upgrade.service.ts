import { computed, effect, inject, Injectable } from '@angular/core';
import { ExponentNumber } from 'exponential-number';

import { mapKeys } from '../../core/utils/record.utils';
import { EventService } from '../event/event.service';
import { ParamService } from '../param/param.service';
import { ResourceService } from '../resource/resource.service';
import { UpgradeStateService } from './upgrade-state.service';
import { UPGRADE_DATA, UPGRADE_KEYS } from './upgrade.const';
import { UnlockCondition, UpgradeCurrentCost, UpgradeData, UpgradeKey } from './upgrade.type';
import { calculateCosts, resolveCostTiers } from './upgrade.utils';

@Injectable({ providedIn: 'root' })
export class UpgradeService {
  readonly #eventService = inject(EventService);
  readonly #paramService = inject(ParamService);
  readonly #resourceService = inject(ResourceService);
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
      calculateCosts(this.#costTiers[key], this.#stateService.level(key), this.#costDivider(key)),
    ),
  );

  readonly #affordability = mapKeys(UPGRADE_KEYS, (key) =>
    computed(() => {
      const costs = this.#costs[key]();

      return (
        !this.isMaxed(key) &&
        costs.every((cost) => this.#resourceService.canAfford(cost.resource, cost.value))
      );
    }),
  );

  constructor() {
    effect(() => {
      for (const key of UPGRADE_KEYS) {
        if (!this.#stateService.isUnlocked(key) && this.#areConditionsMet(key)) {
          this.#stateService.unlock(key);
        }
      }
    });
  }

  public maxLevel(key: UpgradeKey): number {
    return this.#maxLevels[key];
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

    for (const cost of this.costs(key)) {
      this.#resourceService.spend(cost.resource, cost.value);
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

  #areConditionsMet(key: UpgradeKey): boolean {
    return this.#data[key].unlockConditions.every((condition) => this.#isConditionMet(condition));
  }

  #isConditionMet(condition: UnlockCondition<UpgradeKey>): boolean {
    switch (condition.type) {
      case 'resource':
        return this.#resourceService.canAfford(condition.resource, condition.amount);
      case 'upgradeLevel':
        return this.#stateService.level(condition.upgrade) >= condition.level;
    }
  }
}
