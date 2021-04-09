import { assertEquals } from "./deps.ts";
import { map } from "../mod.ts";

Deno.test("map", () => {
  assertEquals(
    [...map(["1", "2", "a"], parseInt)],
    [1, 2, NaN],
  );
});
