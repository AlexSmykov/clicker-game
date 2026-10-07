import { Component, computed, inject, signal } from '@angular/core';
import { ExponentNumber } from 'exponential-number';

import { mapKeys } from '../../core/utils/record.utils';
import { PARAM_DATA } from '../../features/param/param.const';
import { ParamService } from '../../features/param/param.service';
import { formatEffect } from '../../features/param/param.utils';
import { Resource } from '../../features/resource/components/resource/resource';
import { RESOURCE_DATA, RESOURCE_KEYS } from '../../features/resource/resource.const';
import { SettingService } from '../../features/setting/setting.service';
import { TreeNode } from '../../features/tree/components/tree-node/tree-node';
import { TREE_NODE_DATA, TREE_NODE_KEYS } from '../../features/tree/tree.const';
import { TreeService } from '../../features/tree/tree.service';
import {
  TreeNodeData,
  TreeNodeKey,
  TreeNodePosition,
  TreeNodeStatus,
} from '../../features/tree/tree.type';
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

interface LineGeometry {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  arrow: string;
}

const CELL_SIZE_PX = 96;
const NODE_HALF_SIZE_PX = 28;
const ARROW_GAP_PX = 3;
const ARROW_LENGTH_PX = 10;
const ARROW_HALF_WIDTH_PX = 5;

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
          ...this.#lineGeometry(required, key),
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
      effects: data.effects.map((effect, index) => ({
        id: index,
        name: PARAM_DATA[effect.param].name,
        value: formatEffect(
          effect,
          this.#paramService.effectValue(effect),
          PARAM_DATA[effect.param].format,
        ),
      })),
    };
  });

  #lineGeometry(from: TreeNodeKey, to: TreeNodeKey): LineGeometry {
    const start = this.#center(from);
    const end = this.#center(to);
    const length = Math.hypot(end.x - start.x, end.y - start.y);
    const direction = { x: (end.x - start.x) / length, y: (end.y - start.y) / length };
    const normal = { x: -direction.y, y: direction.x };
    const tipDistance = length - this.#edgeDistance(to, direction) - ARROW_GAP_PX;
    const baseDistance = tipDistance - ARROW_LENGTH_PX;
    const tip = this.#along(start, direction, tipDistance);
    const base = this.#along(start, direction, baseDistance);

    return {
      x1: start.x,
      y1: start.y,
      x2: base.x,
      y2: base.y,
      arrow: [
        tip,
        this.#along(base, normal, ARROW_HALF_WIDTH_PX),
        this.#along(base, normal, -ARROW_HALF_WIDTH_PX),
      ]
        .map((point) => `${point.x},${point.y}`)
        .join(' '),
    };
  }

  #center(key: TreeNodeKey): TreeNodePosition {
    return {
      x: this.#data[key].position.x * CELL_SIZE_PX,
      y: -this.#data[key].position.y * CELL_SIZE_PX,
    };
  }

  #edgeDistance(key: TreeNodeKey, direction: TreeNodePosition): number {
    return this.#data[key].isResetOnPrestige
      ? NODE_HALF_SIZE_PX / Math.max(Math.abs(direction.x), Math.abs(direction.y))
      : NODE_HALF_SIZE_PX;
  }

  #along(point: TreeNodePosition, direction: TreeNodePosition, distance: number): TreeNodePosition {
    return { x: point.x + direction.x * distance, y: point.y + direction.y * distance };
  }

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
