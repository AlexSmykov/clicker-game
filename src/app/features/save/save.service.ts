import { DOCUMENT, inject, Injectable, signal } from '@angular/core';

import { ModifierService } from '../modifier/modifier.service';
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
import { DevSaveState, SaveData } from './save.type';
import { createSaveData, decodeSave, encodeSave } from './save.utils';

@Injectable({ providedIn: 'root' })
export class SaveService {
  readonly #document = inject(DOCUMENT);
  readonly #modifierService = inject(ModifierService);
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

    const data = this.#collect();

    try {
      localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify(data));
      this.#lastSavedAt.set(data.savedAt);
    } catch (error: unknown) {
      console.error('Failed to save the game', error);
    }
  }

  public exportSave(): string {
    return encodeSave(this.#collect());
  }

  public importSave(text: string): boolean {
    const data = decodeSave(text);

    if (data === null) {
      return false;
    }

    this.#replace(data);

    return true;
  }

  public loadDevSave(state: DevSaveState): void {
    this.#replace(createSaveData(state));
  }

  public reset(): void {
    this.#isSavingEnabled = false;
    localStorage.removeItem(SAVE_STORAGE_KEY);
    this.#document.location.reload();
  }

  #collect(): SaveData {
    return {
      version: SAVE_VERSION,
      savedAt: Date.now(),
      resources: this.#resourceService.snapshot(),
      upgrades: this.#upgradeStateService.snapshot(),
      stats: this.#statService.snapshot(),
      tree: this.#treeService.snapshot(),
      modifiers: this.#modifierService.snapshot(),
    };
  }

  #replace(data: Partial<SaveData>): void {
    this.#isSavingEnabled = false;
    localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify(data));
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
      this.#modifierService.restore(data.modifiers ?? {});
      this.#lastSavedAt.set(data.savedAt ?? null);
    } catch (error: unknown) {
      localStorage.setItem(CORRUPTED_SAVE_STORAGE_KEY, raw);
      console.error('Failed to load the save, it was kept as a corrupted copy', error);
    }
  }
}
