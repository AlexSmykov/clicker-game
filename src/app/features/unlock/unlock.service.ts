import { Injectable, signal } from '@angular/core';
import { UNLOCK_CURRENT_DATA, UNLOCK_KEYS } from 'src/app/features/unlock/unlock.const';
import { UnlockCurrentData, UnlockKey } from './unlock.type';

@Injectable()
export class UnlockService {
  readonly unlocksCurrentData = signal(UNLOCK_CURRENT_DATA);

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

  resetOnPrestige(): void {
    const unlocksCurrentData = this.unlocksCurrentData();

    this.unlocksCurrentData.set(
      Object.fromEntries(
        Object.values(UNLOCK_KEYS).map((key): [UnlockKey, UnlockCurrentData] => {
          const currentResourceData = unlocksCurrentData[key];

          return [
            key,
            {
              isUnlocked: currentResourceData.isResetOnPrestige
                ? false
                : currentResourceData.isUnlocked,
              isResetOnPrestige: currentResourceData.isResetOnPrestige,
            },
          ];
        }),
      ) as Record<UnlockKey, UnlockCurrentData>,
    );
  }
}
