import { Component, computed, inject, signal } from '@angular/core';

import { ModifierCard } from '../../features/modifier/components/modifier-card/modifier-card';
import { MODIFIER_DATA, MODIFIER_KEYS } from '../../features/modifier/modifier.const';
import { ModifierService } from '../../features/modifier/modifier.service';
import { PrestigeService } from '../../features/prestige/prestige.service';
import { Icon } from '../../shared/components/icon/icon';

@Component({
  imports: [ModifierCard, Icon],
  selector: 'app-modifiers',
  styleUrl: './modifiers.scss',
  templateUrl: './modifiers.html',
})
export default class Modifiers {
  readonly #modifierService = inject(ModifierService);
  readonly #prestigeService = inject(PrestigeService);

  protected readonly keys = MODIFIER_KEYS;
  protected readonly isUnlocked = this.#modifierService.isUnlocked;
  protected readonly maxLevel = this.#modifierService.maxLevel;
  protected readonly hasPendingChanges = this.#modifierService.hasPendingChanges;

  protected readonly isConfirming = signal(false);

  protected readonly summary = computed(() =>
    MODIFIER_KEYS.map((key) => {
      const activeLevel = this.#modifierService.activeLevel(key);
      const selectedLevel = this.#modifierService.selectedLevel(key);

      return {
        key,
        name: MODIFIER_DATA[key].name,
        iconPath: MODIFIER_DATA[key].iconPath,
        activeLevel,
        selectedLevel,
        isChanged: activeLevel !== selectedLevel,
        isActive: activeLevel > 0,
      };
    }),
  );

  protected restart(): void {
    if (!this.isConfirming()) {
      this.isConfirming.set(true);

      return;
    }

    this.#prestigeService.restart();
    this.isConfirming.set(false);
  }

  protected cancel(): void {
    this.isConfirming.set(false);
  }
}
