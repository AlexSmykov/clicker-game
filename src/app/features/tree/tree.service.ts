import { computed, inject, Injectable, Signal, signal } from '@angular/core';

import { mapKeys } from '../../core/utils/record.utils';
import { EventService } from '../event/event.service';
import { EffectProvider, EffectSource } from '../param/param.type';
import { ResourceService } from '../resource/resource.service';
import { SettingService } from '../setting/setting.service';
import { TREE_NODE_DATA, TREE_NODE_KEYS } from './tree.const';
import { SavedTree, TreeNodeData, TreeNodeKey, TreeNodeStatus } from './tree.type';

@Injectable({ providedIn: 'root' })
export class TreeService implements EffectProvider {
  readonly #eventService = inject(EventService);
  readonly #resourceService = inject(ResourceService);
  readonly #settingService = inject(SettingService);

  readonly #data: Record<TreeNodeKey, TreeNodeData> = TREE_NODE_DATA;

  readonly #bought = mapKeys(TREE_NODE_KEYS, () => signal(false));

  readonly #connected: Record<TreeNodeKey, Signal<boolean>> = mapKeys(TREE_NODE_KEYS, (key) =>
    computed(() => this.#bought[key]() && this.#areRequirementsConnected(key)),
  );

  readonly #statuses = mapKeys(TREE_NODE_KEYS, (key) =>
    computed((): TreeNodeStatus => {
      if (this.#connected[key]()) {
        return 'connected';
      }

      if (this.#bought[key]()) {
        return 'disconnected';
      }

      return this.#areRequirementsConnected(key) || this.#settingService.isOn('showAllTreeNodes')
        ? 'available'
        : 'locked';
    }),
  );

  readonly #visibility = mapKeys(TREE_NODE_KEYS, (key) =>
    computed(() => {
      const { requires } = this.#data[key];

      return (
        this.#settingService.isOn('showAllTreeNodes') ||
        this.#bought[key]() ||
        requires.length === 0 ||
        requires.some((required) => this.#connected[required]())
      );
    }),
  );

  readonly #affordability = mapKeys(TREE_NODE_KEYS, (key) =>
    computed(
      () =>
        this.#statuses[key]() === 'available' &&
        (this.#settingService.isOn('freeTreeNodes') ||
          this.#data[key].costs.every((cost) =>
            this.#resourceService.canAfford(cost.resource, cost.amount),
          )),
    ),
  );

  public readonly sources = mapKeys(TREE_NODE_KEYS, (key): EffectSource => ({
    effects: this.#data[key].effects,
    level: computed(() => (this.#bought[key]() ? 1 : 0)),
  }));

  public readonly effectSources = Object.values(this.sources);

  public isBought(key: TreeNodeKey): boolean {
    return this.#bought[key]();
  }

  public status(key: TreeNodeKey): TreeNodeStatus {
    return this.#statuses[key]();
  }

  public isVisible(key: TreeNodeKey): boolean {
    return this.#visibility[key]();
  }

  public isAffordable(key: TreeNodeKey): boolean {
    return this.#affordability[key]();
  }

  public buy(key: TreeNodeKey): void {
    if (!this.isAffordable(key)) {
      return;
    }

    if (!this.#settingService.isOn('freeTreeNodes')) {
      for (const cost of this.#data[key].costs) {
        this.#resourceService.spend(cost.resource, cost.amount);
      }
    }

    this.#bought[key].set(true);
    this.#eventService.emit('treeNodeBought', { node: key });
  }

  public resetOnPrestige(): void {
    for (const key of TREE_NODE_KEYS) {
      if (this.#data[key].isResetOnPrestige) {
        this.#bought[key].set(false);
      }
    }
  }

  public snapshot(): SavedTree {
    return mapKeys(TREE_NODE_KEYS, (key) => this.#bought[key]());
  }

  public restore(saved: SavedTree): void {
    for (const key of TREE_NODE_KEYS) {
      this.#bought[key].set(saved[key] === true);
    }
  }

  #areRequirementsConnected(key: TreeNodeKey): boolean {
    return this.#data[key].requires.every((required) => this.#connected[required]());
  }
}
