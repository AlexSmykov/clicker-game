import { Injectable } from '@angular/core';
import { LocalStorageKey } from 'src/app/core/services/local-storage/local-storage.type';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  readonly #storage: Storage = localStorage;

  clear(): void {
    this.#storage.clear();
  }

  getItem(key: LocalStorageKey): string | null {
    return this.#storage.getItem(key);
  }

  checkItem(key: LocalStorageKey): boolean {
    return !!this.getItem(key);
  }

  removeItem(key: LocalStorageKey): void {
    this.#storage.removeItem(key);
  }

  setItem(key: LocalStorageKey, value: string): void {
    this.#storage.setItem(key, value);
  }
}
