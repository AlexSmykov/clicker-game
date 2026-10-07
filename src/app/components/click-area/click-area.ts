import { Component, computed, inject, signal } from '@angular/core';

import { ClickService } from '../../features/click/click.service';
import { PARAM_DATA } from '../../features/param/param.const';
import { ParamService } from '../../features/param/param.service';
import { ParamKey } from '../../features/param/param.type';
import { formatParam } from '../../features/param/param.utils';
import { Resource } from '../../features/resource/components/resource/resource';
import { SettingService } from '../../features/setting/setting.service';

interface ClickFlash {
  id: number;
  label: string;
  isMiss: boolean;
}

interface ChanceLine {
  chance: ParamKey;
  amount?: ParamKey;
  hiddenAt: number;
}

const CHANCE_LINES: ChanceLine[] = [
  { chance: 'clickHitChance', hiddenAt: 1 },
  { chance: 'critChance', amount: 'effectiveCritMultiplier', hiddenAt: 0 },
  { chance: 'crystalShardTotalChance', amount: 'shardsPerDrop', hiddenAt: 0 },
  { chance: 'crystalChance', hiddenAt: 0 },
  { chance: 'rubyShardChance', amount: 'rubyShardsPerDrop', hiddenAt: 0 },
  { chance: 'rubyChance', hiddenAt: 0 },
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

  #flashId = 0;

  protected readonly moneyPerClick = this.#clickService.moneyPerClick;

  protected readonly flashes = signal<ClickFlash[]>([]);

  protected readonly chances = computed(() =>
    CHANCE_LINES.filter(
      (line) =>
        this.#settingService.isOn('showClickChances') &&
        !this.#paramService.value(line.chance).isEqual(line.hiddenAt),
    ).map((line) => ({
      key: line.chance,
      name: PARAM_DATA[line.chance].name,
      value: this.#format(line.chance),
      amount: line.amount ? this.#format(line.amount) : null,
    })),
  );

  protected click(): void {
    const { isHit, crits } = this.#clickService.click();

    if (!isHit) {
      this.#flash('Miss', true);
    } else if (crits > 0 && this.#settingService.isOn('showCritEffect')) {
      this.#flash(crits === 1 ? 'Crit!' : `Crit x${crits}!`, false);
    }
  }

  #flash(label: string, isMiss: boolean): void {
    this.#flashId += 1;
    this.flashes.set([{ id: this.#flashId, label, isMiss }]);
  }

  #format(key: ParamKey): string {
    return formatParam(this.#paramService.value(key), PARAM_DATA[key].format);
  }
}
