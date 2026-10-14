import { Component, computed, inject, signal } from '@angular/core';

import { environment } from '../../../environments/environment';
import { DEV_SAVES } from '../../features/save/dev-save.const';
import { SaveService } from '../../features/save/save.service';
import {
  SETTING_DATA,
  SETTING_GROUP_DATA,
  SETTING_GROUP_KEYS,
  SETTING_KEYS,
} from '../../features/setting/setting.const';
import { SettingService } from '../../features/setting/setting.service';
import { SettingKey } from '../../features/setting/setting.type';
import { Checkbox } from '../../shared/components/checkbox/checkbox';

const DEVELOP_GROUP = 'develop';
const RESET_ACTION = 'reset';
const IMPORT_ACTION = 'import';
const DEV_SAVE_ACTION_PREFIX = 'dev-save-';

@Component({
  imports: [Checkbox],
  selector: 'app-settings',
  styleUrl: './settings.scss',
  templateUrl: './settings.html',
})
export default class Settings {
  readonly #saveService = inject(SaveService);
  readonly #settingService = inject(SettingService);

  readonly #isJustSaved = signal(false);
  readonly #confirmingAction = signal<string | null>(null);

  protected readonly isDevelopment = environment.isDevelopment;

  protected readonly saveText = signal('');
  protected readonly transferMessage = signal('');

  protected readonly saveLabel = computed(() =>
    this.#isJustSaved() ? 'Progress saved!' : 'Save now',
  );

  protected readonly isResetConfirming = computed(() => this.#confirmingAction() === RESET_ACTION);

  protected readonly isImportConfirming = computed(
    () => this.#confirmingAction() === IMPORT_ACTION,
  );

  protected readonly groups = computed(() =>
    SETTING_GROUP_KEYS.filter((group) => environment.isDevelopment || group !== DEVELOP_GROUP).map(
      (group) => ({
        key: group,
        name: SETTING_GROUP_DATA[group].name,
        settings: SETTING_KEYS.filter((key) => SETTING_DATA[key].group === group).map((key) => ({
          key,
          name: SETTING_DATA[key].name,
          isOn: this.#settingService.isOn(key),
        })),
      }),
    ),
  );

  protected readonly devSaves = computed(() =>
    DEV_SAVES.map((save, index) => ({
      index,
      name: save.name,
      description: save.description,
      isConfirming: this.#confirmingAction() === `${DEV_SAVE_ACTION_PREFIX}${index}`,
    })),
  );

  protected save(): void {
    this.#saveService.save();
    this.#isJustSaved.set(true);
  }

  protected clearSaved(): void {
    this.#isJustSaved.set(false);
  }

  protected reset(): void {
    if (this.#confirm(RESET_ACTION)) {
      this.#saveService.reset();
    }
  }

  protected cancelConfirmation(): void {
    this.#confirmingAction.set(null);
  }

  protected resetSettings(): void {
    this.#settingService.reset();
  }

  protected setSetting(key: SettingKey, isOn: boolean): void {
    this.#settingService.set(key, isOn);
  }

  protected exportSave(): void {
    this.saveText.set(this.#saveService.exportSave());
    this.transferMessage.set('The save string is in the field below.');
  }

  protected async copySave(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.saveText());
      this.transferMessage.set('Copied to the clipboard.');
    } catch {
      this.transferMessage.set('Could not copy, select the text and copy it manually.');
    }
  }

  protected onSaveTextInput(event: Event): void {
    if (event.target instanceof HTMLTextAreaElement) {
      this.saveText.set(event.target.value);
    }
  }

  protected importSave(): void {
    if (this.saveText().trim() === '') {
      this.transferMessage.set('Paste a save string first.');

      return;
    }

    if (this.#confirm(IMPORT_ACTION) && !this.#saveService.importSave(this.saveText())) {
      this.transferMessage.set('This is not a valid save string.');
    }
  }

  protected loadDevSave(index: number): void {
    const devSave = DEV_SAVES[index];

    if (devSave && this.#confirm(`${DEV_SAVE_ACTION_PREFIX}${index}`)) {
      this.#saveService.loadDevSave(devSave.state);
    }
  }

  #confirm(action: string): boolean {
    if (this.#confirmingAction() === action) {
      this.#confirmingAction.set(null);

      return true;
    }

    this.#confirmingAction.set(action);

    return false;
  }
}
