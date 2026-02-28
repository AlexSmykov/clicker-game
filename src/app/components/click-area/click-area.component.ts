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
    const resources = this.#resourceService.resourceMap();

    this.updateMoney();

    if (resources[RESOURCE_KEYS.crystal].isUnlocked) {
      this.updateCrystals();
    }
  }

  updateMoney(): void {
    const resources = this.#resourceService.resourceMap();

    this.#resourceService.updateResource(RESOURCE_KEYS.money, {
      isUnlocked: resources[RESOURCE_KEYS.money].isUnlocked,
      value: resources[RESOURCE_KEYS.money].value.plus(this.getNewMoneyValue()),
    });
  }

  updateCrystals(): void {
    const resources = this.#resourceService.resourceMap();
    const params = this.#paramService.paramMap();

    const crystalGained = calculateChance(params[PARAM_KEYS.crystalChance].value);

    this.#resourceService.updateResource(RESOURCE_KEYS.crystal, {
      isUnlocked: resources[RESOURCE_KEYS.crystal].isUnlocked,
      value: resources[RESOURCE_KEYS.crystal].value.plus(crystalGained),
    });
  }

  getNewMoneyValue(): ExponentNumber {
    const params = this.#paramService.paramMap();

    return new ExponentNumber(0, 1)
      .multiply(params[PARAM_KEYS.simpleMoneyMultiplier].value)
      .multiply(params[PARAM_KEYS.crystalMoneyMultiplier].value)
      .power(params[PARAM_KEYS.simpleMoneyPower].value);
  }
}
