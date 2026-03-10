import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ParamInputData } from 'src/app/features/param/components/param/param.type';
import { PARAM_DATA } from 'src/app/features/param/param.const';
import { HUNDRED_PERCENT_DIVIDER } from 'src/app/core/consts/percent.const';
import { ExponentNumber } from 'exponential-number';

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

    let value = data.value;

    if (this.isPercent()) {
      value = data.value.copy().divide(HUNDRED_PERCENT_DIVIDER);
    }

    if (this.resourceData[data.key].isWithOne) {
      value = data.value.copy().plus(new ExponentNumber(0, 1));
    }

    return value;
  });

  readonly resourceData = PARAM_DATA;
}
