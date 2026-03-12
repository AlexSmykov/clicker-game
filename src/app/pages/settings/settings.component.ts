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

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CollapseComponent, CheckboxComponent, FormsModule],
})
export default class SettingsComponent {
  readonly #settingsService = inject(SettingService);

  readonly settingsGroups = computed(() => {
    const settingsCurrentData = this.#settingsService.settingCurrentData();

    return Object.values(SETTING_GROUP_KEYS)
      .map((key) => {
        return {
          key,
          name: SETTING_GROUP_DATA[key].name,
          settings: SETTING_GROUP_MAP[key]
            .filter((settingKey) => settingsCurrentData[settingKey].isUnlocked)
            .map((settingKey) => {
              return {
                key: settingKey,
                ...settingsCurrentData[settingKey],
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
    this.#settingsService.updateSetting(key, { isOn: value });
  }
}
