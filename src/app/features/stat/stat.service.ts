import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ExponentNumber } from 'exponential-number';

import { mapKeys } from '../../core/utils/record.utils';
import { EventService } from '../event/event.service';
import { RESOURCE_KEYS } from '../resource/resource.const';
import { ResourceKey } from '../resource/resource.type';
import { AchievementCondition } from '../unlock/unlock.type';
import { STAT_DATA, STAT_KEYS } from './stat.const';
import { SavedStats, SavedStatValues, StatData, StatKey } from './stat.type';

type StatSignals<Key extends string> = Record<Key, WritableSignal<ExponentNumber>>;

@Injectable({ providedIn: 'root' })
export class StatService {
  readonly #eventService = inject(EventService);

  readonly #data: Record<StatKey, StatData> = STAT_DATA;

  readonly #startedAt = signal<number | null>(null);

  readonly #counters = this.#createSignals(STAT_KEYS);
  readonly #resourcesEarned = this.#createSignals(RESOURCE_KEYS);
  readonly #resourcesSpent = this.#createSignals(RESOURCE_KEYS);

  public readonly startedAt = this.#startedAt.asReadonly();

  constructor() {
    this.#eventService
      .on('click')
      .pipe(takeUntilDestroyed())
      .subscribe(({ money, isCrit }) => {
        this.#add(this.#counters.clicks, 1);
        this.#add(this.#counters.crits, isCrit ? 1 : 0);
        this.#add(this.#counters.runClicks, 1);
        this.#raise(this.#counters.highestMoneyPerClick, money);
      });

    this.#eventService
      .on('tick')
      .pipe(takeUntilDestroyed())
      .subscribe(({ seconds, isVisible }) => {
        this.#add(this.#counters.playTime, seconds);
        this.#add(this.#counters.runTime, seconds);
        this.#add(this.#counters.runVisibleTime, isVisible ? seconds : 0);
      });

    this.#eventService
      .on('clickMissed')
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.#add(this.#counters.missedClicks, 1);
      });

    this.#eventService
      .on('upgradeBought')
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.#add(this.#counters.upgradeLevelsBought, 1);
      });

    this.#eventService
      .on('treeNodeBought')
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.#add(this.#counters.treeNodesBought, 1);
      });

    this.#eventService
      .on('prestige')
      .pipe(takeUntilDestroyed())
      .subscribe(({ prestigePoints }) => {
        this.#add(this.#counters.prestiges, 1);
        this.#raise(this.#counters.highestPrestigePointsGain, prestigePoints);
        this.#resetRunCounters();
      });

    this.#eventService
      .on('restart')
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.#add(this.#counters.restarts, 1);
        this.#resetRunCounters();
      });

    this.#eventService
      .on('resourceGained')
      .pipe(takeUntilDestroyed())
      .subscribe(({ resource, amount }) => {
        this.#add(this.#resourcesEarned[resource], amount);
      });

    this.#eventService
      .on('resourceSpent')
      .pipe(takeUntilDestroyed())
      .subscribe(({ resource, amount }) => {
        this.#add(this.#resourcesSpent[resource], amount);
      });
  }

  public start(): void {
    if (this.#startedAt() === null) {
      this.#startedAt.set(Date.now());
    }
  }

  public value(key: StatKey): ExponentNumber {
    return this.#counters[key]();
  }

  public resourceEarned(key: ResourceKey): ExponentNumber {
    return this.#resourcesEarned[key]();
  }

  public resourceSpent(key: ResourceKey): ExponentNumber {
    return this.#resourcesSpent[key]();
  }

  public conditionProgress(condition: AchievementCondition): ExponentNumber {
    return condition.type === 'stat'
      ? this.value(condition.stat)
      : this.resourceEarned(condition.resource);
  }

  public isConditionMet(condition: AchievementCondition): boolean {
    return this.conditionProgress(condition).isGreaterThanOrEqualValue(condition.amount);
  }

  public snapshot(): SavedStats {
    return {
      startedAt: this.#startedAt(),
      counters: this.#read(STAT_KEYS, this.#counters),
      resourcesEarned: this.#read(RESOURCE_KEYS, this.#resourcesEarned),
      resourcesSpent: this.#read(RESOURCE_KEYS, this.#resourcesSpent),
    };
  }

  public restore(saved: Partial<SavedStats>): void {
    this.#startedAt.set(saved.startedAt ?? null);
    this.#write(STAT_KEYS, this.#counters, saved.counters ?? {});
    this.#write(RESOURCE_KEYS, this.#resourcesEarned, saved.resourcesEarned ?? {});
    this.#write(RESOURCE_KEYS, this.#resourcesSpent, saved.resourcesSpent ?? {});
  }

  #resetRunCounters(): void {
    for (const key of STAT_KEYS) {
      if (this.#data[key].isResetOnPrestige) {
        this.#counters[key].set(ExponentNumber.ZERO);
      }
    }
  }

  #createSignals<Key extends string>(keys: readonly Key[]): StatSignals<Key> {
    return mapKeys(keys, () => signal(ExponentNumber.ZERO));
  }

  #add(target: WritableSignal<ExponentNumber>, amount: ExponentNumber | number): void {
    target.update((value) => value.plus(amount));
  }

  #raise(target: WritableSignal<ExponentNumber>, candidate: ExponentNumber): void {
    target.update((value) => ExponentNumber.max(value, candidate));
  }

  #read<Key extends string>(keys: readonly Key[], signals: StatSignals<Key>): SavedStatValues {
    return mapKeys(keys, (key) => signals[key]());
  }

  #write<Key extends string>(
    keys: readonly Key[],
    signals: StatSignals<Key>,
    saved: SavedStatValues,
  ): void {
    for (const key of keys) {
      const savedValue = saved[key];

      if (savedValue) {
        signals[key].set(ExponentNumber.from(savedValue));
      }
    }
  }
}
