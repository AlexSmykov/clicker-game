export function keysOf<Key extends string>(record: Record<Key, unknown>): Key[] {
  return Object.keys(record) as Key[];
}

export function mapKeys<Key extends string, Value>(
  keys: readonly Key[],
  map: (key: Key) => Value,
): Record<Key, Value> {
  return Object.fromEntries(keys.map((key) => [key, map(key)])) as Record<Key, Value>;
}
