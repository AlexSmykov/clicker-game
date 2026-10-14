import { Component, computed, inject, input } from '@angular/core';

import { Icon } from '../../../../shared/components/icon/icon';
import { MODIFIER_DATA, MODIFIER_LEVELS } from '../../modifier.const';
import { ModifierService } from '../../modifier.service';
import { ModifierData, ModifierEffect, ModifierKey } from '../../modifier.type';
import { formatModifierValue } from '../../modifier.utils';

interface ModifierEffectView {
  id: string;
  label: string;
  isPenalty: boolean;
  value: string;
}

const PREVIEW_LEVEL = 1;

@Component({
  imports: [Icon],
  selector: 'app-modifier-card',
  styleUrl: './modifier-card.scss',
  templateUrl: './modifier-card.html',
})
export class ModifierCard {
  readonly #modifierService = inject(ModifierService);

  public readonly key = input.required<ModifierKey>();

  protected readonly data = computed((): ModifierData => MODIFIER_DATA[this.key()]);

  protected readonly selectedLevel = computed(() =>
    this.#modifierService.selectedLevel(this.key()),
  );

  protected readonly isPreview = computed(() => this.selectedLevel() === 0);

  protected readonly effects = computed(() => {
    const level = this.isPreview() ? PREVIEW_LEVEL : this.selectedLevel();

    return [
      ...this.data().bonuses.map((effect) => this.#toView(effect, level, false)),
      ...this.data().penalties.map((effect) => this.#toView(effect, level, true)),
    ];
  });

  protected readonly levels = computed(() => {
    const maxLevel = this.#modifierService.maxLevel();
    const selectedLevel = this.selectedLevel();

    return [0, ...MODIFIER_LEVELS].map((level) => ({
      value: level,
      isSelected: level === selectedLevel,
      isLocked: level > maxLevel,
    }));
  });

  protected select(level: number): void {
    this.#modifierService.select(this.key(), level);
  }

  #toView(effect: ModifierEffect, level: number, isPenalty: boolean): ModifierEffectView {
    const value = effect.values[level - 1];

    return {
      id: `${isPenalty ? 'penalty' : 'bonus'}-${effect.param}`,
      label: effect.label,
      isPenalty,
      value: value === undefined ? '' : formatModifierValue(value, effect.display),
    };
  }
}
