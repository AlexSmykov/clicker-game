import { Component, computed, inject, signal } from '@angular/core';

import { SaveService } from '../../features/save/save.service';
import {
  SETTING_DATA,
  SETTING_GROUP_DATA,
  SETTING_GROUP_KEYS,
  SETTING_KEYS,
} from '../../features/setting/setting.const';
import { SettingService } from '../../features/setting/setting.service';
import { SettingKey } from '../../features/setting/setting.type';
import { Checkbox } from '../../shared/components/checkbox/checkbox';

@Component({
  imports: [Checkbox],
  selector: 'app-settings',
  styleUrl: './settings.scss',
  templateUrl: './settings.html',
})
export default class Settings {
  readonly #saveService = inject(SaveService);
  readonly #settingService = inject(SettingService);

  readonly #isJustSaved = signal(false);

  protected readonly isResetConfirming = signal(false);

  protected readonly saveLabel = computed(() =>
    this.#isJustSaved() ? 'Progress saved!' : 'Save now',
  );

  protected readonly groups = computed(() =>
    SETTING_GROUP_KEYS.map((group) => ({
      key: group,
      name: SETTING_GROUP_DATA[group].name,
      settings: SETTING_KEYS.filter((key) => SETTING_DATA[key].group === group).map((key) => ({
        key,
        name: SETTING_DATA[key].name,
        isOn: this.#settingService.isOn(key),
      })),
    })),
  );

  protected save(): void {
    this.#saveService.save();
    this.#isJustSaved.set(true);
  }

  protected clearSaved(): void {
    this.#isJustSaved.set(false);
  }

  protected reset(): void {
    if (!this.isResetConfirming()) {
      this.isResetConfirming.set(true);

      return;
    }

    this.#saveService.reset();
  }

  protected cancelReset(): void {
    this.isResetConfirming.set(false);
  }

  protected resetSettings(): void {
    this.#settingService.reset();
  }

  protected setSetting(key: SettingKey, isOn: boolean): void {
    this.#settingService.set(key, isOn);
  }
}
