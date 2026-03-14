import { inject, Injectable, signal } from '@angular/core';
import { SettingCurrentData, SettingKey } from './setting.type';
import { SETTING_CURRENT_DATA } from 'src/app/features/setting/setting.const';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { LOCAL_STORAGE_KEYS } from 'src/app/core/services/local-storage/local-storage.const';
import { copy } from 'src/app/core/utils/common.utils';

@Injectable()
export class SettingService {
  readonly #localStorageService = inject(LocalStorageService);

  readonly settingCurrentData = signal(copy(SETTING_CURRENT_DATA));

  constructor() {
    this.loadFromLocalStorage();
  }

  updateSetting(key: SettingKey, data: Partial<SettingCurrentData>): void {
    this.settingCurrentData.update((oldValue) => {
      return {
        ...oldValue,
        [key]: {
          ...oldValue[key],
          ...data,
        },
      };
    });
  }

  loadFromLocalStorage(): void {
    const value = this.#localStorageService.getItem(LOCAL_STORAGE_KEYS.settings);

    if (!value) {
      return;
    }

    try {
      this.settingCurrentData.set(JSON.parse(value) as Record<SettingKey, SettingCurrentData>);
    } catch {
      console.error('Error while loading settings data from local storage');
    }
  }

  saveToLocalStorage(): void {
    this.#localStorageService.setItem(
      LOCAL_STORAGE_KEYS.settings,
      JSON.stringify(this.settingCurrentData()),
    );
  }

  resetCurrentData(): void {
    this.settingCurrentData.set(copy(SETTING_CURRENT_DATA));
    this.saveToLocalStorage();
  }
}
