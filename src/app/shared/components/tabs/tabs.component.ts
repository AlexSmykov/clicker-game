import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TabItem } from './tabs.type';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SvgIconComponent, RouterLinkActive, RouterLink],
})
export class TabsComponent {
  readonly items = input.required<TabItem[]>();
}
