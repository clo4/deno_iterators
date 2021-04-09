import { assertEquals, DEFINITELY_INFINITY } from "./deps.ts";
import { repeat } from "../mod.ts";

Deno.test("repeat: forever (omit number)", () => {
  const sentinel = Symbol();
  const repeating = repeat(sentinel);
  for (let i = 0; i < DEFINITELY_INFINITY; i++) {
    assertEquals(repeating.next(), { value: sentinel, done: false });
  }
});

Deno.test("repeat: fixed number of times", () => {
  assertEquals([...repeat("Hi", 3)], ["Hi", "Hi", "Hi"]);
});
