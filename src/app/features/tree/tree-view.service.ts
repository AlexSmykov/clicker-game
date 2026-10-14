import { Injectable, signal } from '@angular/core';

import { PanZoomView } from '../../shared/components/pan-zoom/pan-zoom.type';

@Injectable({ providedIn: 'root' })
export class TreeViewService {
  public readonly view = signal<PanZoomView | null>(null);
}
