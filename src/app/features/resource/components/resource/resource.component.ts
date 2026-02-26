import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ResourceInputData } from 'src/app/features/resource/components/resource/resource.type';
import { RESOURCE_DATA } from 'src/app/features/resource/resource.const';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrl: './resource.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceComponent {
  readonly data = input.required<ResourceInputData>();

  readonly resourceData = RESOURCE_DATA;
}
