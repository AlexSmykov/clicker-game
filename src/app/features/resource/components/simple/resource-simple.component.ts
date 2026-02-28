import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RESOURCE_DATA, RESOURCE_ICON_DIR_PATH } from 'src/app/features/resource/resource.const';
import { SvgIconComponent } from 'angular-svg-icon';
import { ResourceKey } from 'src/app/features/resource/resource.type';

@Component({
  selector: 'app-resource-simple',
  templateUrl: './resource-simple.component.html',
  styleUrl: './resource-simple.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SvgIconComponent],
})
export class ResourceSimpleComponent {
  readonly key = input.required<ResourceKey>();

  readonly resourceData = RESOURCE_DATA;
  readonly iconsPath = RESOURCE_ICON_DIR_PATH;
}
