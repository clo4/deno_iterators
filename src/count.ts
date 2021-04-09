/**
 * Generator numbers starting from 0, counting by 1.
 * @param start The number to start counting from.
 * @param step Count in increments of this number.
 * @example
 * ```
 * for (const x of count()) console.log(x)
 * // 0
 * // 1
 * // 2
 * // ...
 * ```
 */
export function* count(start = 0, step = 1): IterableIterator<number> {
  for (let i = start;; i += step) {
    yield i;
  }
}
