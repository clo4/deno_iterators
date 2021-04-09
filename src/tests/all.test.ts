import { assert } from "./deps.ts";
import { all } from "../mod.ts";

Deno.test("all", () => {
  // All are truthy
  assert(all([true, 1, "x", [], {}]));
  // Oops! null snuck in. Rude.
  assert(!all([true, 1, "x", null, {}]));
});
