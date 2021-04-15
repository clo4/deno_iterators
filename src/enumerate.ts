import { count } from "./count.ts";
import { zip } from "./zip.ts";

/**
 * Yield a tuple of the index and the item.
 * @param iterable The iterable to enumerate.
 * @example
 * ```
 * [...enumerate("abc")]
 * // => [[1, "a"], [2, "b"], [3, "c"]]
 * ```
 */
export function enumerate<T>(
  iterable: Iterable<T>,
  start = 0,
): Generator<[number, T]> {
  return zip(count(start), iterable);
}
