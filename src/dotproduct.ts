import { map } from "./map.ts";
import { sum } from "./sum.ts";
import { zipStrict } from "./zip.ts";

/**
 * The sum of multiplying each item from two vectors (iterables).
 * @example
 * ```
 * dotproduct([1, 3, -5], [4, -2, -1])
 * // => 3
 * ```
 */
export function dotproduct(a: Iterable<number>, b: Iterable<number>): number {
  return sum(map(zipStrict(a, b), ([x, y]) => x * y));
}
