/**
 * Yield a tuple of the index and the item.
 * @param iterable The iterable to enumerate.
 *
 * ```
 * [...enumerate("abc")]
 * // => [[1, "a"], [2, "b"], [3, "c"]]
 * ```
 */
export function* enumerate<T>(
  iterable: Iterable<T>,
  start = 0,
): Generator<[number, T]> {
  let i = start;
  for (const value of iterable) {
    yield [i, value]
    i++;
  }
}
