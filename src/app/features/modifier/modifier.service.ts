import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';

import { mapKeys } from '../../core/utils/record.utils';
import { Effect, EffectProvider, EffectSource } from '../param/param.type';
import { TreeService } from '../tree/tree.service';
import { MODIFIER_DATA, MODIFIER_KEYS, MODIFIER_LEVELS } from './modifier.const';
import { ModifierData, ModifierKey, SavedModifierLevels, SavedModifiers } from './modifier.type';

type ModifierLevels = Record<ModifierKey, WritableSignal<number>>;

@Injectable({ providedIn: 'root' })
export class ModifierService implements EffectProvider {
  readonly #treeService = inject(TreeService);

  readonly #data: Record<ModifierKey, ModifierData> = MODIFIER_DATA;

  readonly #selected: ModifierLevels = mapKeys(MODIFIER_KEYS, () => signal(0));
  readonly #active: ModifierLevels = mapKeys(MODIFIER_KEYS, () => signal(0));

  public readonly isUnlocked = computed(() => this.#treeService.isBought('modifiers'));

  public readonly maxLevel = computed(() => {
    if (!this.isUnlocked()) {
      return 0;
    }

    return (
      1 +
      Number(this.#treeService.isBought('modifiersLevelTwo')) +
      Number(this.#treeService.isBought('modifiersLevelThree'))
    );
  });

  public readonly hasPendingChanges = computed(() =>
    MODIFIER_KEYS.some((key) => this.#selected[key]() !== this.#active[key]()),
  );

  public readonly effectSources: EffectSource[] = MODIFIER_KEYS.flatMap((key) =>
    MODIFIER_LEVELS.map((level) => ({
      effects: this.#effectsAt(key, level),
      level: computed(() => (this.#active[key]() === level ? 1 : 0)),
    })),
  );

  public selectedLevel(key: ModifierKey): number {
    return this.#selected[key]();
  }

  public activeLevel(key: ModifierKey): number {
    return this.#active[key]();
  }

  public select(key: ModifierKey, level: number): void {
    if (level >= 0 && level <= this.maxLevel()) {
      this.#selected[key].set(level);
    }
  }

  public applySelection(): void {
    const maxLevel = this.maxLevel();

    for (const key of MODIFIER_KEYS) {
      const level = Math.min(this.#selected[key](), maxLevel);

      this.#selected[key].set(level);
      this.#active[key].set(level);
    }
  }

  public snapshot(): SavedModifiers {
    return {
      selected: mapKeys(MODIFIER_KEYS, (key) => this.#selected[key]()),
      active: mapKeys(MODIFIER_KEYS, (key) => this.#active[key]()),
    };
  }

  public restore(saved: Partial<SavedModifiers>): void {
    this.#restoreLevels(this.#selected, saved.selected ?? {});
    this.#restoreLevels(this.#active, saved.active ?? {});
  }

  #restoreLevels(levels: ModifierLevels, saved: SavedModifierLevels): void {
    for (const key of MODIFIER_KEYS) {
      const level = saved[key];

      if (typeof level === 'number' && level >= 0 && level <= MODIFIER_LEVELS.length) {
        levels[key].set(Math.floor(level));
      }
    }
  }

  #effectsAt(key: ModifierKey, level: number): Effect[] {
    const { bonuses, penalties } = this.#data[key];

    return [...bonuses, ...penalties].flatMap((effect): Effect[] => {
      const value = effect.values[level - 1];

      return value === undefined
        ? []
        : [{ param: effect.param, operation: effect.operation, value }];
    });
  }
}
