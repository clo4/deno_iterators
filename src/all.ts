/**
 * Return true if every item in `iterable` is truthy.
 * @param iterable Iterable to test.
 * @example
 * ```
 * all([true, 1, "x", null, { a: 2 }]
 * // => false        ^^^^
 * ```
 */
export function all(iterable: Iterable<unknown>): boolean {
  for (const item of iterable) {
    if (!item) {
      return false;
    }
  }
  return true;
}
