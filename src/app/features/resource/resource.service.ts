import { inject, Injectable, signal } from '@angular/core';
import { ExponentNumber, ExponentNumberSource } from 'exponential-number';

import { mapKeys } from '../../core/utils/record.utils';
import { EventService } from '../event/event.service';
import { RESOURCE_DATA, RESOURCE_KEYS } from './resource.const';
import { ResourceCurrentData, ResourceKey, SavedResources } from './resource.type';

@Injectable({ providedIn: 'root' })
export class ResourceService {
  readonly #eventService = inject(EventService);

  readonly #resourcesCurrentData = signal(
    mapKeys(RESOURCE_KEYS, (key): ResourceCurrentData => ({
      isUnlocked: RESOURCE_DATA[key].isDefaultUnlocked,
      value: ExponentNumber.ZERO,
    })),
  );

  public readonly resourcesCurrentData = this.#resourcesCurrentData.asReadonly();

  public add(key: ResourceKey, amount: ExponentNumberSource): void {
    const gained = ExponentNumber.from(amount);

    this.#update(key, (current) => ({ ...current, value: current.value.plus(gained) }));
    this.#eventService.emit('resourceGained', { resource: key, amount: gained });
  }

  public canAfford(key: ResourceKey, amount: ExponentNumberSource): boolean {
    return this.#resourcesCurrentData()[key].value.isGreaterThanOrEqualValue(amount);
  }

  public spend(key: ResourceKey, amount: ExponentNumberSource): void {
    const spent = ExponentNumber.from(amount);

    this.#update(key, (current) => ({ ...current, value: current.value.minus(spent) }));
    this.#eventService.emit('resourceSpent', { resource: key, amount: spent });
  }

  public snapshot(): SavedResources {
    return this.#resourcesCurrentData();
  }

  public restore(saved: SavedResources): void {
    this.#resourcesCurrentData.update((data) =>
      mapKeys(RESOURCE_KEYS, (key): ResourceCurrentData => {
        const savedResource = saved[key];

        return savedResource
          ? {
              isUnlocked: savedResource.isUnlocked || data[key].isUnlocked,
              value: ExponentNumber.from(savedResource.value),
            }
          : data[key];
      }),
    );
  }

  public unlock(key: ResourceKey): void {
    this.#update(key, (current) => ({ ...current, isUnlocked: true }));
  }

  #update(key: ResourceKey, change: (current: ResourceCurrentData) => ResourceCurrentData): void {
    this.#resourcesCurrentData.update((data) => ({ ...data, [key]: change(data[key]) }));
  }
}
