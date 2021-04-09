/**
 * Indefinitely cycle items of an iterable.
 * @param iterable The iterable to cycle the elements of.
 * @example
 * ```
 * for (const x of cycle(range(3))) console.log(x)
 * // 0, 1, 2, 0, 1, 2, 0, 1, 2, ... etc
 * ```
 * @example
 * ```
 * for (const x of cycle(range(3), 2)) console.log(x)
 * // 0, 1, 2, 0, 1, 2
 * ```
 */
export function* cycle<T>(
  iterable: Iterable<T>,
  times = Infinity,
): Generator<T> {
  if (!times) {
    return;
  }
  const saved = [];
  for (const value of iterable) {
    yield value;
    saved.push(value);
  }
  if (saved.length && times > 1) {
    // Already looped through it once, so times-1
    for (let i = 0; i < times - 1; i++) {
      for (const value of saved) {
        yield value;
      }
    }
  }
}
