/**
 * Check if an iterator result is an `IteratorReturnResult`.
 * @example
 * ```
 * const result = iter([1, 2, 3]).next()
 * if (isReturnResult(result)) {
 *   // result is an IteratorReturnResult
 * } else {
 *   // result is an IteratorYieldResult
 * }
 * ```
 */
export function isReturnResult<Return>(
  result: IteratorResult<unknown, Return>,
): result is IteratorReturnResult<Return> {
  return result.done === true;
}

/**
   * Check if an iterator result is an `IteratorYieldResult`.
   * @example
   * ```
   * const result = iter([1, 2, 3]).next()
   * if (isYieldResult(result)) {
   *   // result is an IteratorYieldResult
   * } else {
   *   // result is an IteratorReturnResult
   * }
   * ```
   */
export function isYieldResult<Yield>(
  result: IteratorResult<Yield, unknown>,
): result is IteratorYieldResult<Yield> {
  return result.done !== true;
}
