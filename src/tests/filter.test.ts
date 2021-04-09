import { assertEquals } from "./deps.ts";
import { filter } from "../mod.ts";

Deno.test("filter", () => {
  assertEquals(
    [...filter([0, 1, false, true, "", "a"], (x) => !!x)],
    [1, true, "a"],
  );
});
