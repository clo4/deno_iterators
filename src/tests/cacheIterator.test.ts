import { assertEquals, assertThrows } from "./deps.ts";
import { cacheIterator } from "../mod.ts";

Deno.test("cacheIterator: prev() works when cache has values", () => {
  const indices = [0, 1, 2, 3];
  const it = indices[Symbol.iterator]();
  it.next();
  const cached = cacheIterator(it);
  assertEquals(cached.next(), { value: 1, done: false });
  assertEquals(cached.next(), { value: 2, done: false });
  assertEquals(cached.next(), { value: 3, done: false });
  assertEquals(cached.next(), { value: undefined, done: true });
  // decrements immediately
  assertEquals(cached.prev(), { value: 3, done: false, index: 2 });
  assertEquals(cached.prev(), { value: 2, done: false, index: 1 });
  assertEquals(cached.prev(), { value: 1, done: false, index: 0 });
  // repeats when index hits 0
  assertEquals(cached.prev(), { value: 1, done: false, index: 0 });
  // increments immediately
  assertEquals(cached.next(), { value: 2, done: false });
});

Deno.test("cacheIterator: prev() with no cache fails", () => {
  const indices = [0, 1, 2, 3];
  const it = indices[Symbol.iterator]();
  it.next();
  const cached = cacheIterator(it);
  assertThrows(() => {
    cached.prev();
  });
});
