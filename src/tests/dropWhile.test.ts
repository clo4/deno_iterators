import { assertEquals } from "./deps.ts";
import { dropWhile } from "../mod.ts";

Deno.test("dropWhile", () => {
  assertEquals(
    [...dropWhile((x) => x < 0, [-2, -1, 0, 1, 0, -1, -2])],
    [0, 1, 0, -1, -2],
  );
});
