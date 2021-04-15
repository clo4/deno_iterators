// deno-lint-ignore no-explicit-any
type IndexedIteratorResult<T, TReturn = any> =
  & IteratorResult<T, TReturn>
  & { index: number };

/**
 * CachedIterator is an iterator that stores previous generated values.
 */
// deno-lint-ignore no-explicit-any
export interface CachedIterator<T, TReturn = any, TNext = undefined> {
  [Symbol.iterator](): this;
  /**
   * next() moves the iterator forwards one step and calculates the
   * value if it is not cached.
   */
  next(...args: [] | [TNext]): Readonly<IteratorResult<T, TReturn>>;
  /**
   * prev() moves the iterator back one step.
   *
   * If there is nothing in the cache (ie. next() hasn't been called),
   * prev() will throw.
   */
  prev(): Readonly<IndexedIteratorResult<T, TReturn>>;
}

/**
 * cacheIterator creates a wrapper around an iterator and caches its values
 * when `next()` is called. The cache can be traversed with `prev()`.
 *
 * ```
 * const it = [0, 1, 2][Symbol.iterator]()
 * const cached = cacheIterator(it)
 * cached.next() // { value: 0, done: false }
 * cached.next() // { value: 1, done: false }
 * cached.prev() // { value: 0, done: false, index: 0 }
 * ```
 *
 * If you call `prev()` with nothing in the cache, it will throw.
 * ```
 * const it = [0, 1, 2][Symbol.iterator]()
 * const cached = cacheIterator(it)
 * cached.prev() // Error: CachedIterator: no values cached, call next() at least once.
 * ```
 */
// deno-lint-ignore no-explicit-any
export function cacheIterator<T, TReturn = any, TNext = undefined>(
  iterator: Iterator<T, TReturn, TNext>,
): CachedIterator<T, TReturn, TNext> {
  // the cache is just an array that stores previous results.
  // it's the source of truth instead of the iterator.
  const cache: IteratorResult<T, TReturn>[] = [];
  let nextIndex = 0;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next(...args: [] | [TNext]): Readonly<IteratorResult<T, TReturn>> {
      if (!(nextIndex in cache)) {
        cache[nextIndex] = iterator.next(...args);
      }
      const result = cache[nextIndex];
      nextIndex += 1;
      return result;
    },
    prev(): Readonly<IndexedIteratorResult<T, TReturn>> {
      if (cache.length === 0) {
        throw new Error(
          "CachedIterator: no values cached, call next() at least once.",
        );
      }
      if (nextIndex > 1) {
        nextIndex -= 1;
      }
      return { ...cache[nextIndex - 1], index: nextIndex - 1 };
    },
  };
}
