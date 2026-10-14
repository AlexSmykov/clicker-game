import { ExponentNumber } from 'exponential-number';

import { SAVE_VERSION } from './save.const';
import { DevSaveState, SaveData } from './save.type';

export function encodeSave(data: SaveData): string {
  return btoa(JSON.stringify(data));
}

export function decodeSave(text: string): Partial<SaveData> | null {
  try {
    const data: unknown = JSON.parse(atob(text.trim()));

    return isSaveData(data) ? data : null;
  } catch {
    return null;
  }
}

export function createSaveData(state: DevSaveState): SaveData {
  const modifiers = state.modifiers ?? {};

  return {
    version: SAVE_VERSION,
    savedAt: Date.now(),
    resources: Object.fromEntries(
      Object.entries(state.resources ?? {}).map(([key, value]) => [
        key,
        { isUnlocked: true, value: ExponentNumber.from(value) },
      ]),
    ),
    upgrades: Object.fromEntries(
      Object.entries(state.upgrades ?? {}).map(([key, level]) => [key, { level }]),
    ),
    stats: {
      startedAt: Date.now(),
      counters: { prestiges: ExponentNumber.from(state.prestiges ?? 0) },
      resourcesEarned: {},
      resourcesSpent: {},
    },
    tree: Object.fromEntries((state.tree ?? []).map((key) => [key, true])),
    modifiers: { selected: modifiers, active: modifiers },
  };
}

function isSaveData(data: unknown): data is Partial<SaveData> {
  return (
    typeof data === 'object' &&
    data !== null &&
    'version' in data &&
    typeof data.version === 'number'
  );
}
