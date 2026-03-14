import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-danger-button',
  templateUrl: './danger-button.component.html',
  styleUrl: './danger-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class DangerButtonComponent {
  readonly label = input<string>('');

  readonly action = output();

  readonly isClicked = signal(false);

  onClick(): void {
    if (!this.isClicked()) {
      this.isClicked.set(true);

      return;
    }

    this.action.emit();

    this.isClicked.set(false);
  }

  onMouseLeave(): void {
    this.isClicked.set(false);
  }
}
