import { assertEquals } from "./deps.ts";
import { product } from "../mod.ts";

Deno.test("product: works", () => {
  assertEquals(
    [...product([1, 2], "abc", [true, false])],
    [
      [1, "a", true],
      [1, "a", false],
      [1, "b", true],
      [1, "b", false],
      [1, "c", true],
      [1, "c", false],
      [2, "a", true],
      [2, "a", false],
      [2, "b", true],
      [2, "b", false],
      [2, "c", true],
      [2, "c", false],
    ],
  );
});

Deno.test("product: no input produces an empty array", () => {
  assertEquals([...product()], []);
});

Deno.test("product: one iterable gets split into separate arrays", () => {
  assertEquals([...product("abc")], [["a"], ["b"], ["c"]]);
});
