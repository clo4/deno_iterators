import { assertEquals, DEFINITELY_INFINITY } from "./deps.ts";
import { count } from "../mod.ts";

Deno.test("count: ()", () => {
  const counter = count();
  for (let i = 0; i < DEFINITELY_INFINITY; i++) {
    assertEquals(counter.next(), { value: i, done: false });
  }
});

Deno.test("count: (start)", () => {
  const start = 28980; // Insignificant -- could be anything.
  const counter = count(start);
  for (let i = start; i < start + DEFINITELY_INFINITY; i++) {
    assertEquals(counter.next(), { value: i, done: false });
  }
});

Deno.test("count: (start, step)", () => {
  const start = 792793; // Completely arbitrary.
  const step = 3;
  const counter = count(start, step);
  for (let i = start; i < start + DEFINITELY_INFINITY * step; i += step) {
    assertEquals(counter.next(), { value: i, done: false });
  }
});
