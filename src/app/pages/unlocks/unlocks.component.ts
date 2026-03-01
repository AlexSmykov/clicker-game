import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';

const MAX_SCROLL_VALUE = 7;
const MIN_SCROLL_VALUE = 0;

@Component({
  selector: 'app-unlocks',
  templateUrl: './unlocks.component.html',
  styleUrl: './unlocks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export default class UnlocksComponent implements AfterViewInit {
  readonly viewport = viewChild.required<ElementRef<HTMLDivElement>>('viewport');

  readonly scaleLevel = signal(2);
  readonly isDragOn = signal(false);

  readonly scale = computed(() => 1 / Math.pow(1.3, this.scaleLevel()));

  ngAfterViewInit(): void {
    this.setScroll();
  }

  setScroll(): void {
    const viewport = this.viewport().nativeElement;

    viewport.scrollLeft = (viewport.scrollWidth - viewport.clientWidth) / 2;
    viewport.scrollTop = (viewport.scrollHeight - viewport.clientHeight) / 2;
  }

  onWheel(event: WheelEvent): void {
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();

      const viewport = this.viewport().nativeElement;

      const scrollTopCoefficient = viewport.scrollTop / viewport.scrollHeight;
      const scrollLeftCoefficient = viewport.scrollLeft / viewport.scrollWidth;

      if (event.deltaY > 0) {
        this.scaleLevel.update((oldValue) => Math.min(oldValue + 1, MAX_SCROLL_VALUE));
      } else {
        this.scaleLevel.update((oldValue) => Math.max(oldValue - 1, MIN_SCROLL_VALUE));
      }

      setTimeout(() => {
        viewport.scrollTop = scrollTopCoefficient * viewport.scrollHeight;
        viewport.scrollLeft = scrollLeftCoefficient * viewport.scrollWidth;
      });
    }
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragOn()) {
      return;
    }

    event.preventDefault();

    const viewport = this.viewport().nativeElement;

    viewport.scrollLeft -= event.movementX;
    viewport.scrollTop -= event.movementY;
  }
}
