import { Injectable, signal } from '@angular/core';
import { UNLOCK_CURRENT_DATA } from 'src/app/features/unlock/unlock.const';
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
}
