import { assertEquals, assertThrows } from "./deps.ts";
import { slice } from "../mod.ts";

function* to50() {
  for (let i = 0; i < 50; i++) {
    yield i;
  }
}

Deno.test("slice: only giving stop is equivalent to [0, stop, 1]", () => {
  const noStartOrStep = slice(to50(), 10);
  assertEquals([...noStartOrStep], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

Deno.test("slice: null start is equivalent to 0", () => {
  const startZero = slice(to50(), 0, 10);
  const startNull = slice(to50(), null, 10);
  assertEquals([...startZero], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  assertEquals([...startNull], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

Deno.test("slice: non-zero start starts at the correct index", () => {
  const nonZeroStart = slice(to50(), 5, 10);
  assertEquals([...nonZeroStart], [5, 6, 7, 8, 9]);
});

Deno.test("slice: null stop is equivalent to Infinity, exhausts generator", () => {
  const stopInf = slice(to50(), 45, Infinity);
  const stopNull = slice(to50(), 45, null);
  assertEquals([...stopInf], [45, 46, 47, 48, 49]);
  assertEquals([...stopNull], [45, 46, 47, 48, 49]);
});

Deno.test("slice: setting step to 0 fails eagerly", () => {
  assertThrows(() => slice(to50(), 0, 10, 0));
});

Deno.test("slice: fails eagerly if any argument is NaN or under 0", () => {
  assertThrows(() => slice(to50(), -1));
  assertThrows(() => slice(to50(), -1, null));
  assertThrows(() => slice(to50(), null, -1));
  assertThrows(() => slice(to50(), null, null, -1));
  assertThrows(() => slice(to50(), NaN, null, -1));
  assertThrows(() => slice(to50(), null, NaN, -1));
  assertThrows(() => slice(to50(), null, null, NaN));
});

Deno.test("slice: start === stop yields nothing", () => {
  assertEquals([...slice(to50(), 1, 1)], []);
  assertEquals([...slice(to50(), 0, 0)], []);
});

Deno.test("slice: start > stop yields nothing", () => {
  assertEquals([...slice(to50(), 1, 0)], []);
  assertEquals([...slice(to50(), 2, 1)], []);
});

Deno.test("slice: step > 1 works correctly", () => {
  assertEquals([...slice(to50(), null, null, 10)], [0, 10, 20, 30, 40]);
});
