import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResourceService } from 'src/app/features/resource/resource.service';
import { UpgradeService } from 'src/app/features/upgrade/upgrade.service';
import { ParamService } from 'src/app/features/param/param.service';
import { UnlockService } from 'src/app/features/unlock/unlock.service';
import { SettingService } from 'src/app/features/setting/setting.service';
import { SETTING_KEYS } from 'src/app/features/setting/setting.const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
  providers: [ResourceService, ParamService, UpgradeService, UnlockService, SettingService],
  host: {
    '(window:beforeunload)': 'ngOnDestroy()',
  },
})
export class AppComponent implements OnDestroy {
  readonly #resourceService = inject(ResourceService);
  readonly #paramService = inject(ParamService);
  readonly #upgradeService = inject(UpgradeService);
  readonly #unlockService = inject(UnlockService);
  readonly #settingService = inject(SettingService);

  ngOnDestroy(): void {
    if (this.#settingService.settingCurrentData()[SETTING_KEYS.saveOnPageReload].isOn) {
      this.#resourceService.saveToLocalStorage();
      this.#paramService.saveToLocalStorage();
      this.#upgradeService.saveToLocalStorage();
      this.#unlockService.saveToLocalStorage();
    }

    this.#settingService.saveToLocalStorage();
  }
}
