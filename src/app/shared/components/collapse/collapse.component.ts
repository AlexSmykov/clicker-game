import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-collapse',
  templateUrl: './collapse.component.html',
  styleUrl: './collapse.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SvgIconComponent],
})
export class CollapseComponent {
  readonly label = input<string>('');

  readonly isExpanded = signal(true);
}
