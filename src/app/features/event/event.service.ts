import { Injectable } from '@angular/core';
import { filter, map, Observable, Subject } from 'rxjs';

import { GameEvent, GameEvents, GameEventType } from './event.type';

@Injectable({ providedIn: 'root' })
export class EventService {
  readonly #events$ = new Subject<GameEvent>();

  public emit<Type extends GameEventType>(type: Type, payload: GameEvents[Type]): void {
    this.#events$.next({ type, payload } as GameEvent);
  }

  public on<Type extends GameEventType>(type: Type): Observable<GameEvents[Type]> {
    return this.#events$.pipe(
      filter((event) => event.type === type),
      map((event) => event.payload as GameEvents[Type]),
    );
  }
}
