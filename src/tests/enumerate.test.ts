import { assertEquals } from "./deps.ts";
import { enumerate } from "../mod.ts";

Deno.test("enumerate", () => {
  assertEquals(
    [...enumerate("abc")],
    [[0, "a"], [1, "b"], [2, "c"]],
  );
});
