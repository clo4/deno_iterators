import { zip } from "./zip.ts";

/**
 * Generator items of `iterable` where the corresponding item from `selectors` is truthy.
 * @param iterable The iterable to filter.
 * @param selectors Values to use to select which items to yield.
 */
export function* compress<T>(
  iterable: Iterable<T>,
  selectors: Iterable<unknown>,
): Generator<T> {
  for (const [item, selector] of zip(iterable, selectors)) {
    if (selector) {
      yield item;
    }
  }
}
