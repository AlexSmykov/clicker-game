import { Component, computed, inject, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MAIN_ROUTE_DATA, MAIN_ROUTE_IDS } from './app.const';
import { ClickArea } from './components/click-area/click-area';
import { Resources } from './components/resources/resources';
import { SaveService } from './features/save/save.service';
import { UnlockService } from './features/unlock/unlock.service';
import { Tabs } from './shared/components/tabs/tabs';
import { TabItem } from './shared/components/tabs/tabs.type';

@Component({
  host: {
    '(window:beforeunload)': 'ngOnDestroy()',
  },
  imports: [RouterOutlet, Resources, ClickArea, Tabs],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App implements OnDestroy {
  readonly #saveService = inject(SaveService);
  readonly #unlockService = inject(UnlockService);

  protected readonly tabs = computed(() =>
    Object.values(MAIN_ROUTE_IDS)
      .filter((id) => this.#unlockService.areConditionsMet(MAIN_ROUTE_DATA[id].unlockConditions))
      .map((id): TabItem => ({
        id,
        route: ['/', id],
        name: MAIN_ROUTE_DATA[id].name,
        iconPath: MAIN_ROUTE_DATA[id].iconPath,
      })),
  );

  public ngOnDestroy(): void {
    this.#saveService.autosave();
  }
}
