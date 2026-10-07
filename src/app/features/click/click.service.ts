import { computed, inject, Injectable } from '@angular/core';
import { ExponentNumber } from 'exponential-number';

import { rollCount } from '../../core/utils/random.utils';
import { EventService } from '../event/event.service';
import { ParamService } from '../param/param.service';
import { ParamKey } from '../param/param.type';
import { ResourceService } from '../resource/resource.service';
import { ResourceKey } from '../resource/resource.type';

interface StoneDrop {
  shard: ResourceKey;
  stone: ResourceKey;
  shardChance: ParamKey;
  shardChanceForStone: ParamKey;
  stoneChance: ParamKey;
  shardsPerDrop: ParamKey;
}

const CRYSTAL_DROP: StoneDrop = {
  shard: 'crystalShards',
  stone: 'crystals',
  shardChance: 'crystalShardTotalChance',
  shardChanceForStone: 'crystalShardChance',
  stoneChance: 'crystalStoneChance',
  shardsPerDrop: 'shardsPerDrop',
};

const RUBY_DROP: StoneDrop = {
  shard: 'rubyShards',
  stone: 'rubies',
  shardChance: 'rubyShardChance',
  shardChanceForStone: 'rubyShardChance',
  stoneChance: 'rubyStoneChance',
  shardsPerDrop: 'rubyShardsPerDrop',
};

@Injectable({ providedIn: 'root' })
export class ClickService {
  readonly #eventService = inject(EventService);
  readonly #paramService = inject(ParamService);
  readonly #resourceService = inject(ResourceService);

  public readonly moneyPerClick = computed(() => this.#paramService.value('moneyPerClick'));

  public click(): number {
    const crits = rollCount(this.#paramService.value('critChance'));
    const moneyPerClick = this.moneyPerClick();
    const money = moneyPerClick.multiply(this.#paramService.value('critMultiplier').power(crits));

    this.#resourceService.add('money', money);

    const crystalShardDrops = this.#rollDrop(CRYSTAL_DROP);

    this.#rollDrop(RUBY_DROP);
    this.#rollCrystalDropBonuses(crystalShardDrops, moneyPerClick);

    this.#eventService.emit('click', { money, isCrit: !crits.isZero() });

    return crits.toNumber();
  }

  #rollDrop(drop: StoneDrop): ExponentNumber {
    const shardChance = this.#paramService.value(drop.shardChance);

    if (shardChance.isZero()) {
      return ExponentNumber.ZERO;
    }

    const shardDrops = rollCount(shardChance);
    const shardsPerDrop = this.#paramService.value(drop.shardsPerDrop);

    this.#gain(drop.shard, rollCount(shardDrops.multiply(shardsPerDrop)));
    this.#gain(drop.stone, this.#rollStones(drop, shardChance, shardDrops));

    return shardDrops;
  }

  #rollStones(
    drop: StoneDrop,
    shardChance: ExponentNumber,
    shardDrops: ExponentNumber,
  ): ExponentNumber {
    const stoneChancePerClick = this.#paramService
      .value(drop.shardChanceForStone)
      .multiply(this.#paramService.value(drop.stoneChance));

    if (shardChance.isGreaterThanValue(1)) {
      return rollCount(stoneChancePerClick);
    }

    return shardDrops.isZero()
      ? ExponentNumber.ZERO
      : rollCount(stoneChancePerClick.divide(shardChance));
  }

  #rollCrystalDropBonuses(crystalShardDrops: ExponentNumber, moneyPerClick: ExponentNumber): void {
    if (crystalShardDrops.isZero()) {
      return;
    }

    this.#gain(
      'money',
      moneyPerClick
        .multiply(this.#paramService.value('shardBountyFactor'))
        .multiply(crystalShardDrops),
    );
    this.#gain(
      'rubyShards',
      rollCount(crystalShardDrops.multiply(this.#paramService.value('twinVeinChance'))),
    );
  }

  #gain(resource: ResourceKey, amount: ExponentNumber): void {
    if (!amount.isZero()) {
      this.#resourceService.add(resource, amount);
    }
  }
}
