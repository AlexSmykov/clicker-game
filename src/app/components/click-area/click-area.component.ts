import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ResourceService } from 'src/app/features/resource/resource.service';
import { ParamService } from 'src/app/features/param/param.service';
import { RESOURCE_KEYS } from 'src/app/features/resource/resource.const';
import { ExponentNumber } from 'exponential-number';
import { PARAM_KEYS } from 'src/app/features/param/param.const';
import { calculateChance } from 'src/app/core/utils/calculate-chance.utils';
import { ResourceComponent } from 'src/app/features/resource/components/resource/resource.component';
import { ResourceInputData } from 'src/app/features/resource/components/resource/resource.type';
import { UnlockService } from 'src/app/features/unlock/unlock.service';
import { UNLOCK_KEYS } from 'src/app/features/unlock/unlock.const';

@Component({
  selector: 'app-click-area',
  templateUrl: './click-area.component.html',
  styleUrl: './click-area.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ResourceComponent],
})
export class ClickAreaComponent {
  readonly #unlockService = inject(UnlockService);
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

    if (resourcesCurrentData[RESOURCE_KEYS.crystalShards].isUnlocked) {
      this.updateCrystalShards();
    }

    if (resourcesCurrentData[RESOURCE_KEYS.crystals].isUnlocked) {
      this.updateCrystals();
    }

    if (resourcesCurrentData[RESOURCE_KEYS.rubyShards].isUnlocked) {
      this.updateRubyShards();
    }

    if (resourcesCurrentData[RESOURCE_KEYS.rubies].isUnlocked) {
      this.updateRubies();
    }
  }

  updateMoney(): void {
    const resourcesCurrentData = this.#resourceService.resourcesCurrentData();

    this.#resourceService.updateResource(RESOURCE_KEYS.money, {
      value: resourcesCurrentData[RESOURCE_KEYS.money].value.plus(this.getNewMoneyValue()),
    });
  }

  updateCrystalShards(): void {
    const resourcesCurrentData = this.#resourceService.resourcesCurrentData();
    const paramsCurrentData = this.#paramService.paramsCurrentData();

    const crystalShardsGained = calculateChance(this.getCrystalChance()).multiply(
      paramsCurrentData[PARAM_KEYS.prestigeCrystalShardsMultiplier].value,
    );

    this.#resourceService.updateResource(RESOURCE_KEYS.crystalShards, {
      value: resourcesCurrentData[RESOURCE_KEYS.crystalShards].value.plus(crystalShardsGained),
    });
  }

  updateCrystals(): void {
    const resourcesCurrentData = this.#resourceService.resourcesCurrentData();
    const paramsCurrentData = this.#paramService.paramsCurrentData();

    const crystalsGained = calculateChance(
      this.getCrystalChance().root(
        paramsCurrentData[PARAM_KEYS.crystalChanceRootBaseForCrystals].value
          .copy()
          .plus(new ExponentNumber(0, 1)),
      ),
    );

    this.#resourceService.updateResource(RESOURCE_KEYS.crystals, {
      value: resourcesCurrentData[RESOURCE_KEYS.crystals].value.plus(crystalsGained),
    });
  }

  updateRubyShards(): void {
    const resourcesCurrentData = this.#resourceService.resourcesCurrentData();

    const rubyShardsGained = calculateChance(this.getRubyChance());

    this.#resourceService.updateResource(RESOURCE_KEYS.rubyShards, {
      value: resourcesCurrentData[RESOURCE_KEYS.rubyShards].value.plus(rubyShardsGained),
    });
  }

  updateRubies(): void {
    const resourcesCurrentData = this.#resourceService.resourcesCurrentData();
    const paramsCurrentData = this.#paramService.paramsCurrentData();

    const rubiesGained = calculateChance(
      this.getRubyChance().root(
        paramsCurrentData[PARAM_KEYS.rubyChanceRootBaseForRubies].value
          .copy()
          .plus(new ExponentNumber(0, 1)),
      ),
    );

    this.#resourceService.updateResource(RESOURCE_KEYS.rubies, {
      value: resourcesCurrentData[RESOURCE_KEYS.rubies].value.plus(rubiesGained),
    });
  }

  getNewMoneyValue(): ExponentNumber {
    const resourcesCurrentData = this.#resourceService.resourcesCurrentData();
    const paramsCurrentData = this.#paramService.paramsCurrentData();
    const unlocksCurrentData = this.#unlockService.unlocksCurrentData();

    const value = new ExponentNumber(0, 1)
      .multiply(paramsCurrentData[PARAM_KEYS.simpleMoneyMultiplier].value)
      .multiply(paramsCurrentData[PARAM_KEYS.bonusMoneyMultiplier].value)
      .multiply(paramsCurrentData[PARAM_KEYS.crystalShardsMoneyMultiplier].value)
      .multiply(paramsCurrentData[PARAM_KEYS.rubyShardsMoneyMultiplier].value)
      .power(
        new ExponentNumber(0, 1)
          .plus(paramsCurrentData[PARAM_KEYS.simpleMoneyPower].value)
          .plus(paramsCurrentData[PARAM_KEYS.rubyShardsMoneyPower].value)
          .plus(paramsCurrentData[PARAM_KEYS.prestigeMoneyPower].value),
      );

    if (
      unlocksCurrentData[UNLOCK_KEYS.moneyLog].isUnlocked &&
      resourcesCurrentData[RESOURCE_KEYS.money].value.isGreaterThanValue(new ExponentNumber(0, 1))
    ) {
      value.multiply(
        resourcesCurrentData[RESOURCE_KEYS.money].value
          .copy()
          .log(
            paramsCurrentData[PARAM_KEYS.moneyLogBase].value.copy().plus(new ExponentNumber(0, 1)),
          )
          .power(paramsCurrentData[PARAM_KEYS.moneyLogPower].value.copy()),
      );
    }

    if (
      unlocksCurrentData[UNLOCK_KEYS.crystalShardLog].isUnlocked &&
      resourcesCurrentData[RESOURCE_KEYS.crystalShards].value.isGreaterThanValue(
        new ExponentNumber(0, 1),
      )
    ) {
      value.multiply(
        resourcesCurrentData[RESOURCE_KEYS.crystalShards].value
          .copy()
          .log(
            paramsCurrentData[PARAM_KEYS.crystalShardsLogBase].value
              .copy()
              .plus(new ExponentNumber(0, 1)),
          )
          .power(paramsCurrentData[PARAM_KEYS.crystalShardsLogPower].value.copy()),
      );
    }

    if (
      unlocksCurrentData[UNLOCK_KEYS.prestigeLog].isUnlocked &&
      resourcesCurrentData[RESOURCE_KEYS.prestigePoints].value.isGreaterThanValue(
        new ExponentNumber(0, 1),
      )
    ) {
      value.multiply(
        resourcesCurrentData[RESOURCE_KEYS.prestigePoints].value
          .copy()
          .log(
            paramsCurrentData[PARAM_KEYS.prestigeLogBase].value
              .copy()
              .plus(new ExponentNumber(0, 1)),
          )
          .power(paramsCurrentData[PARAM_KEYS.prestigeLogPower].value.copy()),
      );
    }

    if (
      unlocksCurrentData[UNLOCK_KEYS.rubyShardLog].isUnlocked &&
      resourcesCurrentData[RESOURCE_KEYS.rubyShards].value.isGreaterThanValue(
        new ExponentNumber(0, 1),
      )
    ) {
      value.multiply(
        resourcesCurrentData[RESOURCE_KEYS.rubyShards].value
          .copy()
          .log(
            paramsCurrentData[PARAM_KEYS.rubyShardsLogBase].value
              .copy()
              .plus(new ExponentNumber(0, 1)),
          )
          .power(paramsCurrentData[PARAM_KEYS.rubyShardsLogPower].value.copy()),
      );
    }

    return value;
  }

  getCrystalChance(): ExponentNumber {
    const paramsCurrentData = this.#paramService.paramsCurrentData();

    return paramsCurrentData[PARAM_KEYS.baseCrystalChance].value
      .copy()
      .plus(paramsCurrentData[PARAM_KEYS.crystalChance].value.copy())
      .plus(paramsCurrentData[PARAM_KEYS.moneyCrystalChance].value.copy())
      .plus(paramsCurrentData[PARAM_KEYS.bonusCrystalChance].value.copy())
      .plus(paramsCurrentData[PARAM_KEYS.rubyShardsCrystalChance].value.copy());
  }

  getRubyChance(): ExponentNumber {
    const paramsCurrentData = this.#paramService.paramsCurrentData();

    return paramsCurrentData[PARAM_KEYS.baseRubyChance].value
      .copy()
      .plus(paramsCurrentData[PARAM_KEYS.rubyChance].value.copy())
      .plus(paramsCurrentData[PARAM_KEYS.baseRubyChance].value.copy())
      .plus(paramsCurrentData[PARAM_KEYS.rubyPrestigeChance].value.copy());
  }
}
