import { assertEquals } from "./deps.ts";
import { zipLongest } from "../mod.ts";

Deno.test("zipLongest: fills empty spaces with its fill value", () => {
  const s = Symbol();
  assertEquals(
    [...zipLongest(s, [1], [1, 2], [1, 2, 3])],
    [[1, 1, 1], [s, 2, 2], [s, s, 3]],
  );
});

Deno.test("zipLongest: works with no input", () => {
  assertEquals([...zipLongest(null)], []);
});
