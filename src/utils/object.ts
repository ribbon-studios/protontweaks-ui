export function every<K extends string, V, O extends Record<K, V>>(
  object: Partial<Record<K, V>>,
  predicate: ([key, value]: [K, V | undefined]) => boolean
): boolean {
  for (const key in object) {
    if (!predicate([key, object[key]])) {
      return false;
    }
  }

  return true;
}
