import { assert } from "./deps.ts";
import { isReturnResult } from "../mod.ts";

Deno.test("isReturnResult", () => {
  assert(isReturnResult({ done: true, value: undefined }));
  assert(!isReturnResult({ done: false, value: 8 }));
  assert(!isReturnResult({ value: 8 }));
});
