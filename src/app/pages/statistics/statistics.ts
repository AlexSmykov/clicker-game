import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';

import { PARAM_DATA, PARAM_KEYS } from '../../features/param/param.const';
import { ParamService } from '../../features/param/param.service';
import { formatParam } from '../../features/param/param.utils';
import { RESOURCE_DATA, RESOURCE_KEYS } from '../../features/resource/resource.const';
import { ResourceService } from '../../features/resource/resource.service';
import { SaveService } from '../../features/save/save.service';
import { STAT_DATA, STAT_KEYS } from '../../features/stat/stat.const';
import { StatService } from '../../features/stat/stat.service';
import { formatStat } from '../../features/stat/stat.utils';
import { UnlockService } from '../../features/unlock/unlock.service';
import { UpgradeStateService } from '../../features/upgrade/upgrade-state.service';
import { UPGRADE_DATA, UPGRADE_KEYS } from '../../features/upgrade/upgrade.const';
import { UpgradeService } from '../../features/upgrade/upgrade.service';

@Component({
  imports: [DatePipe],
  selector: 'app-statistics',
  styleUrl: './statistics.scss',
  templateUrl: './statistics.html',
})
export default class Statistics {
  readonly #paramService = inject(ParamService);
  readonly #resourceService = inject(ResourceService);
  readonly #saveService = inject(SaveService);
  readonly #statService = inject(StatService);
  readonly #upgradeService = inject(UpgradeService);
  readonly #unlockService = inject(UnlockService);
  readonly #upgradeStateService = inject(UpgradeStateService);

  readonly #unlockedUpgradeKeys = computed(() =>
    UPGRADE_KEYS.filter((key) => this.#unlockService.isUpgradeUnlocked(key)),
  );

  protected readonly startedAt = this.#statService.startedAt;
  protected readonly lastSavedAt = this.#saveService.lastSavedAt;

  protected readonly counters = computed(() =>
    STAT_KEYS.map((key) => ({
      key,
      name: STAT_DATA[key].name,
      value: formatStat(this.#statService.value(key), STAT_DATA[key].format),
    })),
  );

  protected readonly resources = computed(() => {
    const resourcesCurrentData = this.#resourceService.resourcesCurrentData();

    return RESOURCE_KEYS.filter((key) => resourcesCurrentData[key].isUnlocked).map((key) => ({
      key,
      name: RESOURCE_DATA[key].name,
      color: RESOURCE_DATA[key].color,
      current: resourcesCurrentData[key].value.toString(),
      earned: this.#statService.resourceEarned(key).toString(),
      spent: this.#statService.resourceSpent(key).toString(),
    }));
  });

  protected readonly upgradeSummary = computed(() => {
    const unlockedKeys = this.#unlockedUpgradeKeys();

    return [
      { name: 'Upgrades unlocked', value: `${unlockedKeys.length} / ${UPGRADE_KEYS.length}` },
      {
        name: 'Upgrades maxed',
        value: UPGRADE_KEYS.filter((key) => this.#upgradeService.isMaxed(key)).length.toString(),
      },
      {
        name: 'Current upgrade levels',
        value: UPGRADE_KEYS.reduce(
          (total, key) => total + this.#upgradeStateService.level(key),
          0,
        ).toString(),
      },
    ];
  });

  protected readonly upgrades = computed(() =>
    this.#unlockedUpgradeKeys().map((key) => ({
      key,
      name: UPGRADE_DATA[key].name,
      value: `${this.#upgradeStateService.level(key)} / ${this.#upgradeService.maxLevel(key)}`,
    })),
  );

  protected readonly params = computed(() =>
    PARAM_KEYS.map((key) => ({
      key,
      name: PARAM_DATA[key].name,
      value: formatParam(this.#paramService.value(key), PARAM_DATA[key].format),
    })),
  );
}
