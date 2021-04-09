import { assertStrictEquals } from "./deps.ts";
import { iter } from "../mod.ts";

Deno.test("iter", () => {
  const sentinel = Symbol();
  const x = {
    [Symbol.iterator]() {
      return sentinel;
    },
  };
  assertStrictEquals(iter(x), sentinel);
});
