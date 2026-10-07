import { Component, computed, inject, signal } from '@angular/core';
import { ExponentNumber } from 'exponential-number';

import { mapKeys } from '../../core/utils/record.utils';
import { PARAM_DATA } from '../../features/param/param.const';
import { ParamService } from '../../features/param/param.service';
import { formatParam } from '../../features/param/param.utils';
import { Resource } from '../../features/resource/components/resource/resource';
import { RESOURCE_DATA, RESOURCE_KEYS } from '../../features/resource/resource.const';
import { SettingService } from '../../features/setting/setting.service';
import { TreeNode } from '../../features/tree/components/tree-node/tree-node';
import { TREE_NODE_DATA, TREE_NODE_KEYS } from '../../features/tree/tree.const';
import { TreeService } from '../../features/tree/tree.service';
import { TreeNodeData, TreeNodeKey, TreeNodeStatus } from '../../features/tree/tree.type';
import { UnlockCondition } from '../../features/unlock/unlock.type';
import { UPGRADE_DATA, UPGRADE_KEYS } from '../../features/upgrade/upgrade.const';
import { UpgradeKey } from '../../features/upgrade/upgrade.type';
import { PanZoom } from '../../shared/components/pan-zoom/pan-zoom';

interface UnlockTarget {
  name: string;
  unlockConditions: UnlockCondition<UpgradeKey>[];
}

interface UnlockView {
  id: string;
  kind: string;
  name: string;
}

const CELL_SIZE_PX = 96;

const STATUS_LABELS: Record<TreeNodeStatus, string> = {
  available: 'Available',
  connected: 'Bought',
  disconnected: 'Kept after prestige, not connected to the start yet',
  locked: 'Requires all previous nodes',
};

@Component({
  imports: [PanZoom, TreeNode, Resource],
  selector: 'app-upgrade-tree',
  styleUrl: './upgrade-tree.scss',
  templateUrl: './upgrade-tree.html',
})
export default class UpgradeTree {
  readonly #paramService = inject(ParamService);
  readonly #settingService = inject(SettingService);
  readonly #treeService = inject(TreeService);

  protected readonly isIconsHidden = computed(() => this.#settingService.isOn('hideTreeIcons'));
  protected readonly isPathsHidden = computed(() => this.#settingService.isOn('hideTreePaths'));

  readonly #data: Record<TreeNodeKey, TreeNodeData> = TREE_NODE_DATA;

  readonly #unlocks = mapKeys(TREE_NODE_KEYS, (key) => [
    ...this.#unlockedBy(key, RESOURCE_KEYS, RESOURCE_DATA, 'Resource'),
    ...this.#unlockedBy(key, UPGRADE_KEYS, UPGRADE_DATA, 'Upgrade'),
  ]);

  readonly #selectedKey = signal<TreeNodeKey | null>(null);

  readonly #visibleKeys = computed(() =>
    TREE_NODE_KEYS.filter((key) => this.#treeService.isVisible(key)),
  );

  protected readonly nodes = computed(() => {
    const selectedKey = this.#selectedKey();

    return this.#visibleKeys().map((key) => ({
      key,
      name: this.#data[key].name,
      iconPath: this.#data[key].iconPath,
      left: this.#data[key].position.x * CELL_SIZE_PX,
      top: -this.#data[key].position.y * CELL_SIZE_PX,
      status: this.#treeService.status(key),
      isPermanent: !this.#data[key].isResetOnPrestige,
      isAffordable: this.#treeService.isAffordable(key),
      isSelected: key === selectedKey,
    }));
  });

  protected readonly lines = computed(() => {
    const visibleKeys = new Set(this.#visibleKeys());

    return [...visibleKeys].flatMap((key) =>
      this.#data[key].requires
        .filter((required) => visibleKeys.has(required))
        .map((required) => ({
          id: `${required}-${key}`,
          x1: this.#data[required].position.x * CELL_SIZE_PX,
          y1: -this.#data[required].position.y * CELL_SIZE_PX,
          x2: this.#data[key].position.x * CELL_SIZE_PX,
          y2: -this.#data[key].position.y * CELL_SIZE_PX,
          isActive:
            this.#treeService.status(key) === 'connected' &&
            this.#treeService.status(required) === 'connected',
        })),
    );
  });

  protected readonly details = computed(() => {
    const key = this.#selectedKey();

    if (key === null || !this.#treeService.isVisible(key)) {
      return null;
    }

    const data = this.#data[key];
    const status = this.#treeService.status(key);
    const isBought = this.#treeService.isBought(key);
    const source = this.#treeService.sources[key];

    return {
      name: data.name,
      description: data.description,
      statusLabel: STATUS_LABELS[status],
      isPermanent: !data.isResetOnPrestige,
      isBought,
      isAffordable: this.#treeService.isAffordable(key),
      costs: data.costs.map((cost) => ({
        resource: cost.resource,
        value: ExponentNumber.from(cost.amount),
      })),
      unlocks: this.#unlocks[key],
      effects: this.#paramService.shownParams(source).map((param) => ({
        param,
        name: PARAM_DATA[param].name,
        currentValue: formatParam(this.#paramService.value(param), PARAM_DATA[param].format),
        nextValue: isBought
          ? null
          : formatParam(this.#paramService.preview(param, source), PARAM_DATA[param].format),
      })),
    };
  });

  protected select(key: TreeNodeKey): void {
    this.#selectedKey.update((selectedKey) => (selectedKey === key ? null : key));
  }

  protected close(): void {
    this.#selectedKey.set(null);
  }

  #unlockedBy<Key extends string>(
    node: TreeNodeKey,
    keys: readonly Key[],
    data: Record<Key, UnlockTarget>,
    kind: string,
  ): UnlockView[] {
    return keys
      .filter((key) =>
        data[key].unlockConditions.some(
          (condition) => condition.type === 'treeNode' && condition.node === node,
        ),
      )
      .map((key) => ({ id: `${kind}-${key}`, kind, name: data[key].name }));
  }

  protected buy(): void {
    const key = this.#selectedKey();

    if (key !== null) {
      this.#treeService.buy(key);
    }
  }
}
