/**
 * Return `true` if any item in `iterable` is truthy.
 * @param iterable Iterable to test.
 * @example
 * ```
 * any([0, null, true, "", false])
 * // => true    ^^^^
 * ```
 */
export function any(iterable: Iterable<unknown>): boolean {
  for (const item of iterable) {
    if (item) {
      return true;
    }
  }
  return false;
}
