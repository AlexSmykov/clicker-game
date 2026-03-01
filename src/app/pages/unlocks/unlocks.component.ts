import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { UnlockService } from 'src/app/features/unlock/unlock.service';
import { UnlockKey } from 'src/app/features/unlock/unlock.type';
import { UNLOCK_DATA } from 'src/app/features/unlock/unlock.const';
import { ResourceService } from 'src/app/features/resource/resource.service';
import { UnlockComponent } from 'src/app/features/unlock/components/unlock/unlock.component';
import { UnlockInputData } from 'src/app/features/unlock/components/unlock/unlock.type';
import { ParamService } from 'src/app/features/param/param.service';
import { UpgradeService } from 'src/app/features/upgrade/upgrade.service';

const MAX_SCROLL_VALUE = 7;
const MIN_SCROLL_VALUE = -3;

const UNLOCK_OBJECT_SIZE = 50;
const UNLOCK_OBJECT_SIZE_HALF = UNLOCK_OBJECT_SIZE / 2;
const OFFSET = 20;
const FULL_SIZE = UNLOCK_OBJECT_SIZE + OFFSET;
const TREE_SIZE = FULL_SIZE * 100;
const TREE_SIZE_HALF = TREE_SIZE / 2;

@Component({
  selector: 'app-unlocks',
  templateUrl: './unlocks.component.html',
  styleUrl: './unlocks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UnlockComponent],
})
export default class UnlocksComponent implements AfterViewInit {
  readonly viewport = viewChild.required<ElementRef<HTMLDivElement>>('viewport');

  readonly #unlockService = inject(UnlockService);
  readonly #resourceService = inject(ResourceService);
  readonly #upgradeService = inject(UpgradeService);
  readonly #paramService = inject(ParamService);

  readonly scaleLevel = signal(0);
  readonly isDragOn = signal(false);

  readonly scale = computed(() => 1 / Math.pow(1.3, this.scaleLevel()));

  readonly unlockList = computed(() => {
    const unlocksCurrentData = this.#unlockService.unlocksCurrentData();
    const resourcesCurrentData = this.#resourceService.resourcesCurrentData();

    return Object.entries(unlocksCurrentData)
      .map(([key, value]): UnlockInputData => {
        const parsedKey = key as UnlockKey;
        const data = UNLOCK_DATA[parsedKey];

        return {
          key: parsedKey,
          name: data.name,
          description: data.description,
          isUnlocked: value.isUnlocked,
          size: UNLOCK_OBJECT_SIZE,
          offset: OFFSET,
          isResetOnPrestige: value.isResetOnPrestige,
          isCanBuy: data.costs.every((cost) =>
            resourcesCurrentData[cost.resourceKey].value.isGreaterThanOrEqualValue(cost.value),
          ),
          costs: data.costs.map((cost) => {
            return {
              key: cost.resourceKey,
              value: cost.value,
            };
          }),
          requiredUnlocks: data.requiredUnlocks,
          icon: data.iconPath,
          x: TREE_SIZE_HALF + (data.position.x - 0.5) * FULL_SIZE,
          y: TREE_SIZE_HALF + (data.position.y - 0.5) * FULL_SIZE,
        };
      })
      .filter(
        (item, _, allItems) =>
          item.isUnlocked ||
          item.requiredUnlocks.length === 0 ||
          allItems.some(
            (otherItem) => item.requiredUnlocks.includes(otherItem.key) && otherItem.isUnlocked,
          ),
      );
  });

  readonly lines = computed(() => {
    const unlockList = this.unlockList();

    return unlockList
      .map((unlock) => {
        return unlock.requiredUnlocks
          .map((unlockKey) => {
            const requiredUnlock = unlockList.find(
              (requiredUnlock) => requiredUnlock.key === unlockKey,
            );

            if (!requiredUnlock) {
              return null;
            }

            return {
              x1: unlock.x + UNLOCK_OBJECT_SIZE_HALF,
              y1: this.treeSize - unlock.y - UNLOCK_OBJECT_SIZE_HALF,
              x2: requiredUnlock.x + UNLOCK_OBJECT_SIZE_HALF,
              y2: this.treeSize - requiredUnlock.y - UNLOCK_OBJECT_SIZE_HALF,
            };
          })
          .filter((value) => value !== null);
      })
      .flat(1);
  });

  readonly treeSize = TREE_SIZE;

  ngAfterViewInit(): void {
    this.setScroll();
  }

  setScroll(): void {
    const viewport = this.viewport().nativeElement;

    viewport.scrollLeft = (viewport.scrollWidth - viewport.clientWidth) / 2;
    viewport.scrollTop = (viewport.scrollHeight - viewport.clientHeight) / 2 + 200;
  }

  onWheel(event: WheelEvent): void {
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();

      if (event.deltaY > 0) {
        this.upScale();
      } else {
        this.downScale();
      }
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

  buyUnlock(key: UnlockKey, isCanBuy: boolean): void {
    if (isCanBuy) {
      this.#unlockService.updateUnlock(key, {
        isUnlocked: true,
      });

      UNLOCK_DATA[key].effect(this.#upgradeService, this.#paramService, this.#resourceService);
    }
  }

  upScale(): void {
    const viewport = this.viewport().nativeElement;

    const scrollTopCoefficient = viewport.scrollTop / viewport.scrollHeight;
    const scrollLeftCoefficient = viewport.scrollLeft / viewport.scrollWidth;

    this.scaleLevel.update((oldValue) => Math.min(oldValue + 1, MAX_SCROLL_VALUE));

    setTimeout(() => {
      viewport.scrollTop = scrollTopCoefficient * viewport.scrollHeight;
      viewport.scrollLeft = scrollLeftCoefficient * viewport.scrollWidth;
    });
  }

  downScale(): void {
    const viewport = this.viewport().nativeElement;

    const scrollTopCoefficient = viewport.scrollTop / viewport.scrollHeight;
    const scrollLeftCoefficient = viewport.scrollLeft / viewport.scrollWidth;

    this.scaleLevel.update((oldValue) => Math.max(oldValue - 1, MIN_SCROLL_VALUE));

    setTimeout(() => {
      viewport.scrollTop = scrollTopCoefficient * viewport.scrollHeight;
      viewport.scrollLeft = scrollLeftCoefficient * viewport.scrollWidth;
    });
  }
}
