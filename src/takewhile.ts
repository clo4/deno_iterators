import { Iterable2 } from "./_types.ts";
import { iter } from "./iter.ts";

/**
 * Yield items of `iterable` until the predicate has returned false once.
 * @param predicate The function to test each item against.
 * @param iterable The iterable to check the items of.
 * @example
 * ```
 * [...takeWhile((x) => x < 3, [0, 1, 2, 3, 2, 1, 0])]
 * // => [0, 1, 2]
 * ```
 */
export function* takeWhile<T>(
  predicate: (x: T) => boolean,
  iterable: Iterable2<T>,
): Generator<T> {
  const iterator = iter(iterable);
  for (const value of iterator) {
    if (!predicate(value)) {
      return;
    }
    yield value;
  }
}
