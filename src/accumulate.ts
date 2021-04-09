import { Iterable2 } from "./_types.ts";
import { iter } from "./iter.ts";
import { isReturnResult } from "./result.ts";

/**
 * Yield accumulated values (similar to `Array.reduce`, but with
 * intermediate values).
 */
export function accumulate<T>(
  iterable: Iterable2<T>,
  fn: (previous: T, current: T) => T,
): Generator<T>;

/**
 * Yield accumulated values (similar to `Array.reduce`, but with
 * intermediate values).
 */
export function accumulate<T, U>(
  iterable: Iterable2<T>,
  fn: (previous: U, current: T) => U,
  initial: U,
): Generator<U>;

export function* accumulate<T, U>(
  iterable: Iterable2<T>,
  fn: (previous: T | U, current: T) => T | U,
  initial?: U,
): Generator<T | U> {
  const iterator = iter(iterable);

  // The result has to start out with an initial value. Use the first
  // value of the iterator if no initial value was provided.
  let result: T | U;

  if (initial !== undefined) {
    result = initial;
  } else {
    const next = iterator.next();
    if (isReturnResult(next)) {
      return;
    }
    result = next.value;
  }

  yield result;
  for (const value of iterator) {
    result = fn(result, value);
    yield result;
  }
}
