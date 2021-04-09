import { compress } from "../mod.ts";
import { assertEquals } from "./deps.ts";

Deno.test("compress: same length selector", () => {
  assertEquals(
    [...compress(
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 1, 1, 0, 1, 0, 0, 1, 0],
    )],
    [1, 2, 3, 5, 8],
  );
});

Deno.test("compress: stops on shortest iterator", () => {
  assertEquals(
    [...compress("abcdef", "....")],
    ["a", "b", "c", "d"],
  );
  assertEquals(
    [...compress("abc", "....")],
    ["a", "b", "c"],
  );
});
