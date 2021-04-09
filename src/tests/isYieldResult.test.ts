import { assert } from "./deps.ts";
import { isYieldResult } from "../mod.ts";

Deno.test("isYieldResult", () => {
  assert(isYieldResult({ value: 8 }));
  assert(isYieldResult({ done: false, value: 8 }));
  assert(!isYieldResult({ done: true, value: undefined }));
});
