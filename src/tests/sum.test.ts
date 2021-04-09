import { assertEquals } from "./deps.ts";
import { sum } from "../mod.ts";

Deno.test("sum: omitting start argument starts from 0", () => {
  assertEquals(
    sum([1, 2, 3, 4, 5, 6, 7, 8, 9]),
    1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9,
  );
});

Deno.test("sum: start from N", () => {
  assertEquals(
    sum([1, 2, 3, 4, 5, 6, 7, 8, 9], 10),
    10 + 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9,
  );
});
