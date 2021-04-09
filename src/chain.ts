/**
 * Chain together items from each of the iterables as a single iterator.
 * @param iterables Iterables to yield the items of.
 * @example
 * ```
 * [...chain([1, 2], 'abc')]
 * // => [1, 2, 'a', 'b', 'c']
 * ```
 */
export function chain<Iterables extends Array<Iterable<unknown>>>(
  ...iterables: Iterables
): Generator<Iterables extends Iterable<Iterable<infer T>> ? T : never> {
  return chainFrom(iterables);
}

/**
 * Create a chain from an iterable of iterables.
 * @param iterables Iterables to yield the items of.
 * @example
 * ```
 * [...chainFrom([[1, 2], 'abc'])]
 * // => [1, 2, 'a', 'b', 'c']
 * ```
 */
export function* chainFrom<Iterables extends Iterable<Iterable<unknown>>>(
  iterables: Iterables,
): Generator<Iterables extends Iterable<Iterable<infer T>> ? T : never> {
  for (const iterable of iterables) {
    for (const item of iterable) {
      // @ts-ignore TS can't check that `item` is the inner T
      yield item;
    }
  }
}
