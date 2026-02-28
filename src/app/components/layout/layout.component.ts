import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClickAreaComponent } from 'src/app/components/click-area/click-area.component';
import { ResourcesComponent } from 'src/app/components/resources/resources.component';
import { ParamsComponent } from 'src/app/components/params/params.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, ClickAreaComponent, ResourcesComponent, ParamsComponent],
})
export default class LayoutComponent {}
