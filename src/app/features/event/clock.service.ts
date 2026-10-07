import { DOCUMENT, inject, Injectable } from '@angular/core';

import { EventService } from './event.service';

const TICK_INTERVAL_MS = 1000;
const MAX_TICK_SECONDS = 60;

@Injectable({ providedIn: 'root' })
export class ClockService {
  readonly #document = inject(DOCUMENT);
  readonly #eventService = inject(EventService);

  #lastTickAt = Date.now();

  public start(): void {
    this.#lastTickAt = Date.now();

    setInterval(() => {
      const now = Date.now();
      const seconds = Math.min((now - this.#lastTickAt) / TICK_INTERVAL_MS, MAX_TICK_SECONDS);

      this.#lastTickAt = now;
      this.#eventService.emit('tick', {
        seconds,
        isVisible: this.#document.visibilityState === 'visible',
      });
    }, TICK_INTERVAL_MS);
  }
}
