import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ResourceInputData } from 'src/app/features/resource/components/resource/resource.type';
import { RESOURCE_DATA, RESOURCE_ICON_DIR_PATH } from 'src/app/features/resource/resource.const';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrl: './resource.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SvgIconComponent],
})
export class ResourceComponent {
  readonly data = input.required<ResourceInputData>();
  readonly isShort = input(false);

  readonly resourceData = RESOURCE_DATA;
  readonly iconsPath = RESOURCE_ICON_DIR_PATH;
}
