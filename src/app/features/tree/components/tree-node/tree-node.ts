import { Component, input, output } from '@angular/core';

import { Icon } from '../../../../shared/components/icon/icon';
import { TreeNodeStatus } from '../../tree.type';

@Component({
  imports: [Icon],
  selector: 'app-tree-node',
  styleUrl: './tree-node.scss',
  templateUrl: './tree-node.html',
})
export class TreeNode {
  public readonly name = input.required<string>();
  public readonly iconPath = input.required<string>();
  public readonly status = input.required<TreeNodeStatus>();
  public readonly isPermanent = input.required<boolean>();
  public readonly isAffordable = input.required<boolean>();
  public readonly isSelected = input.required<boolean>();
  public readonly isIconHidden = input(false);

  public readonly selected = output();
}
