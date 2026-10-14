import { computed, inject, Injectable } from '@angular/core';
import { ExponentNumber } from 'exponential-number';

import { rollChance, rollCount } from '../../core/utils/random.utils';
import { EventService } from '../event/event.service';
import { ParamService } from '../param/param.service';
import { ParamKey } from '../param/param.type';
import { ResourceService } from '../resource/resource.service';
import { ResourceKey } from '../resource/resource.type';
import { ClickResult } from './click.type';

interface StoneDrop {
  shard: ResourceKey;
  stone: ResourceKey;
  shardChance: ParamKey;
  stoneChance: ParamKey;
  shardsPerDrop: ParamKey;
}

const CRYSTAL_DROP: StoneDrop = {
  shard: 'crystalShards',
  stone: 'crystals',
  shardChance: 'crystalShardTotalChance',
  stoneChance: 'crystalChance',
  shardsPerDrop: 'shardsPerDrop',
};

const RUBY_DROP: StoneDrop = {
  shard: 'rubyShards',
  stone: 'rubies',
  shardChance: 'rubyShardChance',
  stoneChance: 'rubyChance',
  shardsPerDrop: 'rubyShardsPerDrop',
};

@Injectable({ providedIn: 'root' })
export class ClickService {
  readonly #eventService = inject(EventService);
  readonly #paramService = inject(ParamService);
  readonly #resourceService = inject(ResourceService);

  public readonly moneyPerClick = computed(() => this.#paramService.value('moneyPerClick'));

  public click(): ClickResult {
    if (!rollChance(this.#paramService.value('clickHitChance'))) {
      this.#eventService.emit('clickMissed', {});

      return { isHit: false, crits: 0 };
    }

    const crits = rollCount(this.#paramService.value('critChance'));
    const moneyPerClick = this.moneyPerClick();
    const money = moneyPerClick.multiply(
      this.#paramService.value('effectiveCritMultiplier').power(crits),
    );

    this.#resourceService.add('money', money);

    const crystalShardDrops = this.#rollDrop(CRYSTAL_DROP);

    this.#rollDrop(RUBY_DROP);
    this.#rollCrystalDropBonuses(crystalShardDrops, moneyPerClick);

    this.#eventService.emit('click', { money, isCrit: !crits.isZero() });

    return { isHit: true, crits: crits.toNumber() };
  }

  #rollDrop(drop: StoneDrop): ExponentNumber {
    const shardDrops = rollCount(this.#paramService.value(drop.shardChance));
    const shardsPerDrop = this.#paramService.value(drop.shardsPerDrop);

    this.#gain(drop.shard, rollCount(shardDrops.multiply(shardsPerDrop)));
    this.#gain(drop.stone, rollCount(this.#paramService.value(drop.stoneChance)));

    return shardDrops;
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
      rollCount(
        crystalShardDrops
          .multiply(this.#paramService.value('twinVeinChance'))
          .multiply(this.#paramService.value('twinVeinShardsPerDrop')),
      ),
    );
  }

  #gain(resource: ResourceKey, amount: ExponentNumber): void {
    if (!amount.isZero()) {
      this.#resourceService.add(resource, amount);
    }
  }
}
