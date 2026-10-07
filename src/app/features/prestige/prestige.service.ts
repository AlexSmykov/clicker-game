import { computed, inject, Injectable } from '@angular/core';

import { EventService } from '../event/event.service';
import { ModifierService } from '../modifier/modifier.service';
import { ParamService } from '../param/param.service';
import { ResourceService } from '../resource/resource.service';
import { SaveService } from '../save/save.service';
import { SettingService } from '../setting/setting.service';
import { StatService } from '../stat/stat.service';
import { TreeService } from '../tree/tree.service';
import { UpgradeStateService } from '../upgrade/upgrade-state.service';
import {
  calculateBorderProgress,
  calculatePrestigeBorder,
  calculatePrestigePointsGain,
} from './prestige.utils';

@Injectable({ providedIn: 'root' })
export class PrestigeService {
  readonly #eventService = inject(EventService);
  readonly #modifierService = inject(ModifierService);
  readonly #paramService = inject(ParamService);
  readonly #resourceService = inject(ResourceService);
  readonly #saveService = inject(SaveService);
  readonly #settingService = inject(SettingService);
  readonly #statService = inject(StatService);
  readonly #treeService = inject(TreeService);
  readonly #upgradeStateService = inject(UpgradeStateService);

  readonly #money = computed(() => this.#resourceService.resourcesCurrentData().money.value);

  public readonly isUnlocked = computed(() => this.#treeService.isBought('prestige'));

  public readonly border = computed(() => this.#paramService.value('prestigeBorder'));

  public readonly nextBorder = computed(() =>
    calculatePrestigeBorder(
      this.#paramService.value('prestigeBorderBase'),
      this.#paramService.value('prestigeBorderGrowth'),
      this.#statService.value('prestiges').plus(1),
    ).power(this.#paramService.value('prestigeBorderPower')),
  );

  public readonly pointsGain = computed(() => this.#paramService.value('prestigePointsGain'));

  public readonly pointsGainAtBorder = computed(() =>
    calculatePrestigePointsGain(
      this.border(),
      this.#paramService.value('prestigePointsLogBase'),
      this.#paramService.value('prestigePointsMultiplier'),
    ),
  );

  public readonly stardustGain = computed(() => this.#paramService.value('stardustGain'));

  public readonly progress = computed(() => calculateBorderProgress(this.#money(), this.border()));

  public readonly isAvailable = computed(
    () =>
      this.isUnlocked() &&
      (this.#settingService.isOn('offPrestigeBorder') ||
        this.#money().isGreaterThanOrEqualValue(this.border())),
  );

  public prestige(): void {
    if (!this.isAvailable()) {
      return;
    }

    const prestigePoints = this.pointsGain();
    const stardust = this.stardustGain();
    const startingCapital = this.#paramService.value('startingCapital');

    if (!this.#settingService.isOn('keepEverythingOnPrestige')) {
      this.#resourceService.resetOnPrestige();
      this.#upgradeStateService.resetOnPrestige();
      this.#treeService.resetOnPrestige();
    }

    this.#modifierService.applySelection();
    this.#resourceService.add('prestigePoints', prestigePoints);

    if (!stardust.isZero()) {
      this.#resourceService.add('stardust', stardust);
    }

    if (!startingCapital.isZero()) {
      this.#resourceService.add('money', startingCapital);
    }

    this.#eventService.emit('prestige', { prestigePoints });
    this.#saveService.save();
  }

  public restart(): void {
    this.#resourceService.resetOnPrestige();
    this.#upgradeStateService.resetOnPrestige();
    this.#treeService.resetOnPrestige();
    this.#modifierService.applySelection();

    const startingCapital = this.#paramService.value('startingCapital');

    if (!startingCapital.isZero()) {
      this.#resourceService.add('money', startingCapital);
    }

    this.#eventService.emit('restart', {});
    this.#saveService.save();
  }
}
