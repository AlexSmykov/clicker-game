import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClickAreaComponent } from 'src/app/components/click-area/click-area.component';
import { ResourcesComponent } from 'src/app/components/resources/resources.component';
import { ParamsComponent } from 'src/app/components/params/params.component';
import { MAIN_ROUTE_DATA, MAIN_ROUTE_IDS } from 'src/app/app.const';
import { TabItem } from 'src/app/shared/components/tabs/tabs.type';
import { TabsComponent } from 'src/app/shared/components/tabs/tabs.component';
import { getMainRouteLink } from 'src/app/app.links';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, ClickAreaComponent, ResourcesComponent, ParamsComponent, TabsComponent],
})
export default class LayoutComponent {
  readonly mainRouteTabs = Object.values(MAIN_ROUTE_IDS).map((id): TabItem => {
    return {
      id: id,
      route: getMainRouteLink(id),
      name: MAIN_ROUTE_DATA[id].name,
      iconPath: MAIN_ROUTE_DATA[id].iconPath,
    };
  });
}
