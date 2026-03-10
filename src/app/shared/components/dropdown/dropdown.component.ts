import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SvgIconComponent],
})
export class DropdownComponent {
  readonly label = input<string>('');

  readonly isExpanded = signal(true);
}
