import { Component, inject } from '@angular/core';

import { ClickService } from '../../features/click/click.service';
import { Resource } from '../../features/resource/components/resource/resource';

@Component({
  imports: [Resource],
  selector: 'app-click-area',
  styleUrl: './click-area.scss',
  templateUrl: './click-area.html',
})
export class ClickArea {
  readonly #clickService = inject(ClickService);

  protected readonly moneyPerClick = this.#clickService.moneyPerClick;

  protected click(): void {
    this.#clickService.click();
  }
}
