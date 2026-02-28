import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { UpgradeEffectChange } from 'src/app/features/upgrade/upgrade.type';
import { PARAM_DATA } from 'src/app/features/param/param.const';
import { ParamComponent } from 'src/app/features/param/components/param/param.component';

@Component({
  selector: 'app-upgrade-effect',
  templateUrl: './upgrade-effect.component.html',
  styleUrl: './upgrade-effect.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ParamComponent],
})
export class UpgradeEffectComponent {
  readonly effect = input.required<UpgradeEffectChange>();

  readonly paramData = PARAM_DATA;

  readonly isPercent = computed(() => this.paramData[this.effect().paramKey].isPercent);

  readonly values = computed(() => {
    const effect = this.effect();

    return {
      oldValue: {
        key: effect.paramKey,
        value: effect.oldValue,
      },
      newValue: {
        key: effect.paramKey,
        value: effect.newValue,
      },
    };
  });
}
