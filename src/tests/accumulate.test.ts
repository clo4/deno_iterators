import { assertEquals } from "./deps.ts";
import { accumulate } from "../mod.ts";

Deno.test("accumulate: no values", () => {
  assertEquals(
    [...accumulate<number>([], (prev, curr) => prev + curr)],
    [],
  );
});

Deno.test("accumulate: no initial value", () => {
  assertEquals(
    [...accumulate([0, 1, 2, 3, 4], (prev, curr) => prev + curr)],
    [0, 1, 3, 6, 10],
  );
});

Deno.test("accumulate: initial value", () => {
  assertEquals(
    [...accumulate([0, 1, 2, 3, 4], (prev, curr) => prev + curr, "")],
    // When there's a string involved in addition, it's actually string
    // concatenation. The other value is .toString()'d and appended.
    ["", "0", "01", "012", "0123", "01234"],
  );
});

Deno.test("accumulate: initial value with empty iterable yields initial", () => {
  assertEquals(
    [...accumulate([], (prev, curr) => prev + curr, "")],
    [""],
  );
});
