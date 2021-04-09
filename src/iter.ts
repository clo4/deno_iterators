/**
 * Get the iterator of a given iterable.
 * @param iterable The iterable to get the iterator of.
 * @example
 * ```
 * const x = iter([0, 1])
 * x.next()  // => { value: 0, done: false }
 * x.next()  // => { value: 1, done: false }
 * x.next()  // => { value: undefined, done: true }
 * ```
 */
export function iter<T>(iterable: { [Symbol.iterator](): T }): T {
  return iterable[Symbol.iterator]();
}
