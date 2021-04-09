/**
 * Generator the same object a given number of times.
 * @param item The object to repeat.
 * @param times Number of times to yield the item.
 * @example
 * ```
 * [...repeat(true, 6)]
 * // => [true, true, true, true, true, true]
 * ```
 */
export function* repeat<T>(item: T, times = Infinity): Generator<T> {
  for (let i = times; i > 0; i--) {
    yield item;
  }
}
