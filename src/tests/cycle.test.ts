import { assertEquals, DEFINITELY_INFINITY } from "./deps.ts";
import { cycle } from "../mod.ts";

function* finiteGenerator() {
  yield 0;
  yield 1;
  yield 2;
}

Deno.test("cycle: times = 0", () => {
  assertEquals(
    [...cycle(finiteGenerator(), 0)],
    [],
  );
});

Deno.test("cycle: times = 1", () => {
  assertEquals(
    [...cycle(finiteGenerator(), 1)],
    [0, 1, 2],
  );
});

Deno.test("cycle: times = N", () => {
  assertEquals(
    [...cycle(finiteGenerator(), 3)],
    [0, 1, 2, 0, 1, 2, 0, 1, 2],
  );
});

Deno.test("cycle: omitted times argument repeats infinitely", () => {
  const it = cycle(finiteGenerator());
  for (let i = 0; i < DEFINITELY_INFINITY; i++) {
    assertEquals(it.next().value, i % 3);
  }
});
