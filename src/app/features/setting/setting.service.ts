import { Injectable, signal } from '@angular/core';
import { SettingCurrentData, SettingKey } from './setting.type';
import { SETTING_CURRENT_DATA } from 'src/app/features/setting/setting.const';

@Injectable()
export class SettingService {
  readonly settingCurrentData = signal(SETTING_CURRENT_DATA);

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
}
