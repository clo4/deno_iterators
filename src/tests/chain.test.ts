import { assertEquals } from "./deps.ts";
import { chain } from "../mod.ts";

Deno.test("chain", () => {
  assertEquals(
    [...chain("abc", [1, 2, 3], "xyz")],
    ["a", "b", "c", 1, 2, 3, "x", "y", "z"],
  );
});
