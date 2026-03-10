import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { UnlockInputData } from 'src/app/features/unlock/components/unlock/unlock.type';
import { ResourceComponent } from 'src/app/features/resource/components/resource/resource.component';
import { UNLOCK_ICON_DIR_PATH } from 'src/app/features/unlock/unlock.const';

@Component({
  selector: 'app-unlock',
  templateUrl: './unlock.component.html',
  styleUrl: './unlock.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SvgIconComponent, ResourceComponent],
  host: {
    '[style.bottom.px]': 'data().y',
    '[style.left.px]': 'data().x',
  },
})
export class UnlockComponent {
  readonly data = input.required<UnlockInputData>();

  readonly isShowTooltip = signal(false);

  readonly buy = output<void>();

  readonly iconDir = UNLOCK_ICON_DIR_PATH;

  clickUnlock(): void {
    if (this.isShowTooltip() && !this.data().isUnlocked) {
      this.buy.emit();
    }

    this.isShowTooltip.set(true);
  }
}
