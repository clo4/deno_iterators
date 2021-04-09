import { assertEquals, assertThrows, DEFINITELY_INFINITY } from "./deps.ts";
import { zipStrict } from "../mod.ts";

Deno.test("zipStrict: 2", () => {
  assertEquals(
    [...zipStrict("abcd", [1, 2, 3, 4])],
    [["a", 1], ["b", 2], ["c", 3], ["d", 4]],
  );
});

Deno.test("zipStrict: N", () => {
  const longString = "x".repeat(DEFINITELY_INFINITY);
  // The result will be the same as spreading the string and nesting it.
  assertEquals([...zipStrict(...longString)], [[...longString]]);
});

Deno.test("zipStrict: throws if unequal", () => {
  assertThrows(() => {
    [...zipStrict("123", "abcdefgh")];
  });
});

Deno.test("zipStrict: works with no input", () => {
  assertEquals([...zipStrict()], []);
});
