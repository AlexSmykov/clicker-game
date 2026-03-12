import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ParamService } from 'src/app/features/param/param.service';
import { PARAM_DATA, PARAM_KEYS } from 'src/app/features/param/param.const';
import { ParamKey } from 'src/app/features/param/param.type';
import { ParamComponent } from 'src/app/features/param/components/param/param.component';
import { ParamInputData } from 'src/app/features/param/components/param/param.type';
import { SettingService } from 'src/app/features/setting/setting.service';
import { SETTING_KEYS } from 'src/app/features/setting/setting.const';
import { CollapseComponent } from 'src/app/shared/components/collapse/collapse.component';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrl: './params.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ParamComponent, CollapseComponent],
})
export class ParamsComponent {
  readonly #settingsService = inject(SettingService);
  readonly #paramService = inject(ParamService);

  readonly paramList = computed((): ParamInputData[] => {
    const settingsCurrentData = this.#settingsService.settingCurrentData();
    const paramMap = this.#paramService.paramsCurrentData();

    return Object.values(PARAM_KEYS)
      .filter((key) => {
        return (
          !paramMap[key].value.isEqual(PARAM_DATA[key as ParamKey].defaultValue) ||
          key === PARAM_KEYS.simpleMoneyMultiplier ||
          settingsCurrentData[SETTING_KEYS.showAllParams].isOn
        );
      })
      .map((key) => {
        return {
          key: key as ParamKey,
          value: paramMap[key].value,
        };
      });
  });

  readonly paramData = PARAM_DATA;
}
