import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClickAreaComponent } from 'src/app/components/click-area/click-area.component';
import { ResourcesComponent } from 'src/app/components/resources/resources.component';
import { ParamsComponent } from 'src/app/components/params/params.component';
import { MAIN_ROUTE_DATA, MAIN_ROUTE_IDS } from 'src/app/app.const';
import { TabItem } from 'src/app/shared/components/tabs/tabs.type';
import { TabsComponent } from 'src/app/shared/components/tabs/tabs.component';
import { getMainRouteLink } from 'src/app/app.links';
import { UnlockService } from 'src/app/features/unlock/unlock.service';
import { UNLOCK_KEYS } from 'src/app/features/unlock/unlock.const';
import { SettingService } from 'src/app/features/setting/setting.service';
import { SETTING_KEYS } from 'src/app/features/setting/setting.const';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, ClickAreaComponent, ResourcesComponent, ParamsComponent, TabsComponent],
})
export default class LayoutComponent {
  readonly #settingsService = inject(SettingService);
  readonly #unlockService = inject(UnlockService);

  readonly isShowParameters = computed(
    () => this.#settingsService.settingCurrentData()[SETTING_KEYS.showParametersWidget].isOn,
  );

  readonly isContentAreaScrollInside = computed(
    () => this.#settingsService.settingCurrentData()[SETTING_KEYS.scrollInsideContentArea].isOn,
  );

  readonly mainRouteTabs = computed(() => {
    const unlocksCurrentData = this.#unlockService.unlocksCurrentData();

    return Object.values(MAIN_ROUTE_IDS)
      .filter((routeId) => {
        switch (routeId) {
          case MAIN_ROUTE_IDS.prestige:
            return unlocksCurrentData[UNLOCK_KEYS.prestige].isUnlocked;

          case MAIN_ROUTE_IDS.statistic:
            return unlocksCurrentData[UNLOCK_KEYS.statistic].isUnlocked;

          default:
            return true;
        }
      })
      .map((id): TabItem => {
        return {
          id: id,
          route: getMainRouteLink(id),
          name: MAIN_ROUTE_DATA[id].name,
          iconPath: MAIN_ROUTE_DATA[id].iconPath,
        };
      });
  });
}
