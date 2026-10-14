import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  inject,
  model,
  signal,
} from '@angular/core';

import { PanZoomView, PanZoomPoint as Point } from './pan-zoom.type';

const ORIGIN: Point = { x: 0, y: 0 };
const DEFAULT_SCALE = 1;
const MIN_SCALE = 0.4;
const MAX_SCALE = 2.5;
const DRAG_THRESHOLD_PX = 5;
const WHEEL_ZOOM_SPEED = 0.0015;
const PRIMARY_BUTTON = 0;
const PINCH_POINTER_COUNT = 2;

@Component({
  host: {
    '(pointercancel)': 'onPointerUp($event)',
    '(pointerdown)': 'onPointerDown($event)',
    '(pointermove)': 'onPointerMove($event)',
    '(pointerup)': 'onPointerUp($event)',
    '(wheel)': 'onWheel($event)',
    '[class.dragging]': 'isDragging()',
  },
  selector: 'app-pan-zoom',
  styleUrl: './pan-zoom.scss',
  templateUrl: './pan-zoom.html',
})
export class PanZoom {
  readonly #element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly #pointers = new Map<number, Point>();
  readonly #offset = computed(() => this.view()?.offset ?? ORIGIN);
  readonly #scale = computed(() => this.view()?.scale ?? DEFAULT_SCALE);

  #travelledDistance = 0;
  #isClickSuppressed = false;

  public readonly view = model<PanZoomView | null>(null);

  protected readonly isDragging = signal(false);

  protected readonly transform = computed(() => {
    const { x, y } = this.#offset();

    return `translate(${x}px, ${y}px) scale(${this.#scale()})`;
  });

  constructor() {
    afterNextRender(() => {
      if (this.view() === null) {
        this.reset();
      }
    });

    this.#element.addEventListener(
      'click',
      (event) => {
        if (this.#isClickSuppressed) {
          this.#isClickSuppressed = false;
          event.stopPropagation();
          event.preventDefault();
        }
      },
      { capture: true },
    );
  }

  protected reset(): void {
    this.view.set({ offset: this.#center(), scale: DEFAULT_SCALE });
  }

  protected zoomBy(factor: number): void {
    this.#zoomAt(this.#center(), factor);
  }

  protected onPointerDown(event: PointerEvent): void {
    if (event.pointerType === 'mouse' && event.button !== PRIMARY_BUTTON) {
      return;
    }

    this.#pointers.set(event.pointerId, this.#toLocalPoint(event));

    if (this.#pointers.size === 1) {
      this.#travelledDistance = 0;
      this.#isClickSuppressed = false;
    }
  }

  protected onPointerMove(event: PointerEvent): void {
    const previous = this.#pointers.get(event.pointerId);

    if (!previous) {
      return;
    }

    const current = this.#toLocalPoint(event);

    if (this.#pointers.size === PINCH_POINTER_COUNT) {
      this.#pinch(event.pointerId, current);

      return;
    }

    this.#pointers.set(event.pointerId, current);
    this.#travelledDistance += Math.abs(current.x - previous.x) + Math.abs(current.y - previous.y);

    if (!this.isDragging() && this.#travelledDistance > DRAG_THRESHOLD_PX) {
      this.isDragging.set(true);
      this.#element.setPointerCapture(event.pointerId);
    }

    if (this.isDragging()) {
      this.#moveBy(current.x - previous.x, current.y - previous.y);
    }
  }

  protected onPointerUp(event: PointerEvent): void {
    if (!this.#pointers.delete(event.pointerId) || this.#pointers.size > 0) {
      return;
    }

    this.#isClickSuppressed = this.isDragging();
    this.isDragging.set(false);
  }

  protected onWheel(event: WheelEvent): void {
    event.preventDefault();
    this.#zoomAt(this.#toLocalPoint(event), Math.exp(-event.deltaY * WHEEL_ZOOM_SPEED));
  }

  #pinch(pointerId: number, current: Point): void {
    const before = [...this.#pointers.values()];

    this.#pointers.set(pointerId, current);

    const after = [...this.#pointers.values()];
    const middleBefore = this.#middle(before);
    const middleAfter = this.#middle(after);
    const distanceBefore = this.#distance(before);

    this.isDragging.set(true);
    this.#moveBy(middleAfter.x - middleBefore.x, middleAfter.y - middleBefore.y);

    if (distanceBefore > 0) {
      this.#zoomAt(middleAfter, this.#distance(after) / distanceBefore);
    }
  }

  #moveBy(deltaX: number, deltaY: number): void {
    const { x, y } = this.#offset();

    this.view.set({ offset: { x: x + deltaX, y: y + deltaY }, scale: this.#scale() });
  }

  #zoomAt(point: Point, factor: number): void {
    const scale = this.#scale();
    const nextScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale * factor));
    const ratio = nextScale / scale;
    const { x, y } = this.#offset();

    this.view.set({
      offset: { x: point.x - (point.x - x) * ratio, y: point.y - (point.y - y) * ratio },
      scale: nextScale,
    });
  }

  #center(): Point {
    return { x: this.#element.clientWidth / 2, y: this.#element.clientHeight / 2 };
  }

  #toLocalPoint(event: MouseEvent): Point {
    const bounds = this.#element.getBoundingClientRect();

    return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
  }

  #middle(points: Point[]): Point {
    return {
      x: points.reduce((total, point) => total + point.x, 0) / points.length,
      y: points.reduce((total, point) => total + point.y, 0) / points.length,
    };
  }

  #distance(points: Point[]): number {
    const [first, second] = points;

    return first && second ? Math.hypot(second.x - first.x, second.y - first.y) : 0;
  }
}
