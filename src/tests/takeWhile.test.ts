import { assertEquals } from "./deps.ts";
import { takeWhile } from "../mod.ts";

Deno.test("takeWhile", () => {
  assertEquals(
    [...takeWhile((x) => x < 0, [-2, -1, 0, 1, 0, -1, -2])],
    [-2, -1],
  );
});
