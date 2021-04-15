/**
 * Apply `fn` to each item of an iterable.
 * @param iterable Items to map.
 * @param fn The function to apply.
 * @example
 * ```
 * map(range(10), (x) => x * 2)
 * ```
 */
export function* map<T, FnResult>(
  iterable: Iterable<T>,
  fn: (x: T) => FnResult,
): Generator<FnResult> {
  for (const value of iterable) {
    yield fn(value);
  }
}
