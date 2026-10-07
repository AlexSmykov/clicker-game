import { Component, computed, DestroyRef, inject, input } from '@angular/core';

import { Icon } from '../../../../shared/components/icon/icon';
import { PARAM_DATA } from '../../../param/param.const';
import { ParamService } from '../../../param/param.service';
import { formatParam } from '../../../param/param.utils';
import { Resource } from '../../../resource/components/resource/resource';
import { SettingService } from '../../../setting/setting.service';
import { TAG_DATA } from '../../../tag/tag.const';
import { UpgradeStateService } from '../../upgrade-state.service';
import { UPGRADE_DATA } from '../../upgrade.const';
import { UpgradeService } from '../../upgrade.service';
import { UpgradeData, UpgradeKey } from '../../upgrade.type';
import { UpgradeEffectView } from './upgrade.type';

const HOLD_DELAY_MS = 300;
const HOLD_INTERVAL_MS = 50;
const FAST_HOLD_INTERVAL_MS = 10;
const PRIMARY_BUTTON = 0;

@Component({
  host: {
    '(document:pointercancel)': 'stopBuying()',
    '(document:pointerup)': 'stopBuying()',
  },
  imports: [Resource, Icon],
  selector: 'app-upgrade',
  styleUrl: './upgrade.scss',
  templateUrl: './upgrade.html',
})
export class Upgrade {
  readonly #paramService = inject(ParamService);
  readonly #settingService = inject(SettingService);
  readonly #upgradeService = inject(UpgradeService);
  readonly #upgradeStateService = inject(UpgradeStateService);

  #holdDelay: ReturnType<typeof setTimeout> | undefined;
  #holdInterval: ReturnType<typeof setInterval> | undefined;

  public readonly key = input.required<UpgradeKey>();

  protected readonly data = computed((): UpgradeData => UPGRADE_DATA[this.key()]);
  protected readonly level = computed(() => this.#upgradeStateService.level(this.key()));
  protected readonly softcap = computed(() => this.#upgradeService.softcap(this.key()));

  protected readonly softcapLabel = computed(() => {
    const { index } = this.softcap();

    if (index === 0) {
      return null;
    }

    return index === 1 ? 'Softcapped' : `Softcapped x${index}`;
  });
  protected readonly isMaxed = computed(() => this.#upgradeService.isMaxed(this.key()));
  protected readonly isAffordable = computed(() => this.#upgradeService.isAffordable(this.key()));
  protected readonly costs = computed(() => this.#upgradeService.costs(this.key()));
  protected readonly tags = computed(() => this.data().tags.map((tag) => TAG_DATA[tag]));

  protected readonly effects = computed((): UpgradeEffectView[] => {
    const source = this.#upgradeStateService.sources[this.key()];
    const isMaxed = this.isMaxed();

    return this.#paramService.shownParams(source).map((param) => {
      const { name, format } = PARAM_DATA[param];

      return {
        param,
        name,
        currentValue: formatParam(this.#paramService.value(param), format),
        nextValue: isMaxed ? null : formatParam(this.#paramService.preview(param, source), format),
      };
    });
  });

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.stopBuying();
    });
  }

  protected buy(): void {
    this.#upgradeService.buy(this.key());
  }

  protected startBuying(event: PointerEvent): void {
    if (event.button !== PRIMARY_BUTTON) {
      return;
    }

    this.stopBuying();
    this.buy();

    if (!this.#settingService.isOn('buyUpgradesByHold')) {
      return;
    }

    const interval = this.#settingService.isOn('fastBuyUpgradesByHold')
      ? FAST_HOLD_INTERVAL_MS
      : HOLD_INTERVAL_MS;

    this.#holdDelay = setTimeout(() => {
      this.#holdInterval = setInterval(() => {
        this.buy();
      }, interval);
    }, HOLD_DELAY_MS);
  }

  protected stopBuying(): void {
    clearTimeout(this.#holdDelay);
    clearInterval(this.#holdInterval);
  }
}
