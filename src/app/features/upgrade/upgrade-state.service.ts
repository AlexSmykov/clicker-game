import { Injectable, signal } from '@angular/core';

import { mapKeys } from '../../core/utils/record.utils';
import { EffectProvider, EffectSource } from '../param/param.type';
import { UPGRADE_DATA, UPGRADE_KEYS } from './upgrade.const';
import { SavedUpgrades, UpgradeData, UpgradeKey } from './upgrade.type';

@Injectable({ providedIn: 'root' })
export class UpgradeStateService implements EffectProvider {
  readonly #data: Record<UpgradeKey, UpgradeData> = UPGRADE_DATA;

  readonly #levels = mapKeys(UPGRADE_KEYS, () => signal(0));

  public readonly sources = mapKeys(UPGRADE_KEYS, (key): EffectSource => ({
    effects: this.#data[key].effects,
    level: this.#levels[key].asReadonly(),
  }));

  public readonly effectSources = Object.values(this.sources);

  public level(key: UpgradeKey): number {
    return this.#levels[key]();
  }

  public addLevel(key: UpgradeKey): void {
    this.#levels[key].update((level) => level + 1);
  }

  public resetOnPrestige(): void {
    for (const key of UPGRADE_KEYS) {
      if (this.#data[key].isResetOnPrestige) {
        this.#levels[key].set(0);
      }
    }
  }

  public snapshot(): SavedUpgrades {
    return mapKeys(UPGRADE_KEYS, (key) => ({ level: this.#levels[key]() }));
  }

  public restore(saved: SavedUpgrades): void {
    for (const key of UPGRADE_KEYS) {
      const savedUpgrade = saved[key];

      if (savedUpgrade) {
        this.#levels[key].set(Math.max(0, Math.floor(savedUpgrade.level)));
      }
    }
  }
}
