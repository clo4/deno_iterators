import { assertEquals, DEFINITELY_INFINITY } from "./deps.ts";
import { zip } from "../mod.ts";

Deno.test("zip: 2", () => {
  assertEquals(
    [...zip("abcd", [1, 2, 3, 4])],
    [["a", 1], ["b", 2], ["c", 3], ["d", 4]],
  );
});

Deno.test("zip: N", () => {
  const longString = "x".repeat(DEFINITELY_INFINITY);
  // The result will be the same as spreading the string and nesting it.
  assertEquals([...zip(...longString)], [[...longString]]);
});

Deno.test("zip: stops on shortest iterable", () => {
  assertEquals(
    [...zip("123", "abcdefgh")],
    [["1", "a"], ["2", "b"], ["3", "c"]],
  );
  assertEquals(
    [...zip("12345678", "abc")],
    [["1", "a"], ["2", "b"], ["3", "c"]],
  );
});

Deno.test("zip: works with no input", () => {
  assertEquals([...zip()], []);
});
