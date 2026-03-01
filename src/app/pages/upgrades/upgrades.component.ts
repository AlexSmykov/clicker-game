import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { UpgradeService } from 'src/app/features/upgrade/upgrade.service';
import { UpgradeKey } from 'src/app/features/upgrade/upgrade.type';
import { UPGRADE_DATA, UPGRADE_KEYS } from 'src/app/features/upgrade/upgrade.const';
import { UpgradeComponent } from 'src/app/features/upgrade/components/upgrade/upgrade.component';

@Component({
  selector: 'app-upgrades',
  templateUrl: './upgrades.component.html',
  styleUrl: './upgrades.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UpgradeComponent],
})
export default class UpgradesComponent {
  readonly #upgradeService = inject(UpgradeService);

  readonly upgradeList = computed(() => {
    const upgradeCurrentDataMap = this.#upgradeService.upgradeCurrentDataMap();

    return Object.values(UPGRADE_KEYS)
      .filter((key) => upgradeCurrentDataMap[key].isUnlocked)
      .map((key) => {
        return {
          key: key,
          data: UPGRADE_DATA[key],
          currentData: upgradeCurrentDataMap[key],
        };
      });
  });

  buyUpgrade(key: UpgradeKey): void {
    this.#upgradeService.buyUpgrade(key);
  }
}
