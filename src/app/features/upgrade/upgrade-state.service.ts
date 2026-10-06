import { Injectable, signal } from '@angular/core';

import { mapKeys } from '../../core/utils/record.utils';
import { EffectProvider, EffectSource } from '../param/param.type';
import { UPGRADE_DATA, UPGRADE_KEYS } from './upgrade.const';
import { SavedUpgrades, UpgradeData, UpgradeKey } from './upgrade.type';

@Injectable({ providedIn: 'root' })
export class UpgradeStateService implements EffectProvider {
  readonly #data: Record<UpgradeKey, UpgradeData> = UPGRADE_DATA;

  readonly #levels = mapKeys(UPGRADE_KEYS, () => signal(0));

  readonly #unlocked = mapKeys(UPGRADE_KEYS, (key) =>
    signal(this.#data[key].unlockConditions.length === 0),
  );

  public readonly sources = mapKeys(UPGRADE_KEYS, (key): EffectSource => ({
    effects: this.#data[key].effects,
    level: this.#levels[key].asReadonly(),
  }));

  public readonly effectSources = Object.values(this.sources);

  public level(key: UpgradeKey): number {
    return this.#levels[key]();
  }

  public isUnlocked(key: UpgradeKey): boolean {
    return this.#unlocked[key]();
  }

  public addLevel(key: UpgradeKey): void {
    this.#levels[key].update((level) => level + 1);
  }

  public snapshot(): SavedUpgrades {
    return mapKeys(UPGRADE_KEYS, (key) => ({
      level: this.#levels[key](),
      isUnlocked: this.#unlocked[key](),
    }));
  }

  public restore(saved: SavedUpgrades): void {
    for (const key of UPGRADE_KEYS) {
      const savedUpgrade = saved[key];

      if (!savedUpgrade) {
        continue;
      }

      this.#levels[key].set(Math.max(0, Math.floor(savedUpgrade.level)));

      if (savedUpgrade.isUnlocked) {
        this.#unlocked[key].set(true);
      }
    }
  }

  public unlock(key: UpgradeKey): void {
    this.#unlocked[key].set(true);
  }
}
