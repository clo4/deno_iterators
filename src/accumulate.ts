import { Iterable2 } from "./_types.ts";
import { iter } from "./iter.ts";
import { isReturnResult } from "./result.ts";

/**
 * Yield accumulated values.
 *
 * `0, fn(0, 1), fn(fn(0, 1), 2), ...`
 */
export function* accumulate<T>(
  iterable: Iterable2<T>,
  fn: (previous: T, current: T) => T,
): Generator<T> {
  const iterator = iter(iterable);

  const next = iterator.next();
  if (isReturnResult(next)) {
    return;
  }
  let result = next.value;

  yield result;
  for (const value of iterator) {
    result = fn(result, value);
    yield result;
  }
}

/**
 * Yield accumulated values, starting with an initial value.
 *
 * `i, fn(i, 0), fn(fn(i, 0), 1), ...`
 */
export function* accumulateInitial<T, U>(
  iterable: Iterable<T>,
  initial: U,
  fn: (previous: U, current: T) => U,
): Generator<U> {
  let result = initial;
  yield result;
  for (const value of iterable) {
    result = fn(result, value);
    yield result;
  }
}
