import { effect, Injectable, signal } from '@angular/core';

import { mapKeys } from '../../core/utils/record.utils';
import { SETTING_DATA, SETTING_KEYS, SETTINGS_STORAGE_KEY } from './setting.const';
import { SavedSettings, SettingKey } from './setting.type';

@Injectable({ providedIn: 'root' })
export class SettingService {
  readonly #values = mapKeys(SETTING_KEYS, (key) => signal(SETTING_DATA[key].isOnByDefault));

  constructor() {
    this.#load();

    effect(() => {
      const saved: SavedSettings = mapKeys(SETTING_KEYS, (key) => this.#values[key]());

      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(saved));
      } catch (error: unknown) {
        console.error('Failed to save settings', error);
      }
    });
  }

  public isOn(key: SettingKey): boolean {
    return this.#values[key]();
  }

  public set(key: SettingKey, isOn: boolean): void {
    this.#values[key].set(isOn);
  }

  public reset(): void {
    for (const key of SETTING_KEYS) {
      this.#values[key].set(SETTING_DATA[key].isOnByDefault);
    }
  }

  #load(): void {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);

    if (raw === null) {
      return;
    }

    try {
      const saved = JSON.parse(raw) as SavedSettings;

      for (const key of SETTING_KEYS) {
        const savedValue = saved[key];

        if (typeof savedValue === 'boolean') {
          this.#values[key].set(savedValue);
        }
      }
    } catch (error: unknown) {
      console.error('Failed to load settings', error);
    }
  }
}
