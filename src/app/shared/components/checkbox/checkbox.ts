import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  styleUrl: './checkbox.scss',
  templateUrl: './checkbox.html',
})
export class Checkbox {
  public readonly label = input.required<string>();
  public readonly isChecked = input.required<boolean>();

  public readonly changed = output<boolean>();

  protected onChange(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.changed.emit(event.target.checked);
    }
  }
}
