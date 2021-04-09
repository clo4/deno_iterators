/**
 * Get the sum of all numbers in an iterable.
 * @param numbers The numbers to sum.
 * @param start Start from this number.
 * @example
 * ```
 * sum(range(5))
 * // => 10
 * ```
 */
export function sum(numbers: Iterable<number>, start = 0): number {
  let total = start;
  for (const n of numbers) {
    total += n;
  }
  return total;
}
