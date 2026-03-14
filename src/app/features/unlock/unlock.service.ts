import { inject, Injectable, signal } from '@angular/core';
import { UNLOCK_CURRENT_DATA } from 'src/app/features/unlock/unlock.const';
import { UnlockCurrentData, UnlockKey } from './unlock.type';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { LOCAL_STORAGE_KEYS } from 'src/app/core/services/local-storage/local-storage.const';
import { copy } from 'src/app/core/utils/common.utils';

@Injectable()
export class UnlockService {
  readonly #localStorageService = inject(LocalStorageService);

  readonly unlocksCurrentData = signal(copy(UNLOCK_CURRENT_DATA));

  constructor() {
    this.loadFromLocalStorage();
  }

  updateUnlock(key: UnlockKey, data: Partial<UnlockCurrentData>): void {
    this.unlocksCurrentData.update((oldValue) => {
      return {
        ...oldValue,
        [key]: {
          ...oldValue[key],
          ...data,
        },
      };
    });
  }

  loadFromLocalStorage(): void {
    const value = this.#localStorageService.getItem(LOCAL_STORAGE_KEYS.unlocks);

    if (!value) {
      return;
    }

    try {
      this.unlocksCurrentData.set(JSON.parse(value) as Record<UnlockKey, UnlockCurrentData>);
    } catch {
      console.error('Error while loading unlocks data from local storage');
    }
  }

  saveToLocalStorage(): void {
    this.#localStorageService.setItem(
      LOCAL_STORAGE_KEYS.unlocks,
      JSON.stringify(this.unlocksCurrentData()),
    );
  }

  resetCurrentData(): void {
    this.unlocksCurrentData.set(copy(UNLOCK_CURRENT_DATA));
    this.saveToLocalStorage();
  }
}
