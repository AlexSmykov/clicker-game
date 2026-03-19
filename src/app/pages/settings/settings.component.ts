import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { SettingService } from 'src/app/features/setting/setting.service';
import {
  SETTING_DATA,
  SETTING_GROUP_DATA,
  SETTING_GROUP_KEYS,
  SETTING_GROUP_MAP,
} from 'src/app/features/setting/setting.const';
import { CollapseComponent } from 'src/app/shared/components/collapse/collapse.component';
import { CheckboxComponent } from 'src/app/shared/components/checkbox/checkbox.component';
import { FormsModule } from '@angular/forms';
import { SettingKey } from 'src/app/features/setting/setting.type';
import { environment } from 'src/environments/environment.dev';
import { DangerButtonComponent } from 'src/app/shared/components/danger-button/danger-button.component';
import { ResourceService } from 'src/app/features/resource/resource.service';
import { ParamService } from 'src/app/features/param/param.service';
import { UpgradeService } from 'src/app/features/upgrade/upgrade.service';
import { UnlockService } from 'src/app/features/unlock/unlock.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CollapseComponent, CheckboxComponent, FormsModule, DangerButtonComponent],
})
export default class SettingsComponent {
  readonly #resourceService = inject(ResourceService);
  readonly #paramService = inject(ParamService);
  readonly #upgradeService = inject(UpgradeService);
  readonly #unlockService = inject(UnlockService);
  readonly #settingService = inject(SettingService);

  readonly settingsGroups = computed(() => {
    const settingCurrentData = this.#settingService.settingCurrentData();

    return Object.values(SETTING_GROUP_KEYS)
      .map((key) => {
        return {
          key,
          name: SETTING_GROUP_DATA[key].name,
          settings: SETTING_GROUP_MAP[key]
            .filter((settingKey) => settingCurrentData[settingKey].isUnlocked)
            .map((settingKey) => {
              return {
                key: settingKey,
                ...settingCurrentData[settingKey],
                name: SETTING_DATA[settingKey].name,
              };
            }),
        };
      })
      .filter(
        (group) =>
          group.settings.length && (group.key !== SETTING_GROUP_KEYS.dev || !environment.isProd),
      );
  });

  setSettingsValue(key: SettingKey, value: boolean) {
    this.#settingService.updateSetting(key, { isOn: value });
  }

  resetProgress(): void {
    this.#resourceService.resetCurrentData();
    this.#paramService.resetCurrentData();
    this.#upgradeService.resetCurrentData();
    this.#unlockService.resetCurrentData();
  }

  resetSettings(): void {
    this.#settingService.resetCurrentData();
  }

  saveProgress(): void {
    this.#resourceService.saveToLocalStorage();
    this.#paramService.saveToLocalStorage();
    this.#upgradeService.saveToLocalStorage();
    this.#unlockService.saveToLocalStorage();
  }
}
