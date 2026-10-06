import { Component, computed, input } from '@angular/core';

@Component({
  host: {
    '[style.mask-image]': 'maskImage()',
    'aria-hidden': 'true',
  },
  selector: 'app-icon',
  styleUrl: './icon.scss',
  templateUrl: './icon.html',
})
export class Icon {
  public readonly path = input.required<string>();

  protected readonly maskImage = computed(() => `url("${this.path()}")`);
}
