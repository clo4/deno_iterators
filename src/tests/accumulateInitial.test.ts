import { assertEquals } from "./deps.ts";
import { accumulateInitial } from "../mod.ts";

Deno.test("accumulateInitial: initial value", () => {
  assertEquals(
    [...accumulateInitial([0, 1, 2, 3, 4], "", (prev, curr) => prev + curr)],
    // When there's a string involved in addition, it's actually string
    // concatenation. The other value is .toString()'d and appended.
    ["", "0", "01", "012", "0123", "01234"],
  );
});

Deno.test("accumulateInitial: initial value with empty iterable yields initial", () => {
  assertEquals(
    [...accumulateInitial([], "", (prev, curr) => prev + curr)],
    [""],
  );
});
