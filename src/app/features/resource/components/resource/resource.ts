import { Component, computed, input } from '@angular/core';
import { ExponentNumber } from 'exponential-number';

import { Icon } from '../../../../shared/components/icon/icon';
import { RESOURCE_DATA } from '../../resource.const';
import { ResourceKey } from '../../resource.type';

@Component({
  host: {
    '[style.color]': 'data().color',
  },
  imports: [Icon],
  selector: 'app-resource',
  styleUrl: './resource.scss',
  templateUrl: './resource.html',
})
export class Resource {
  public readonly key = input.required<ResourceKey>();
  public readonly value = input.required<ExponentNumber>();
  public readonly isShort = input(false);

  protected readonly data = computed(() => RESOURCE_DATA[this.key()]);
  protected readonly formattedValue = computed(() => this.value().toString());
}
