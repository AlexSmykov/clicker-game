import { Component, computed, inject, signal } from '@angular/core';

import { TAG_DATA, TAG_KEYS } from '../../features/tag/tag.const';
import { TagKey } from '../../features/tag/tag.type';
import { Upgrade } from '../../features/upgrade/components/upgrade/upgrade';
import { UpgradeStateService } from '../../features/upgrade/upgrade-state.service';
import { UPGRADE_DATA, UPGRADE_KEYS } from '../../features/upgrade/upgrade.const';
import { Icon } from '../../shared/components/icon/icon';

@Component({
  imports: [Upgrade, Icon],
  selector: 'app-upgrades',
  styleUrl: './upgrades.scss',
  templateUrl: './upgrades.html',
})
export default class Upgrades {
  readonly #upgradeStateService = inject(UpgradeStateService);

  readonly #selectedTags = signal<ReadonlySet<TagKey>>(new Set());

  readonly #unlockedKeys = computed(() =>
    UPGRADE_KEYS.filter((key) => this.#upgradeStateService.isUnlocked(key)),
  );

  protected readonly tags = computed(() => {
    const unlockedKeys = this.#unlockedKeys();
    const selectedTags = this.#selectedTags();

    return TAG_KEYS.filter((tag) =>
      unlockedKeys.some((key) => UPGRADE_DATA[key].tags.includes(tag)),
    ).map((tag) => ({
      key: tag,
      name: TAG_DATA[tag].name,
      iconPath: TAG_DATA[tag].iconPath,
      isSelected: selectedTags.has(tag),
    }));
  });

  protected readonly visibleKeys = computed(() => {
    const selectedTags = this.#selectedTags();

    return this.#unlockedKeys().filter(
      (key) =>
        selectedTags.size === 0 || UPGRADE_DATA[key].tags.some((tag) => selectedTags.has(tag)),
    );
  });

  protected toggleTag(tag: TagKey): void {
    this.#selectedTags.update((selectedTags) => {
      const nextTags = new Set(selectedTags);

      if (!nextTags.delete(tag)) {
        nextTags.add(tag);
      }

      return nextTags;
    });
  }
}
