import { Component, computed, inject, signal } from '@angular/core';

import { SaveService } from '../../features/save/save.service';

@Component({
  selector: 'app-settings',
  styleUrl: './settings.scss',
  templateUrl: './settings.html',
})
export default class Settings {
  readonly #saveService = inject(SaveService);

  readonly #isJustSaved = signal(false);

  protected readonly isResetConfirming = signal(false);

  protected readonly saveLabel = computed(() =>
    this.#isJustSaved() ? 'Progress saved!' : 'Save now',
  );

  protected save(): void {
    this.#saveService.save();
    this.#isJustSaved.set(true);
  }

  protected clearSaved(): void {
    this.#isJustSaved.set(false);
  }

  protected reset(): void {
    if (!this.isResetConfirming()) {
      this.isResetConfirming.set(true);

      return;
    }

    this.#saveService.reset();
  }

  protected cancelReset(): void {
    this.isResetConfirming.set(false);
  }
}
