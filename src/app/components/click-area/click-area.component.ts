import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-click-area',
  templateUrl: './click-area.component.html',
  styleUrl: './click-area.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ClickAreaComponent {}
