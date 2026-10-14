import { computed, effect, inject, Injectable } from '@angular/core';

import { mapKeys } from '../../core/utils/record.utils';
import { RESOURCE_DATA, RESOURCE_KEYS } from '../resource/resource.const';
import { ResourceService } from '../resource/resource.service';
import { StatService } from '../stat/stat.service';
import { TreeService } from '../tree/tree.service';
import { UpgradeStateService } from '../upgrade/upgrade-state.service';
import { UPGRADE_DATA, UPGRADE_KEYS } from '../upgrade/upgrade.const';
import { UpgradeKey } from '../upgrade/upgrade.type';
import { UnlockCondition } from './unlock.type';

@Injectable({ providedIn: 'root' })
export class UnlockService {
  readonly #resourceService = inject(ResourceService);
  readonly #statService = inject(StatService);
  readonly #treeService = inject(TreeService);
  readonly #upgradeStateService = inject(UpgradeStateService);

  readonly #upgradeUnlocks = mapKeys(UPGRADE_KEYS, (key) =>
    computed(
      () =>
        this.#upgradeStateService.level(key) > 0 ||
        this.areConditionsMet(UPGRADE_DATA[key].unlockConditions),
    ),
  );

  constructor() {
    effect(() => {
      const resourcesCurrentData = this.#resourceService.resourcesCurrentData();

      for (const key of RESOURCE_KEYS) {
        if (
          !resourcesCurrentData[key].isUnlocked &&
          this.areConditionsMet(RESOURCE_DATA[key].unlockConditions)
        ) {
          this.#resourceService.unlock(key);
        }
      }
    });
  }

  public isUpgradeUnlocked(key: UpgradeKey): boolean {
    return this.#upgradeUnlocks[key]();
  }

  public areConditionsMet(conditions: UnlockCondition<UpgradeKey>[]): boolean {
    return conditions.every((condition) => this.#isConditionMet(condition));
  }

  #isConditionMet(condition: UnlockCondition<UpgradeKey>): boolean {
    switch (condition.type) {
      case 'resource':
        return this.#resourceService.canAfford(condition.resource, condition.amount);
      case 'resourceEarned':
      case 'stat':
        return this.#statService.isConditionMet(condition);
      case 'treeNode':
        return this.#treeService.isBought(condition.node);
      case 'upgradeLevel':
        return this.#upgradeStateService.level(condition.upgrade) >= condition.level;
    }
  }
}
