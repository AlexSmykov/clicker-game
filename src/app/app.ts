import { Component, inject, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MAIN_ROUTE_DATA, MAIN_ROUTE_IDS } from './app.const';
import { ClickArea } from './components/click-area/click-area';
import { Resources } from './components/resources/resources';
import { SaveService } from './features/save/save.service';
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

  protected readonly tabs: TabItem[] = Object.values(MAIN_ROUTE_IDS).map((id) => ({
    id,
    route: ['/', id],
    name: MAIN_ROUTE_DATA[id].name,
    iconPath: MAIN_ROUTE_DATA[id].iconPath,
  }));

  public ngOnDestroy(): void {
    this.#saveService.save();
  }
}
