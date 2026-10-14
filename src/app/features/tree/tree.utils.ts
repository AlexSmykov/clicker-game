import { TreeNodeDefinition } from './tree.type';

export function defineTreeNodes<Key extends string>(
  nodes: Record<Key, TreeNodeDefinition<NoInfer<Key>>>,
): Record<Key, TreeNodeDefinition<Key>> {
  return nodes;
}
