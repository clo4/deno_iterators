import { Unwrap } from "./_types.ts";
import { all } from "./all.ts";
import { any } from "./any.ts";
import { iter } from "./iter.ts";
import { isReturnResult } from "./result.ts";

/**
 * Yield items from the same index in each iterable as a tuple.
 * Once an iterable is exhausted, the generator closes.
 * @param iterables The iterables to zip together.
 * @example
 * ```
 * [...zip(['Jack', 'Jill'], [76, 48], ['M', 'F'])]
 * // => [['Jack', 76, 'M'], ['Jill', 48, 'F']]
 * ```
 */
export function* zip<Iterables extends Iterable<unknown>[]>(
  ...iterables: Iterables
): IterableIterator<{ [I in keyof Iterables]: Unwrap<Iterables[I]> }> {
  const iterators = iterables.map(iter);
  if (iterators.length) {
    for (;;) {
      const values = [];
      for (const iterator of iterators) {
        const result = iterator.next();
        if (isReturnResult(result)) {
          return;
        }
        values.push(result.value);
      }
      // deno-lint-ignore no-explicit-any TS can't verify this so tests will have to suffice
      yield values as any;
    }
  }
}

/**
 * Yield items from the same index in each iterable, as a tuple.
 * The fill value is used in place of a value from an exhausted iterable.
 * @param fill The value to use when no value has been generated.
 * @param iterables Iterables to zip together.
 * @example
 * ```
 * [...zipLongest(null, [1, 2], [1, 2, 3])]
 * // => [[1, 1], [2, 2], [null, 3]]
 * ```
 */
export function* zipLongest<Fill, Iterables extends Iterable<unknown>[]>(
  fill: Fill,
  ...iterables: Iterables
): Generator<{ [I in keyof Iterables]: Unwrap<Iterables[I]> | Fill }> {
  const iterators = iterables.map(iter);
  if (iterators.length) {
    for (;;) {
      const values = [];
      const isDone = [];
      for (const iterator of iterators) {
        const { value, done } = iterator.next();
        isDone.push(done);
        values.push(done ? fill : value);
      }
      if (all(isDone)) {
        return;
      }
      // deno-lint-ignore no-explicit-any
      yield values as any;
    }
  }
}

/**
 * Yield items from the same index in each iterable, as a tuple.
 * Will throw if at least one iterable is done before all of them are done.
 * @param iterables Iterables to zip together.
 * @example
 * ```
 * [...zipStrict([1, 2], [1, 2, 3])] // throws
 * ```
 */
export function* zipStrict<Iterables extends Iterable<unknown>[]>(
  ...iterables: Iterables
): Generator<{ [I in keyof Iterables]: Unwrap<Iterables[I]> }> {
  const iterators = iterables.map(iter);
  if (iterators.length) {
    for (;;) {
      const values = [];
      const isDone = [];
      for (const iterator of iterators) {
        const { value, done } = iterator.next();
        isDone.push(done);
        values.push(value);
      }
      if (all(isDone)) {
        return;
      } else if (any(isDone)) {
        // Already know they're not all done, so if any of them have
        // finished, throw an error.
        throw new Error("zipStrict: iterators were of unequal length");
      }
      // deno-lint-ignore no-explicit-any
      yield values as any;
    }
  }
}
