import { assert } from "./deps.ts";
import { any } from "../mod.ts";

Deno.test("any", () => {
  //  one of them is truthy!
  assert(any([0, null, true, "", false]));
  // None of them is truthy :(
  assert(!any([0, null, "", false]));
});
