import { any } from "./any.ts";
import { enumerate } from "./enumerate.ts";
import { range } from "./range.ts";
import { isReturnResult } from "./result.ts";

/**
 * Take a slice of an iterable, starting from 0.
 * @param iterable The iterable to slice.
 * @param stop The index to stop at (exclusive). Must be positive.
 * @example
 * ```
 * [...slice(count()], 5)
 * // => [0, 1, 2, 3, 4]
 * ```
 */
export function slice<T>(
  iterable: Iterable<T>,
  stop: number,
): Generator<T>;

/**
 * Take a slice of an iterable.
 * @param iterable The iterable to slice.
 * @param start The index to start from (inclusive). 0 if null. Must be postive.
 * @param stop The index to stop at (exclusive). Infinity if null. Must be positive.
 * @param step Yield every N values. 1 if undefined or null. Must be positive.
 * @example
 * ```
 * [...slice(count(), 5, 10)]
 * // => [5, 6, 7, 8, 9]
 * ```
 * @example
 * ```
 * [...slice(count(), 10, 20, 2)]
 * // => [10, 12, 14, 16, 18]
 * ```
 */
export function slice<T>(
  iterable: Iterable<T>,
  start: number | null,
  stop: number | null,
  step?: number,
): Generator<T>;

export function slice<T>(
  iterable: Iterable<T>,
  ...sliceArgs: [number] | [number | null, number | null, number?]
): Generator<T> {
  let start: number, stop: number, step: number;

  if (sliceArgs.length === 1) {
    start = 0;
    stop = sliceArgs[0];
    step = 1;
  } else {
    start = sliceArgs[0] ?? 0;
    stop = sliceArgs[1] ?? Infinity;
    step = sliceArgs[2] ?? 1;
  }

  // Can't have any NaNs or negative numbers.
  if (any([start, stop, step].map((x) => x < 0 || isNaN(x)))) {
    throw new Error("all values must be positive");
  }

  // Yield a value when the index of the iterator matches the previous
  // value of the range iterator.
  // This also needs to be done outside the generator function so that
  // it's evaluated eagerly.
  const rangeIterator = range(start, stop, step);

  return (function* () {
    const result = rangeIterator.next();
    if (isReturnResult(result)) {
      return;
    }
    let nextIndex = result.value;

    for (const [index, item] of enumerate(iterable)) {
      if (index !== nextIndex) {
        continue;
      }
      yield item;
      const result = rangeIterator.next();
      if (isReturnResult(result)) {
        return;
      }
      nextIndex = result.value;
    }
  })();
}
