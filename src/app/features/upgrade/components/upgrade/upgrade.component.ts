import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';
import { UpgradeCurrentCost, UpgradeData } from 'src/app/features/upgrade/upgrade.type';
import { ResourceComponent } from 'src/app/features/resource/components/resource/resource.component';
import { ResourceService } from 'src/app/features/resource/resource.service';
import { ParamService } from 'src/app/features/param/param.service';
import { changeParamValue } from 'src/app/core/utils/value-change.utils';
import { UpgradeEffectComponent } from 'src/app/features/upgrade/components/effect/upgrade-effect.component';
import { SettingService } from 'src/app/features/setting/setting.service';
import { SETTING_KEYS } from 'src/app/features/setting/setting.const';
import { Subscription, timer } from 'rxjs';
import { NgTemplateOutlet } from '@angular/common';

const BASE_BUY_COOLDOWN_MS = 250;
const FAST_BUY_COOLDOWN_MS = 150;

const BASE_BUY_COOLDOWN_DIVIDER = 1.15;
const FAST_BUY_COOLDOWN_DIVIDER = 1.3;

const BASE_BUY_COOLDOWN_MIN_MS = 40;
const FAST_BUY_COOLDOWN_MIN_MS = 10;

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrl: './upgrade.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ResourceComponent, UpgradeEffectComponent, NgTemplateOutlet],
})
export class UpgradeComponent {
  readonly data = input.required<UpgradeData>();
  readonly costs = input.required<UpgradeCurrentCost[]>();
  readonly level = input.required<number>();

  readonly buy = output<void>();

  readonly #settingsService = inject(SettingService);
  readonly #resourceService = inject(ResourceService);
  readonly #paramService = inject(ParamService);

  readonly isHold = signal(false);
  readonly currentTimerSubscription = signal<Subscription | null>(null);

  readonly defaultBuyCooldown = computed(() =>
    this.#settingsService.settingCurrentData()[SETTING_KEYS.fastBuyUpgradesByHold].isOn
      ? FAST_BUY_COOLDOWN_MS
      : BASE_BUY_COOLDOWN_MS,
  );

  readonly defaultBuyCooldownDivider = computed(() =>
    this.#settingsService.settingCurrentData()[SETTING_KEYS.fastBuyUpgradesByHold].isOn
      ? FAST_BUY_COOLDOWN_DIVIDER
      : BASE_BUY_COOLDOWN_DIVIDER,
  );

  readonly defaultBuyCooldownMin = computed(() =>
    this.#settingsService.settingCurrentData()[SETTING_KEYS.fastBuyUpgradesByHold].isOn
      ? FAST_BUY_COOLDOWN_MIN_MS
      : BASE_BUY_COOLDOWN_MIN_MS,
  );

  readonly currentBuyCooldown = linkedSignal<number>(() => this.defaultBuyCooldown());

  readonly parsedCosts = computed(() =>
    this.costs().map((cost) => {
      return { key: cost.resource, value: cost.value };
    }),
  );

  readonly isCanBuy = computed(() => {
    const settingsCurrentData = this.#settingsService.settingCurrentData();

    if (settingsCurrentData[SETTING_KEYS.freeUpgrades].isOn) {
      return true;
    }

    const costs = this.parsedCosts();
    const resourcesCurrentData = this.#resourceService.resourcesCurrentData();

    return costs.every((cost) =>
      resourcesCurrentData[cost.key].value.isGreaterThanOrEqualValue(cost.value),
    );
  });

  readonly effects = computed(() => {
    const effects = this.data().effects;
    const paramsCurrentData = this.#paramService.paramsCurrentData();

    return effects.map((effect) => {
      return {
        paramKey: effect.paramKey,
        oldValue: paramsCurrentData[effect.paramKey].value,
        newValue: changeParamValue(
          paramsCurrentData[effect.paramKey].value.copy(),
          effect.change,
          paramsCurrentData,
        ),
      };
    });
  });

  onMouseDown(): void {
    this.isHold.set(true);
    this.#buy();
  }

  #startBuyTimer(): void {
    this.currentTimerSubscription.set(
      timer(this.currentBuyCooldown()).subscribe(() => {
        this.#buy();
      }),
    );
  }

  #buy(): void {
    if (!this.isCanBuy() || !this.isHold()) {
      return;
    }

    this.buy.emit();

    this.currentBuyCooldown.update((oldValue) =>
      Math.max(oldValue / this.defaultBuyCooldownDivider(), this.defaultBuyCooldownMin()),
    );

    const settingsCurrentData = this.#settingsService.settingCurrentData();

    if (settingsCurrentData[SETTING_KEYS.buyUpgradesByHold].isOn) {
      this.#startBuyTimer();
    }
  }

  onMouseUp(): void {
    this.isHold.set(false);
    this.currentTimerSubscription()?.unsubscribe();

    this.currentBuyCooldown.set(this.defaultBuyCooldown());
  }
}
