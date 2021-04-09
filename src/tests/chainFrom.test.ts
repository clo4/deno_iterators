import { assertEquals } from "./deps.ts";
import { chainFrom } from "../mod.ts";

Deno.test("chainFrom", () => {
  assertEquals(
    [...chainFrom(["abc", [1, 2, 3], "xyz"])],
    ["a", "b", "c", 1, 2, 3, "x", "y", "z"],
  );
});
