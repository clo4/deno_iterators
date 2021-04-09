export type Unwrap<T> = T extends Iterable<infer U> ? U : never;

/**
 * An iterable (not an iterator) where the result of calling
 * `Symbol.iterator` is an iterable iterator, akin to Python's `Iterable`.
 * Typescript's Iterable doesn't guarantee that its iterator is also iterable.
 * This is not itself a guarantee of _idempotency_, but most Javascript
 * iterables do happen to be idempotent.
 * @example
 * ```
 * const x: Iterable2<number> = [1, 2, 3]
 * const iter1 = iter(x)
 * const iter2 = iter(iter1)
 * Object.is(iter1, iter2)
 * // => true
 * ```
 */
export interface Iterable2<T> {
  [Symbol.iterator](): IterableIterator<T>;
}
