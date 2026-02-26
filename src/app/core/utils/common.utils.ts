export function exhaustedMap(value: never): never {
  throw new Error(`Caught unhandled enum value: ${value}`);
}
