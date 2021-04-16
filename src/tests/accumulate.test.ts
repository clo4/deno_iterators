import { assertEquals } from "./deps.ts";
import { accumulate } from "../mod.ts";

Deno.test("accumulate: first value used as the initial value", () => {
  assertEquals(
    [...accumulate([0, 1, 2, 3, 4], (prev, curr) => prev + curr)],
    [0, 1, 3, 6, 10],
  );
});

Deno.test("accumulate: no values yields nothing", () => {
  assertEquals(
    [...accumulate([] as number[], (prev, curr) => prev + curr)],
    [],
  );
});

Deno.test("accumulate: one value yields the first value", () => {
  assertEquals(
    [...accumulate([0], (prev, curr) => prev + curr)],
    [],
  );
});
