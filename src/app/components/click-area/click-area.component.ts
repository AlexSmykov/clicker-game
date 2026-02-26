import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ResourceService } from 'src/app/features/resource/resource.service';
import { ParamService } from 'src/app/features/param/param.service';
import { RESOURCE_KEYS } from 'src/app/features/resource/resource.const';
import { ExponentNumber } from 'exponential-number';
import { PARAM_KEYS } from 'src/app/features/param/param.const';
import { calculateChance } from 'src/app/core/utils/calculate-chance.utils';

@Component({
  selector: 'app-click-area',
  templateUrl: './click-area.component.html',
  styleUrl: './click-area.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClickAreaComponent {
  readonly #resourceService = inject(ResourceService);
  readonly #paramService = inject(ParamService);

  click(): void {
    const resources = this.#resourceService.resourceMap();
    const params = this.#paramService.paramMap();

    this.#resourceService.updateResource(
      RESOURCE_KEYS.money,
      resources[RESOURCE_KEYS.money].plus(
        new ExponentNumber(0, 1).multiply(params[PARAM_KEYS.simpleClickMultiplier]),
      ),
    );

    const crystalGained = calculateChance(params[PARAM_KEYS.crystalChance]);

    this.#resourceService.updateResource(
      RESOURCE_KEYS.crystal,
      resources[RESOURCE_KEYS.crystal].plus(crystalGained),
    );
  }
}
