import { computed, inject, Injectable } from '@angular/core';

import { EventService } from '../event/event.service';
import { ParamService } from '../param/param.service';
import { ResourceService } from '../resource/resource.service';

@Injectable({ providedIn: 'root' })
export class ClickService {
  readonly #eventService = inject(EventService);
  readonly #paramService = inject(ParamService);
  readonly #resourceService = inject(ResourceService);

  public readonly moneyPerClick = computed(() => this.#paramService.value('moneyPerClick'));

  public click(): void {
    const money = this.moneyPerClick();

    this.#resourceService.add('money', money);
    this.#eventService.emit('click', { money });
  }
}
