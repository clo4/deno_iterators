import { Unwrap } from "./_types.ts";

/**
 * Get the cartesian product of the given iterables.
 * @example
 * ```
 * [...product('ab', 'xy')]
 * // => [['a', 'x'], ['a', 'y'], ['b', 'x'], ['b', 'y']]
 * ```
 */
export function* product<Iterables extends Iterable<unknown>[]>(
  ...iterables: Iterables
): Generator<Unwrap<Unwrap<Iterables>>[]> {
  const [head = [], ...tail] = iterables;
  const prod = tail.length ? [...product(...tail)] : [[]];
  for (const a of head) {
    for (const b of prod) {
      // @ts-ignore TS can't guarantee that `a` and `b` are the `unknown` in `Iterables`
      yield [a, ...b];
    }
  }
}
