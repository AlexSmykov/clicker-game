import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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

  readonly upgradeKeys = Object.values(UPGRADE_KEYS);
  readonly upgradeData = UPGRADE_DATA;
  readonly upgradeCurrentData = this.#upgradeService.upgradeCurrentDataMap;

  buyUpgrade(key: UpgradeKey): void {
    this.#upgradeService.buyUpgrade(key);
  }
}
