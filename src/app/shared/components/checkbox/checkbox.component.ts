import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
  host: {
    class: 'clickable',
    '(click)': 'onValueChange(!value())',
  },
})
export class CheckboxComponent implements ControlValueAccessor {
  readonly label = input<string>('');

  readonly value = signal(false);

  readonly isDisabled = signal(false);

  onChangeFn?: (value: boolean | null) => void;
  onTouchFn?: () => void;

  onValueChange(value: boolean): void {
    this.value.set(value);
    this.onChangeFn?.(value);
  }

  writeValue(value: boolean | null): void {
    this.value.set(value ?? false);
  }

  registerOnChange(fn: (value: boolean | null) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}
