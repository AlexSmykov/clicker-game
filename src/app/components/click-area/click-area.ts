import { Component, computed, inject, signal } from '@angular/core';

import { ClickService } from '../../features/click/click.service';
import { PARAM_DATA } from '../../features/param/param.const';
import { ParamService } from '../../features/param/param.service';
import { ParamKey } from '../../features/param/param.type';
import { formatParam } from '../../features/param/param.utils';
import { Resource } from '../../features/resource/components/resource/resource';
import { SettingService } from '../../features/setting/setting.service';

interface CritFlash {
  id: number;
  label: string;
}

interface ChanceLine {
  chance: ParamKey;
  amount?: ParamKey;
}

const CHANCE_LINES: ChanceLine[] = [
  { chance: 'critChance', amount: 'critMultiplier' },
  { chance: 'crystalShardTotalChance', amount: 'shardsPerDrop' },
  { chance: 'crystalChance' },
  { chance: 'rubyShardChance', amount: 'rubyShardsPerDrop' },
  { chance: 'rubyChance' },
];

@Component({
  imports: [Resource],
  selector: 'app-click-area',
  styleUrl: './click-area.scss',
  templateUrl: './click-area.html',
})
export class ClickArea {
  readonly #clickService = inject(ClickService);
  readonly #paramService = inject(ParamService);
  readonly #settingService = inject(SettingService);

  #critId = 0;

  protected readonly moneyPerClick = this.#clickService.moneyPerClick;

  protected readonly critFlashes = signal<CritFlash[]>([]);

  protected readonly chances = computed(() =>
    CHANCE_LINES.filter(
      (line) =>
        this.#settingService.isOn('showClickChances') &&
        !this.#paramService.value(line.chance).isZero(),
    ).map((line) => ({
      key: line.chance,
      name: PARAM_DATA[line.chance].name,
      value: this.#format(line.chance),
      amount: line.amount ? this.#format(line.amount) : null,
    })),
  );

  protected click(): void {
    const crits = this.#clickService.click();

    if (crits > 0 && this.#settingService.isOn('showCritEffect')) {
      this.#critId += 1;
      this.critFlashes.set([
        { id: this.#critId, label: crits === 1 ? 'Crit!' : `Crit x${crits}!` },
      ]);
    }
  }

  #format(key: ParamKey): string {
    return formatParam(this.#paramService.value(key), PARAM_DATA[key].format);
  }
}
