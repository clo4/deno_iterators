import { assertEquals, assertThrows } from "./deps.ts";
import { range } from "../mod.ts";

Deno.test("range: NaN as an argument throws an error", () => {
  assertThrows(() => {
    range(NaN);
  });
});

Deno.test("range: stop goes from 0 to stop-1", () => {
  assertEquals(
    [...range(5)],
    [0, 1, 2, 3, 4],
  );
});

Deno.test("range: negative stop yields nothing", () => {
  assertEquals(
    [...range(-1)],
    [],
  );
});

Deno.test("range: stop at 0 yields nothing", () => {
  assertEquals(
    [...range(0)],
    [],
  );
});

Deno.test("range: omitting step is the same as setting it to 1", () => {
  assertEquals(
    [...range(0, 5)],
    [...range(0, 5, 1)],
  );
});

Deno.test("range: explicit start is inclusive", () => {
  assertEquals(
    [...range(5, 10)],
    [5, 6, 7, 8, 9],
  );
});

Deno.test("range: step cannot be 0, throws eagerly", () => {
  assertThrows(() => range(0, 1, 0));
});

Deno.test("range: start > stop and step > 0 yields nothing", () => {
  assertEquals([...range(5, 0, 1)], []);
});

Deno.test("range: start < stop and step < 0 yields nothing", () => {
  assertEquals([...range(0, 5, -1)], []);
});

Deno.test("range: positive step works", () => {
  assertEquals(
    [...range(-5, 5, 2)],
    [-5, -3, -1, 1, 3],
  );
});

Deno.test("range: negative step works", () => {
  assertEquals(
    [...range(5, -5, -2)],
    [5, 3, 1, -1, -3],
  );
});
