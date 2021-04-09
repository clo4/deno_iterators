import { any } from "./any.ts";

type RangeArgs =
  | [stop: number]
  | [start: number, stop: number]
  | [start: number, stop: number, step: number];

/**
 * Generator numbers from `start` to `stop`, non-inclusive. Increment by `step`.
 * @example
 * ```
 * [...range(5)]
 * // => [0, 1, 2, 3, 4]
 * ```
 * @example
 * ```
 * [...range(10, 15)]
 * // => [10, 11, 12, 13, 14]
 * ```
 * @example
 * ```
 * [...range(0, 6, 2)]
 * // => [0, 2, 4]
 * ```
 * @example
 * ```
 * [...range(10, 0, -2)]
 * // [10, 8, 6, 4, 2]
 * ```
 */
export function range(...args: RangeArgs): IterableIterator<number> {
  let start: number, stop: number, step: number;

  if (args.length === 1) {
    start = 0;
    stop = args[0];
    step = 1;
  } else {
    start = args[0];
    stop = args[1];
    step = args[2] ?? 1;
  }

  // Can't have any NaNs or negative numbers.
  if (any([start, stop, step].map(isNaN))) {
    throw new Error("NaN is not allowed as an argument to range()");
  }

  if (!step) {
    throw new Error("step must not be 0"); // Yields `start` forever
  }

  // using an IIFE to throw eagerly
  return (function* () {
    if (step > 0 && start > stop) return; // Will count up forever
    if (step < 0 && start < stop) return; // Will count down forever

    if (start < stop) {
      for (let i = start; i < stop; i += step) {
        yield i;
      }
    } else if (start > stop) {
      for (let i = start; i > stop; i += step) {
        yield i;
      }
    }
  })();
}
