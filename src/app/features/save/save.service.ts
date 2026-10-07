import { DOCUMENT, inject, Injectable, signal } from '@angular/core';

import { ResourceService } from '../resource/resource.service';
import { SettingService } from '../setting/setting.service';
import { StatService } from '../stat/stat.service';
import { TreeService } from '../tree/tree.service';
import { UpgradeStateService } from '../upgrade/upgrade-state.service';
import {
  AUTOSAVE_INTERVAL_MS,
  CORRUPTED_SAVE_STORAGE_KEY,
  SAVE_STORAGE_KEY,
  SAVE_VERSION,
} from './save.const';
import { SaveData } from './save.type';

@Injectable({ providedIn: 'root' })
export class SaveService {
  readonly #document = inject(DOCUMENT);
  readonly #resourceService = inject(ResourceService);
  readonly #settingService = inject(SettingService);
  readonly #statService = inject(StatService);
  readonly #treeService = inject(TreeService);
  readonly #upgradeStateService = inject(UpgradeStateService);

  readonly #lastSavedAt = signal<number | null>(null);

  #isSavingEnabled = true;

  public readonly lastSavedAt = this.#lastSavedAt.asReadonly();

  public start(): void {
    this.#load();

    setInterval(() => {
      this.autosave();
    }, AUTOSAVE_INTERVAL_MS);
  }

  public autosave(): void {
    if (this.#settingService.isOn('autosave')) {
      this.save();
    }
  }

  public save(): void {
    if (!this.#isSavingEnabled) {
      return;
    }

    const data: SaveData = {
      version: SAVE_VERSION,
      savedAt: Date.now(),
      resources: this.#resourceService.snapshot(),
      upgrades: this.#upgradeStateService.snapshot(),
      stats: this.#statService.snapshot(),
      tree: this.#treeService.snapshot(),
    };

    try {
      localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify(data));
      this.#lastSavedAt.set(data.savedAt);
    } catch (error: unknown) {
      console.error('Failed to save the game', error);
    }
  }

  public reset(): void {
    this.#isSavingEnabled = false;
    localStorage.removeItem(SAVE_STORAGE_KEY);
    this.#document.location.reload();
  }

  #load(): void {
    const raw = localStorage.getItem(SAVE_STORAGE_KEY);

    if (raw === null) {
      return;
    }

    try {
      const data = JSON.parse(raw) as Partial<SaveData>;

      this.#resourceService.restore(data.resources ?? {});
      this.#upgradeStateService.restore(data.upgrades ?? {});
      this.#statService.restore(data.stats ?? {});
      this.#treeService.restore(data.tree ?? {});
      this.#lastSavedAt.set(data.savedAt ?? null);
    } catch (error: unknown) {
      localStorage.setItem(CORRUPTED_SAVE_STORAGE_KEY, raw);
      console.error('Failed to load the save, it was kept as a corrupted copy', error);
    }
  }
}
