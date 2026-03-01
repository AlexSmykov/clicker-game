import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ParamService } from 'src/app/features/param/param.service';
import { PARAM_DATA, PARAM_KEYS } from 'src/app/features/param/param.const';
import { ParamKey } from 'src/app/features/param/param.type';
import { ParamComponent } from 'src/app/features/param/components/param/param.component';
import { ParamInputData } from 'src/app/features/param/components/param/param.type';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrl: './params.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ParamComponent, SvgIconComponent],
})
export class ParamsComponent {
  readonly #paramService = inject(ParamService);

  readonly isExpanded = signal(true);

  readonly paramList = computed((): ParamInputData[] => {
    const paramMap = this.#paramService.paramsCurrentData();

    return Object.values(PARAM_KEYS)
      .filter((key) => {
        return (
          !paramMap[key].value.isEqual(PARAM_DATA[key as ParamKey].defaultValue) ||
          key === PARAM_KEYS.simpleMoneyMultiplier
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
