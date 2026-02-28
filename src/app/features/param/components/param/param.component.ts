import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ParamInputData } from 'src/app/features/param/components/param/param.type';
import { PARAM_DATA } from 'src/app/features/param/param.const';
import { HUNDRED_PERCENT_DIVIDER } from 'src/app/core/consts/percent.const';

@Component({
  selector: 'app-param',
  templateUrl: './param.component.html',
  styleUrl: './param.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class ParamComponent {
  readonly data = input.required<ParamInputData>();
  readonly isShort = input(false);

  readonly isPercent = computed(() => this.resourceData[this.data().key].isPercent);

  readonly parsedValue = computed(() => {
    const data = this.data();

    if (this.isPercent()) {
      return data.value.copy().divide(HUNDRED_PERCENT_DIVIDER);
    }

    return data.value;
  });

  readonly resourceData = PARAM_DATA;
}
