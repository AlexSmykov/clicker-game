import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { Icon } from '../icon/icon';
import { TabItem } from './tabs.type';

@Component({
  host: {
    role: 'navigation',
  },
  imports: [RouterLink, RouterLinkActive, Icon],
  selector: 'app-tabs',
  styleUrl: './tabs.scss',
  templateUrl: './tabs.html',
})
export class Tabs {
  public readonly items = input.required<TabItem[]>();
}
