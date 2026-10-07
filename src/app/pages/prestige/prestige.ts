import { PercentPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';

import { PARAM_DATA } from '../../features/param/param.const';
import { ParamService } from '../../features/param/param.service';
import { ParamKey } from '../../features/param/param.type';
import { formatParam } from '../../features/param/param.utils';
import { PrestigeService } from '../../features/prestige/prestige.service';
import { Resource } from '../../features/resource/components/resource/resource';
import { RESOURCE_DATA, RESOURCE_KEYS } from '../../features/resource/resource.const';
import { STAT_DATA } from '../../features/stat/stat.const';
import { StatService } from '../../features/stat/stat.service';
import { StatKey } from '../../features/stat/stat.type';
import { formatStat } from '../../features/stat/stat.utils';
import { TREE_NODE_DATA, TREE_NODE_KEYS } from '../../features/tree/tree.const';
import { UPGRADE_DATA, UPGRADE_KEYS } from '../../features/upgrade/upgrade.const';

const FORMULA_PARAMS: ParamKey[] = [
  'prestigePointsLogBase',
  'prestigePointsMultiplier',
  'prestigeBorderBase',
  'prestigeBorderGrowth',
];

const RUN_STATS: StatKey[] = ['prestiges', 'runTime', 'runClicks', 'highestPrestigePointsGain'];

@Component({
  imports: [Resource, PercentPipe],
  selector: 'app-prestige',
  styleUrl: './prestige.scss',
  templateUrl: './prestige.html',
})
export default class Prestige {
  readonly #paramService = inject(ParamService);
  readonly #prestigeService = inject(PrestigeService);
  readonly #statService = inject(StatService);

  protected readonly isUnlocked = this.#prestigeService.isUnlocked;
  protected readonly isAvailable = this.#prestigeService.isAvailable;
  protected readonly border = this.#prestigeService.border;
  protected readonly nextBorder = this.#prestigeService.nextBorder;
  protected readonly pointsGain = this.#prestigeService.pointsGain;
  protected readonly pointsGainAtBorder = this.#prestigeService.pointsGainAtBorder;
  protected readonly progress = this.#prestigeService.progress;
  protected readonly stardustGain = this.#prestigeService.stardustGain;
  protected readonly isStardustUnlocked = computed(
    () => !this.#paramService.value('stardustPerCrystal').isZero(),
  );

  protected readonly unlockNodeName = TREE_NODE_DATA.prestige.name;

  protected readonly isConfirming = signal(false);

  protected readonly formulaParams = computed(() =>
    FORMULA_PARAMS.map((key) => ({
      key,
      name: PARAM_DATA[key].name,
      value: formatParam(this.#paramService.value(key), PARAM_DATA[key].format),
    })),
  );

  protected readonly runStats = computed(() =>
    RUN_STATS.map((key) => ({
      key,
      name: STAT_DATA[key].name,
      value: formatStat(this.#statService.value(key), STAT_DATA[key].format),
    })),
  );

  protected readonly resetSummary = [
    {
      name: 'Resources reset',
      value: RESOURCE_KEYS.filter((key) => RESOURCE_DATA[key].isResetOnPrestige)
        .map((key) => RESOURCE_DATA[key].name)
        .join(', '),
    },
    {
      name: 'Upgrades reset',
      value: this.#countLabel(
        UPGRADE_KEYS.filter((key) => UPGRADE_DATA[key].isResetOnPrestige).length,
        UPGRADE_KEYS.length,
      ),
    },
    {
      name: 'Tree nodes reset',
      value: this.#countLabel(
        TREE_NODE_KEYS.filter((key) => TREE_NODE_DATA[key].isResetOnPrestige).length,
        TREE_NODE_KEYS.length,
      ),
    },
    {
      name: 'Always kept',
      value: 'Unlocked resources and upgrades, kept tree nodes, statistics',
    },
  ];

  protected prestige(): void {
    if (!this.isAvailable()) {
      return;
    }

    if (!this.isConfirming()) {
      this.isConfirming.set(true);

      return;
    }

    this.#prestigeService.prestige();
    this.isConfirming.set(false);
  }

  protected cancel(): void {
    this.isConfirming.set(false);
  }

  #countLabel(count: number, total: number): string {
    return `${count} of ${total}`;
  }
}
