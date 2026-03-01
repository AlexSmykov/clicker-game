import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ResourceService } from 'src/app/features/resource/resource.service';
import { ParamService } from 'src/app/features/param/param.service';
import { RESOURCE_KEYS } from 'src/app/features/resource/resource.const';
import { ExponentNumber } from 'exponential-number';
import { PARAM_KEYS } from 'src/app/features/param/param.const';
import { calculateChance } from 'src/app/core/utils/calculate-chance.utils';
import { ResourceComponent } from 'src/app/features/resource/components/resource/resource.component';
import { ResourceInputData } from 'src/app/features/resource/components/resource/resource.type';

@Component({
  selector: 'app-click-area',
  templateUrl: './click-area.component.html',
  styleUrl: './click-area.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ResourceComponent],
})
export class ClickAreaComponent {
  readonly #resourceService = inject(ResourceService);
  readonly #paramService = inject(ParamService);

  readonly moneyOnNextClick = computed((): ResourceInputData => {
    return {
      key: RESOURCE_KEYS.money,
      value: this.getNewMoneyValue(),
    };
  });

  click(): void {
    const resourcesCurrentData = this.#resourceService.resourcesCurrentData();

    this.updateMoney();

    if (resourcesCurrentData[RESOURCE_KEYS.crystal].isUnlocked) {
      this.updateCrystals();
    }
  }

  updateMoney(): void {
    const resourcesCurrentData = this.#resourceService.resourcesCurrentData();

    this.#resourceService.updateResource(RESOURCE_KEYS.money, {
      value: resourcesCurrentData[RESOURCE_KEYS.money].value.plus(this.getNewMoneyValue()),
    });
  }

  updateCrystals(): void {
    const resourcesCurrentData = this.#resourceService.resourcesCurrentData();
    const paramsCurrentData = this.#paramService.paramsCurrentData();

    const crystalGained = calculateChance(
      paramsCurrentData[PARAM_KEYS.crystalChance].value
        .copy()
        .plus(paramsCurrentData[PARAM_KEYS.baseCrystalChance].value),
    );

    this.#resourceService.updateResource(RESOURCE_KEYS.crystal, {
      value: resourcesCurrentData[RESOURCE_KEYS.crystal].value.plus(crystalGained),
    });
  }

  getNewMoneyValue(): ExponentNumber {
    const paramsCurrentData = this.#paramService.paramsCurrentData();

    return new ExponentNumber(0, 1)
      .multiply(paramsCurrentData[PARAM_KEYS.simpleMoneyMultiplier].value)
      .multiply(paramsCurrentData[PARAM_KEYS.crystalMoneyMultiplier].value)
      .power(paramsCurrentData[PARAM_KEYS.simpleMoneyPower].value);
  }
}
