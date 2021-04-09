/**
 * Generator items of `iterable` for where `fn` of that item is truthy.
 * @param fn Filter items using this function.
 * @param iterable The iterable to filter.
 * @example
 * ```
 * [...filter([0, 1, 2, 1], (x) => x === 1)]
 * // => [1, 1]
 * ```
 */
export function* filter<T>(
  iterable: Iterable<T>,
  fn: (x: T) => boolean,
): Generator<T> {
  for (const item of iterable) {
    if (fn(item)) {
      yield item;
    }
  }
}

/**
 * Generator items of `iterable` where `fn` returns false.
 * @param fn The function to filter items with.
 * @param iterable The iterable to filter.
 * @example
 * ```
 * [...filterFalse([0, 1, 2, 1], (x) => x === 1)]
 * // => [0, 2]
 * ```
 */
export function* filterFalse<T>(
  iterable: Iterable<T>,
  fn: (x: T) => boolean,
): Generator<T> {
  for (const item of iterable) {
    if (!fn(item)) {
      yield item;
    }
  }
}
