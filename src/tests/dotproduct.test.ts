import { assertEquals, assertThrows } from "./deps.ts";
import { dotproduct } from "../mod.ts";

Deno.test("dotproduct: equal length iterables", () => {
  assertEquals(dotproduct([1, 3, -5], [4, -2, -1]), 3);
});

Deno.test("dotproduct: throws if unequal", () => {
  assertThrows(() => {
    dotproduct([1], [1, 2]);
  });
});
