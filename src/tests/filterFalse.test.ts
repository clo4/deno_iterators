import { assertEquals } from "./deps.ts";
import { filterFalse } from "../mod.ts";

Deno.test("filter", () => {
  assertEquals(
    [...filterFalse([0, 1, false, true, "", "a"], (x) => !!x)],
    [0, false, ""],
  );
});
